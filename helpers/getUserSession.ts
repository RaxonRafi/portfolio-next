import { cookies } from "next/headers";

export async function getUserSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    const userData = cookieStore.get("user_data")?.value;

    if (!token || !userData) {
      return null;
    }

    const user = JSON.parse(userData);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  } catch (error) {
    console.error("Error getting user session:", error);
    return null;
  }
}
