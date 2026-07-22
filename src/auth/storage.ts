export function saveTokens(response: {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}) {
  localStorage.setItem("access_token", response.access_token);
  localStorage.setItem("refresh_token", response.refresh_token);
  localStorage.setItem(
    "expires_at",
    (Date.now() + response.expires_in * 1000).toString(),
  );
}
