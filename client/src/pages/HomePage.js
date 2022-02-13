import { useState } from "react";
import styles from "../styles/HomePage.module.css";
import { userLogin } from "../atom/User";
import { useRecoilState } from "recoil";
import { HomeBoard } from "../components/HomeBoard";
import { HomeGuestBoard } from "../components/HomeGuestBoard";

export const HomePage = () => {
  const [login, setLogin] = useRecoilState(userLogin);

  return (
    <div className={styles.mainBackground}>
      <div className={styles.main}>
        {login === false ? (
          <HomeGuestBoard />
        ) : (
          <>
            <HomeBoard boardName={window.sessionStorage.getItem("userMbti")} />
            <div className={styles.main__secondBoard}>
              <HomeBoard boardName="전체" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
