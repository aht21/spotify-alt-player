import playIcon from "../../assets/icons/play.svg";
import pauseIcon from "../../assets/icons/pause.svg";
import linkIcon from "../../assets/icons/external_link.svg";
import { decodeHtml } from "../../utils/decodeHtml";
import usePlaybackActions from "../../hooks/usePlaybackActions";
import usePlayback from "../../hooks/usePlayback";
import usePlaylist from "../../hooks/usePlaylist";
import Skeleton from "./skeleton";
import styles from "./playlistHeader.module.css";

interface Props {
  id: string;
  uri: string;
}

const PlaylistHeader = ({ id, uri }: Props) => {
  const { data, isLoading, isError } = usePlaylist(id, (data) => ({
    cover: data.images[0].url,
    name: data.name,
    descr: decodeHtml(data.description ?? ""),
    spotifyUrl: data.external_urls.spotify,
    public: data.public,
    owner: data.owner,
  }));
  const { data: playbackData } = usePlayback((playbackData) => ({
    contextUri: playbackData?.context?.uri,
    isPlaying: playbackData?.is_playing,
  }));
  const { play, pause, resume } = usePlaybackActions();

  const isPaused = playbackData?.contextUri !== uri || !playbackData?.isPlaying;
  const onPlayPause = () => {
    if (playbackData?.contextUri !== uri) {
      play({ uri });
      return;
    }

    if (playbackData?.isPlaying) pause();
    else resume();
  };

  if (isLoading) return <Skeleton />;
  if (isError || !data) return;

  const contributors = [
    {
      name: data.owner.display_name,
      url: data.owner.external_urls.spotify,
    },
  ];

  return (
    <div className={styles.header}>
      <img src={data.cover} className={styles.cover} />
      <div className={styles.content}>
        <div className={styles.content_first}>
          <span className={styles.type}>{data.public ? <>Public playlist</> : <>Playlist</>}</span>
          <h1 className={styles.name}>{data.name}</h1>
          <span className={styles.description}>{data.descr}</span>
          <div className={styles.contributors}>
            {contributors.map((item, index) => (
              <a href={item.url} target="_blank" className={styles.contributor} key={index}>
                <span>{item.name}</span>
                <img className={styles.contributor_link_icon} src={linkIcon} alt="" />
              </a>
            ))}
          </div>
        </div>
        <div className={styles.buttons_group}>
          <button className={styles.play_button} onClick={onPlayPause}>
            <img
              src={isPaused ? playIcon : pauseIcon}
              alt=""
              className={styles.play_button_image}
            />
            <span>Listen</span>
          </button>
          <a href={data.spotifyUrl} target="_blank" className={styles.url_link}>
            <span>Open in Spotify</span>
            <img className={styles.url_link_image} src={linkIcon} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;
