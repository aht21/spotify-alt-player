export function saveTokens(response: {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}) {
  localStorage.setItem("access_token", response.access_token);
  localStorage.setItem("refresh_token", response.refresh_token);
  localStorage.setItem("expires_at", (Date.now() + response.expires_in * 1000).toString());
}

export function removeTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("expires_at");
}

export function isAuthenticated(): boolean {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const expiresAt = localStorage.getItem("expires_at");

  if (!accessToken || !refreshToken || !expiresAt) {
    return false;
  }

  if (Date.now() >= Number(expiresAt)) {
    return false;
  }

  return true;
}
