import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchPlaybackNext,
  fetchPlaybackPause,
  fetchPlaybackPrevious,
  fetchPlaybackRepeat,
  fetchPlaybackResume,
  fetchPlaybackShuffle,
} from "../../../services/api/player.ts";
import nextIcon from "../../../assets/icons/next.svg";
import pauseIcon from "../../../assets/icons/pause.svg";
import playIcon from "../../../assets/icons/play.svg";
import shuffleIcon from "../../../assets/icons/shuffle.svg";
import shuffleAltIcon from "../../../assets/icons/shuffle_alt.svg";
import repeatIcon from "../../../assets/icons/repeat.svg";
import repeatAltIcon from "../../../assets/icons/repeat_alt.svg";
import repeat1Icon from "../../../assets/icons/repeat_1.svg";
import { useOptimisticPlaybackMutation } from "./useOptimisticPlaybackMutation.ts";
import styles from "./controllers.module.css";

type RepeatState = "track" | "context" | "off";

const NEXT_REPEAT_STATE: Record<RepeatState, RepeatState> = {
  off: "context",
  context: "track",
  track: "off",
};

const REPEAT_ICONS: Record<RepeatState, string> = {
  off: repeatIcon,
  context: repeatAltIcon,
  track: repeat1Icon,
};

interface Props {
  deviceId: string;
  isPlaying: boolean;
  shuffleState: boolean;
  repeatState: RepeatState;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Controllers = ({ deviceId, isPlaying, shuffleState, repeatState }: Props) => {
  const queryClient = useQueryClient();
  const invalidatePlayback = () => queryClient.invalidateQueries({ queryKey: ["playback-state"] });

  const invalidatePlaybackDelayed = async () => {
    await delay(150);
    invalidatePlayback();
  };

  const prevMutation = useMutation({
    mutationFn: fetchPlaybackPrevious,
    onSuccess: invalidatePlaybackDelayed,
  });

  const nextMutation = useMutation({
    mutationFn: fetchPlaybackNext,
    onSuccess: invalidatePlaybackDelayed,
  });

  const pauseMutation = useOptimisticPlaybackMutation(fetchPlaybackPause, () => ({
    is_playing: false,
  }));

  const resumeMutation = useOptimisticPlaybackMutation(
    () => fetchPlaybackResume(deviceId),
    () => ({ is_playing: true }),
  );

  const shuffleMutation = useOptimisticPlaybackMutation(
    () => fetchPlaybackShuffle(!shuffleState),
    () => ({ shuffle_state: !shuffleState }),
  );

  const repeatMutation = useOptimisticPlaybackMutation(
    (state: RepeatState) => fetchPlaybackRepeat(state),
    (state) => ({ repeat_state: state }),
  );

  const onPlayPause = () => (isPlaying ? pauseMutation.mutate() : resumeMutation.mutate());
  const onRepeat = () => repeatMutation.mutate(NEXT_REPEAT_STATE[repeatState]);

  const isMutating =
    prevMutation.isPending ||
    nextMutation.isPending ||
    pauseMutation.isPending ||
    resumeMutation.isPending;

  return (
    <div className={styles.wrapper}>
      <button
        disabled={shuffleMutation.isPending}
        className={styles.control_button}
        onClick={() => shuffleMutation.mutate()}
      >
        <img
          className={styles.shuffle_icon}
          src={shuffleState ? shuffleAltIcon : shuffleIcon}
          alt=""
        />
      </button>

      <div className={styles.move_controls}>
        <button
          disabled={isMutating}
          className={styles.control_button}
          onClick={() => prevMutation.mutate()}
        >
          <img src={nextIcon} className={styles.prev_icon} alt="" />
        </button>

        <button disabled={isMutating} className={styles.pause} onClick={onPlayPause}>
          <img
            src={isPlaying ? pauseIcon : playIcon}
            className={styles.pause_icon}
            alt={isPlaying ? "pause" : "play"}
          />
        </button>

        <button
          disabled={isMutating}
          className={styles.control_button}
          onClick={() => nextMutation.mutate()}
        >
          <img src={nextIcon} className={styles.next_icon} alt="" />
        </button>
      </div>

      <button
        disabled={repeatMutation.isPending}
        className={styles.control_button}
        onClick={onRepeat}
      >
        <img className={styles.repeat_icon} src={REPEAT_ICONS[repeatState]} alt="" />
      </button>
    </div>
  );
};

export default Controllers;
