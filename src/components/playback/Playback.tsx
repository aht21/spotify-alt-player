import { useQuery } from "@tanstack/react-query";
import { fetchPlaybackState } from "../../services/api/player.ts";
import Skeleton from "./skeleton";
import CurrentTrack from "./currentTrack";
import Controllers from "./controllers";
import Range from "./range";
import Device from "./device";
import Volume from "./volume";
import styles from "./playback.module.css";

const Playback = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["playback-state"],
    queryFn: fetchPlaybackState,
    refetchInterval: 5000,
  });

  console.log(data);

  if (isLoading) {
    return <Skeleton />;
  }

  if (data == undefined) {
    return (
      <div className={styles.player}>
        <div className={styles.no_player}>playback not found</div>
      </div>
    );
  }

  return (
    <div className={styles.player} id="player">
      <div className={styles.player_inner}>
        {data?.item === null ? (
          <div className={styles.no_track}>
            <div className={styles.no_track_image}></div>
            <span className={styles.no_track_text}>Track not found</span>
          </div>
        ) : (
          <CurrentTrack
            name={data.item.name}
            artists={data.item.artists}
            imageSrc={data.item.album.images[1].url}
            uri={data.item.uri}
          />
        )}

        <div className={styles.controllers_wrapper}>
          <Controllers
            deviceId={data.device.id}
            isPlaying={data.is_playing}
            shuffleState={data.shuffle_state}
            repeatState={data.repeat_state}
          />
          {data?.item === null || data?.progress_ms === null ? (
            <div className={styles.no_track_range}></div>
          ) : (
            <Range
              progressMs={data.progress_ms}
              durationMs={data.item.duration_ms}
              isPlaying={data.is_playing}
            />
          )}
        </div>
        <div className={styles.playback_settings}>
          <Device isPlaying={data.is_playing} />
          <Volume value={data.device.volume_percent} supports={data.device.supports_volume} />
        </div>
      </div>
    </div>
  );
};

export default Playback;
