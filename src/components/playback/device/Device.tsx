import { useRef } from "react";
import { createPortal } from "react-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAvailableDevices } from "../../../services/api/device.ts";
import PlayingAnimation from "../../icons/playingAnimation/index.ts";
import DeviceIcon from "../../deviceIcon";
import styles from "./device.module.css";
import usePlaybackActions from "../../../hooks/usePlaybackActions.ts";
import { useClickOutside } from "../../../hooks/useClickOutside.ts";

interface Props {
  isPlaying: boolean;
}

const Device = ({ isPlaying }: Props) => {
  const queryClient = useQueryClient();
  const { transfer } = usePlaybackActions();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isOpen, toggle, ref: menuRef } = useClickOutside<HTMLDivElement>([buttonRef]);

  const portalRoot = document.getElementById("player");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["devices"],
    queryFn: fetchAvailableDevices,
  });

  const openCloseMenu = () => {
    if (!isOpen) {
      queryClient.invalidateQueries({ queryKey: ["devices"] });
    }
    toggle();
  };

  if (isLoading) {
    return (
      <button className={styles.loading} disabled={true}>
        <DeviceIcon height="1.6rem" width="1.6rem" variant="white" />
      </button>
    );
  }

  if (isError || !data) return;

  return (
    <>
      <button
        ref={buttonRef}
        className={isOpen ? styles.preview_active : styles.preview}
        onClick={openCloseMenu}
      >
        <DeviceIcon height="1.6rem" width="1.6rem" variant={isOpen ? "primary" : "white"} />
      </button>

      {portalRoot &&
        createPortal(
          <div ref={menuRef} className={`${styles.menu} ${isOpen ? styles.menu_open : ""}`}>
            <span className={styles.header}>Available devices:</span>

            <ul className={styles.menu_list}>
              {data.devices.map((device) => (
                <li key={device.id}>
                  <button
                    className={`${styles.button} ${device.is_active ? styles.button_active : ""}`}
                    onClick={() => transfer({ deviceId: device.id, isPlaying })}
                  >
                    {device.is_active ? (
                      <PlayingAnimation />
                    ) : (
                      <div className={styles.button_point} />
                    )}
                    {device.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>,
          portalRoot,
        )}
    </>
  );
};

export default Device;
