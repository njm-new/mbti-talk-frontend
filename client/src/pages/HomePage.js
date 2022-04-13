import { useState } from "react";
import styles from "../styles/HomePage.module.css";
import { userLogin } from "../atom/User";
import { useRecoilState } from "recoil";
import { HomeBoard } from "../components/HomeBoard";
import { HomeGuestBoard } from "../components/HomeGuestBoard";

export const HomePage = () => {
  const [login, setLogin] = useRecoilState(userLogin);
  const [select, setSelect] = useState(1);
  const myMbti = window.sessionStorage.getItem("userMbti");

  const handleMbti = () => {
    setSelect(1);
  };

  const handleAll = () => {
    setSelect(2);
  };
  return (
    <div className={styles.mainBackground}>
      <ins property="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8137167428855344" />
      <div className={styles.main}>
        {login === false ? (
          <HomeGuestBoard />
        ) : (
          <>
            <div className={styles.main__titleDiv}>
              <button
                onClick={handleMbti}
                className={
                  select === 1
                    ? styles.main__titleDiv__firstActive
                    : styles.main__titleDiv__first
                }
              >
                <div>{myMbti} 게시판</div>
              </button>
              <div className={styles.main__titleDiv__second}></div>
              <button
                onClick={handleAll}
                className={
                  select === 1
                    ? styles.main__titleDiv__third
                    : styles.main__titleDiv__thirdActive
                }
              >
                <div>전체 게시판</div>
              </button>
            </div>
            <div
              className={
                select === 1
                  ? styles.main__firstBoardShow
                  : styles.main__firstBoard
              }
            >
              <HomeBoard
                boardName={window.sessionStorage.getItem("userMbti")}
              />
            </div>
            <div
              className={
                select === 1
                  ? styles.main__secondBoard
                  : styles.main__secondBoardShow
              }
            >
              <HomeBoard boardName="전체" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
