import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../../services/api/user";
import { removeTokens } from "../../services/auth";
import externalLinkIcon from "../../assets/icons/external_link.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import styles from "./profilePreview.module.css";

const ProfilePreview = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-profile"],
    queryFn: fetchUserProfile,
  });

  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

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
    <div className={styles.user_preview_wrapper}>
      <button
        ref={buttonRef}
        className={`${styles.user_preview} ${isOpen ? styles.user_preview_open : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {data.images.length !== 0 ? (
          <img src={data.images[1].url} alt="" className={styles.user_image} />
        ) : (
          <div className={styles.user_image_loading}></div>
        )}
        <span>{data.display_name}</span>
      </button>
      <div className={`${styles.menu} ${isOpen ? styles.menu_open : ""}`} ref={menuRef}>
        <a
          className={`${styles.menu_item} ${styles.menu_item_link}`}
          href={data.external_urls.spotify}
          target="_blank"
        >
          Profile
          <img src={externalLinkIcon} className={styles.menu_item_icon} alt="" />
        </a>
        <hr className={styles.menu_divider} />
        <button className={styles.menu_item} onClick={onLogout}>
          Logout
          <img src={logoutIcon} className={styles.menu_item_icon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default ProfilePreview;
