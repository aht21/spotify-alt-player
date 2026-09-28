import nextIcon from "../../../assets/icons/next.svg";
import pauseIcon from "../../../assets/icons/pause.svg";
import playIcon from "../../../assets/icons/play.svg";
import ShuffleIcon from "../../shuffleIcon";
import styles from "./controllers.module.css";
import RepeatIcon from "../../repeatIcon/RepeatIcon.tsx";
import usePlaybackActions from "../../../hooks/usePlaybackActions.ts";
import usePlayback from "../../../hooks/usePlayback.ts";
import type { RepeatState } from "../../../types/player.ts";

const NEXT_REPEAT_STATE: Record<RepeatState, RepeatState> = {
  off: "context",
  context: "track",
  track: "off",
};

const Controllers = () => {
  const { data } = usePlayback((playbackData) => ({
    isPlaying: playbackData?.is_playing,
    repeatState: playbackData?.repeat_state,
    shuffleState: playbackData?.shuffle_state,
  }));
  const { pause, resume, prev, next, shuffle, repeat } = usePlaybackActions();

  if (!data) return;

  // const shuffleState = data?.shuffleState ?? false;
  // const repeatState = (data?.repeatState ?? "off") as RepeatState;
  // const isPlaying = data?.is_playing;

  const onPlayPause = () => (data.isPlaying ? pause() : resume());
  const onShuffle = () => {
    shuffle(!data?.shuffleState);
  };
  const onRepeat = () => {
    repeat(NEXT_REPEAT_STATE[data?.repeatState]);
  };

  const isMutating = false;

  return (
    <div className={styles.wrapper}>
      <button
        disabled={false}
        className={data.shuffleState ? styles.control_button_active : styles.control_button}
        onClick={onShuffle}
      >
        <ShuffleIcon
          width="1.2rem"
          height="1.2rem"
          variant={data.shuffleState ? "white" : "primary"}
        />
      </button>

      <div className={styles.move_controls}>
        <button disabled={isMutating} className={styles.control_button} onClick={() => prev()}>
          <img src={nextIcon} className={styles.prev_icon} alt="" />
        </button>

        <button disabled={isMutating} className={styles.pause} onClick={onPlayPause}>
          <img
            src={data.isPlaying ? pauseIcon : playIcon}
            className={styles.pause_icon}
            alt={data.isPlaying ? "pause" : "play"}
          />
        </button>

        <button disabled={isMutating} className={styles.control_button} onClick={() => next()}>
          <img src={nextIcon} className={styles.next_icon} alt="" />
        </button>
      </div>

      <button
        disabled={false}
        className={
          data.repeatState !== "off" ? styles.control_button_active : styles.control_button
        }
        onClick={onRepeat}
      >
        <RepeatIcon width="1.2rem" height="1.2rem" variant={data.repeatState} />
      </button>
    </div>
  );
};

export default Controllers;
