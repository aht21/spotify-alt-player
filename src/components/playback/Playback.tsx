import { useQuery } from "@tanstack/react-query";
import { fetchPlaybackState } from "../../services/api/player.ts";
import Skeleton from "./skeleton";
import CurrentTrack from "./currentTrack";
import Controllers from "./controllers";
import Device from "./device";
import styles from "./playback.module.css";
import Volume from "./volume";

const Playback = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["playback-state"],
    queryFn: fetchPlaybackState,
    refetchInterval: 5000,
  });

  console.log(data);

  if (isLoading) {
    return <Skeleton />;
  }

  if (data == undefined || isError) {
    return (
      <div className={styles.player}>
        <div className={styles.player_inner}>Error</div>
      </div>
    );
  }

  // TODO: поменять надпись (возможно проблема с тем что не выбран device воспроизведения)
  if (data?.item === null) return <div>Трек не найден</div>;

  return (
    <div className={styles.player}>
      <div className={styles.player_inner}>
        <CurrentTrack
          name={data.item.name}
          artists={data.item.artists}
          imageSrc={data.item.album.images[1].url}
          uri={data.item.uri}
        />
        <div className={styles.controllers_wrapper}>
          <Controllers deviceId={data.device.id} isPlaying={data.is_playing} />
          {/* <PlaybackRange /> */}
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
