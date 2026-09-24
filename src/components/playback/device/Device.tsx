import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAvailableDevices, fetchTransferPlayback } from "../../../services/api/device.ts";
import PlayingAnimation from "../../playingAnimation";
import DeviceIcon from "../../deviceIcon";
import styles from "./device.module.css";

interface Props {
  isPlaying: boolean;
}

const Device = ({ isPlaying }: Props) => {
  const queryClient = useQueryClient();

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const portalRoot = document.getElementById("player");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["devices"],
    queryFn: fetchAvailableDevices,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const transferMutation = useMutation({
    mutationFn: (deviceId: string) => fetchTransferPlayback(deviceId, isPlaying),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["playback-state"] });
      queryClient.invalidateQueries({ queryKey: ["devices"] });
    },
  });

  const openCloseMenu = () => {
    if (!isOpen) {
      queryClient.invalidateQueries({ queryKey: ["devices"] });
    }

    setIsOpen((prev) => !prev);
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
                    onClick={() => transferMutation.mutate(device.id)}
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
