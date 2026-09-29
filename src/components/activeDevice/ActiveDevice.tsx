import { useQuery } from "@tanstack/react-query";
import { fetchAvailableDevices } from "../../services/api/device";
import styles from "./activeDevice.module.css";
import usePlaybackActions from "../../hooks/usePlaybackActions";

const ActiveDevice = () => {
  const { transfer } = usePlaybackActions();

  const { data, isLoading } = useQuery({
    queryKey: ["devices"],
    queryFn: fetchAvailableDevices,
  });

  if (isLoading)
    return (
      <div className={styles.wrapper}>
        <div className={styles.message}>
          <span className={styles.header}>Select playback device</span>
          <div className={styles.loading_device}></div>
        </div>
      </div>
    );

  if (!data) return;

  if (data.devices.length === 0) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.message}>
          <span className={styles.header}>
            We couldn't find any active playback.
            <br />
            Please open the Spotify app on your device.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.message}>
        <span className={styles.header}>Select playback device</span>
        {data.devices.map((item, index) => (
          <button
            key={index}
            className={styles.device_item}
            onClick={() => transfer({ deviceId: item.id })}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActiveDevice;
