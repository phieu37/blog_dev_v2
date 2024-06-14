import React from "react"
import styles from "./styles.module.scss"
import "./styles.scss"
import { useNavigate } from 'react-router-dom';
import ButtonMASQ from "../../../components/UI/Button"

const Header = () => {
  const openFullScreen = () => {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        /* Safari */
        document.documentElement.webkitRequestFullscreen()
      } else if (document.documentElement.msRequestFullscreen) {
        /* IE11 */
        document.documentElement.msRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen()
      }
    }
  }

  const navigate = useNavigate()
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerLeftWrap}></div>
      <div className={`${styles.headerRightWrap}`}>
        <div className={`${styles.itemHeaderRight}`}>
          <div onClick={() => openFullScreen()} className={`${styles.iconWrap}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20.571" width="18" height="20.571">
              <path
                fill="currentColor"
                d="M5.464 12.857h-4.5a.963.963 0 1 0 0 1.928H4.5v3.536c0 .534.43.964.964.964s.964-.43.964-.964v-4.5a.962.962 0 0 0-.964-.964zm7.071-5.143h4.5a.964.964 0 1 0 0-1.928h-3.536V2.25a.963.963 0 1 0-1.928 0v4.5c0 .534.43.964.964.964zM5.464 1.286a.963.963 0 0 0-.964.964v3.536H.964a.963.963 0 1 0 0 1.928h4.5c.534 0 .964-.43.964-.964v-4.5a.963.963 0 0 0-.964-.964zm11.571 11.571h-4.499a.962.962 0 0 0-.964.964v4.5a.965.965 0 0 0 1.928 0v-3.536h3.536a.965.965 0 0 0 0-1.928z"
              />
            </svg>
          </div>
        </div>

        <div className={`${styles.itemHeaderRight}`}>
          <div className={styles.infoWrap}>
            <div className={styles.btnWrap}>
              <ButtonMASQ
                textBtn={'Login'}
                loading={false}
                onClick={handleLoginClick}
                disable={false}
                style={{}}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
