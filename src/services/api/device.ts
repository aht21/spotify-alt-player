import type { Devices } from "../../types/device.ts";
import { spotifyFetch } from "./spotifyFetch.ts";

export const fetchAvailableDevices = () => {
  return spotifyFetch<Devices>("/me/player/devices");
};

export const fetchTransferPlayback = (deviceId: string, play: boolean) => {
  return spotifyFetch("/me/player", {
    method: "PUT",
    body: JSON.stringify({ device_ids: [deviceId], play }),
  });
};
