export async function spotifyFetch<T>(endpoint: string, init?: RequestInit): Promise<T> {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const text = await response.text();

  if (!text) {
    return undefined as T;
  }

  return JSON.parse(text) as T;
}
