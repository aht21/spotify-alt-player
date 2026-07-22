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
