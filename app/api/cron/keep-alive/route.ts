import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 30;

const API_URL =
  process.env.NEXT_PUBLIC_BASE_API ||
  "https://muhammadrafi-portfolio-backend.vercel.app/api/v1";

/**
 * Keep-alive cron: Supabase pauses free-tier projects after ~7 days with no
 * database activity. Hitting a read endpoint on the backend runs a real query
 * against Postgres, which resets that inactivity timer.
 *
 * Scheduled from vercel.json. Vercel sends `Authorization: Bearer $CRON_SECRET`
 * when the CRON_SECRET env var is set, which is what keeps this route private.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;

  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const startedAt = Date.now();

  try {
    const res = await fetch(`${API_URL}/post`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(20_000),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return NextResponse.json(
        {
          ok: false,
          status: res.status,
          detail: detail.slice(0, 300),
          durationMs: Date.now() - startedAt,
          checkedAt: new Date().toISOString(),
        },
        { status: 502 }
      );
    }

    // Touch the body so the backend actually serialises the query result.
    const payload = await res.json().catch(() => null);
    const list = Array.isArray(payload) ? payload : payload?.data;
    const rows = Array.isArray(list) ? list.length : null;

    return NextResponse.json({
      ok: true,
      rows,
      durationMs: Date.now() - startedAt,
      checkedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error",
        durationMs: Date.now() - startedAt,
        checkedAt: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
