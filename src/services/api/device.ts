import type { Devices } from "../../types/device.ts";
import { spotifyFetch } from "./spotifyFetch.ts";

export const fetchAvailableDevices = () => {
  return spotifyFetch<Devices>("/me/player/devices");
};
