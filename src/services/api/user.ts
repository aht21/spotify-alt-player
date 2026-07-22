import type { UserProfile } from "../types/user";
import { spotifyFetch } from "./spotifyFetch";

export function fetchUserProfile() {
  return spotifyFetch<UserProfile>("/me");
}
