"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const login = async (data: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!res?.ok) {
      const errorText = await res.text();
      console.error("Login Failed", errorText);
      return { error: "Login failed", details: errorText };
    }

    const response = await res.json();

    // Set token in cookie if login is successful
    if (response?.user && response?.token) {
      const cookieStore = await cookies();
      cookieStore.set("auth_token", response.token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      // Also set user data in cookie
      cookieStore.set("user_data", JSON.stringify(response.user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
    }

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return { error: "Network error occurred" };
  }
};

export const logout = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("auth_token");
    cookieStore.delete("user_data");
    return { success: true };
  } catch (error) {
    console.error("Logout Error:", error);
    return { error: "Logout failed" };
  }
};
