import { Link, useNavigate } from "@tanstack/react-router";
import { removeTokens } from "../../services/auth";
import useUserProfile from "../../hooks/useUserProfile";
import { useClickOutside } from "../../hooks/useClickOutside";
import externalLinkIcon from "../../assets/icons/external_link.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import styles from "./userProfilePreview.module.css";

const UserProfilePreview = () => {
  const { data, isLoading, isError } = useUserProfile();
  const navigate = useNavigate();

  const { isOpen, toggle, close, ref: wrapperRef } = useClickOutside<HTMLDivElement>();

  const onLogout = () => {
    removeTokens();
    navigate({ to: "/", replace: true });
  };

  if (isLoading) return <div className={styles.user_preview_loading}></div>;
  if (isError || data === undefined)
    return (
      <button className={styles.user_logout} onClick={onLogout}>
        logout
      </button>
    );

  return (
    <div className={styles.user_preview_wrapper} ref={wrapperRef}>
      <button
        className={`${styles.user_preview} ${isOpen ? styles.user_preview_open : ""}`}
        onClick={toggle}
      >
        {data.images.length !== 0 ? (
          <img src={data.images[1].url} alt="" className={styles.user_image} />
        ) : (
          <div className={styles.user_image_loading}></div>
        )}
        <span>{data.display_name}</span>
      </button>

      <div className={`${styles.menu} ${isOpen ? styles.menu_open : ""}`}>
        <a
          className={`${styles.menu_item} ${styles.menu_item_link}`}
          href={data.external_urls.spotify}
          target="_blank"
        >
          Profile
          <img src={externalLinkIcon} className={styles.menu_item_icon} alt="" />
        </a>
        <Link
          className={`${styles.menu_item} ${styles.menu_item_link}`}
          to={"/theme"}
          onClick={close}
        >
          Theme
        </Link>
        <hr className={styles.menu_divider} />
        <button className={styles.menu_item} onClick={onLogout}>
          Logout
          <img src={logoutIcon} className={styles.menu_item_icon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default UserProfilePreview;
