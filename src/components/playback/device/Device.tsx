import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAvailableDevices, fetchTransferPlayback } from "../../../services/api/device.ts";
import deviceIcon from "../../../assets/icons/device.svg";
import styles from "./device.module.css";

interface Props {
  isPlaying: boolean;
}

const Device = ({ isPlaying }: Props) => {
  const queryClient = useQueryClient();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

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
    if (isOpen) {
      setIsOpen(false);
    } else {
      queryClient.invalidateQueries({ queryKey: ["devices"] });
      setIsOpen(true);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || isError) {
    return <div>Error</div>;
  }

  return (
    <div className="playback_device__wrapper">
      <button ref={buttonRef} className={styles.preview} onClick={openCloseMenu}>
        <img src={deviceIcon} alt="playback device" className={styles.preview_icon} />
      </button>
      <div ref={menuRef} className={`${styles.menu} ${isOpen ? styles.menu_open : ""}`}>
        <span className={styles.header}>Available devices:</span>
        <ul className={styles.menu_list}>
          {/*{playbackDeviceLoadingStatus === "loading" ? (*/}
          {/*  <>*/}
          {/*    <li className={styles.loading}></li>*/}
          {/*  </>*/}
          {/*) : (*/}
          {data.devices.map((device) => (
            <li key={device.id}>
              <button
                className={`${styles.button} ${device.is_active ? styles.button_active : ""}`}
                onClick={() => transferMutation.mutate(device.id)}
              >
                <div className={styles.button_point}></div>
                {device.name}
              </button>
            </li>
          ))}
          {/*)}*/}
        </ul>
      </div>
    </div>
  );
};

export default Device;
