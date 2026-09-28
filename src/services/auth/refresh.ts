import { redirect } from "@tanstack/react-router";
import { removeTokens } from "./storage";

const EXPIRY_BUFFER_MS = 300_000;

export function isTokenExpired(): boolean {
  const expiresIn = localStorage.getItem("expires_in");
  if (!expiresIn) return true;

  const expiresAtMs = Number(expiresIn);
  if (Number.isNaN(expiresAtMs)) return true;

  return Date.now() >= expiresAtMs - EXPIRY_BUFFER_MS;
}

export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) return null;

  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  });

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (!response.ok) {
      if (response.status === 400) {
        const errorData = await response.json();
        if (errorData.error === "invalid_grant") {
          removeTokens();
          throw redirect({ to: "/preview" });
        }
      }
      return null;
    }

    const data = await response.json();
    console.log("REFRESH", data);

    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("expires_in", (Date.now() + data.expires_in * 1000).toString());

    return data.access_token;
  } catch (error) {
    console.error("Failed to refresh token", error);
    return null;
  }
}
