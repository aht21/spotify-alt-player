export function saveTokens(response: {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}) {
  localStorage.setItem("access_token", response.access_token);
  localStorage.setItem("refresh_token", response.refresh_token);
  localStorage.setItem("expires_in", (Date.now() + response.expires_in * 1000).toString());
}

export function removeTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("expires_in");
}

export function isAuthenticated(): boolean {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const expiresIn = localStorage.getItem("expires_in");

  if (!accessToken || !refreshToken || !expiresIn) {
    return false;
  }

  if (Date.now() >= Number(expiresIn)) {
    return false;
  }

  return true;
}
