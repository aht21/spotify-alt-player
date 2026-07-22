import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPlaybackSetVolume } from "../../../services/api/player.ts";
import volumeXmarkIcon from "../../../assets/icons/volume_xmark.svg";
import volumeMinIcon from "../../../assets/icons/volume_min.svg";
import volumeMaxIcon from "../../../assets/icons/volume_max.svg";
import styles from "./volume.module.css";

interface Props {
  value: number | null;
  supports: boolean;
}

const Volume = ({ value, supports }: Props) => {
  const rangeInputRef = useRef<HTMLInputElement | null>(null);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [localVolume, setLocalVolume] = useState(value || 50);
  const queryClient = useQueryClient();

  const updateTrackStyle = useCallback(() => {
    const rangeInput = rangeInputRef.current;
    if (!rangeInput) return;

    const value =
      ((localVolume - Number(rangeInput.min)) / (Number(rangeInput.max) - Number(rangeInput.min))) *
      100;

    rangeInput.style.setProperty("--progress", `${value}%`);
  }, [localVolume]);

  useEffect(() => {
    updateTrackStyle();
  }, [updateTrackStyle]);

  const volumeMutation = useMutation({
    mutationFn: (volume: number) => fetchPlaybackSetVolume(volume),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playback-state"] });
    },
  });

  const onChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setLocalVolume(newVolume);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      volumeMutation.mutate(newVolume);
    }, 200);
  };

  const onMuteUnmute = () => {
    if (localVolume === 0) {
      setLocalVolume(50);
      volumeMutation.mutate(50);
    } else {
      setLocalVolume(0);
      volumeMutation.mutate(0);
    }
  };

  return (
    <div className={`${styles.wrapper} ${supports ? "" : "disabled"}`}>
      <button className={styles.mute} onClick={onMuteUnmute} disabled={!supports}>
        <img
          src={
            localVolume === 0 ? volumeXmarkIcon : localVolume < 50 ? volumeMinIcon : volumeMaxIcon
          }
          alt="Volume Icon"
          className={styles.icon}
        />
      </button>
      <input
        type="range"
        className={styles.range}
        id="volume"
        name="volume"
        min="0"
        max="100"
        ref={rangeInputRef}
        value={localVolume}
        onChange={onChangeVolume}
        disabled={!supports}
      />
    </div>
  );
};

export default Volume;
