import styles from "../styles/HomeBoard.module.css";
import { useState, useEffect } from "react";
import {
  getAllBoard,
  getAllHotBoard,
  getMbtiBoard,
  getMbtiHotBoard,
} from "../api/http/Fetch";
import { HomePostSmall } from "./HomePostSmall";
import { useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { WritePostInfo } from "../atom/WritePostInfo";
import { useRecoilState } from "recoil";

export const HomeBoard = ({ boardName }) => {
  const history = useNavigate();
  const [allBoard, setAllBoard] = useState(null);
  const [allHotBoard, setAllHotBoard] = useState(null);
  const [writePostInfo, setWritePostInfo] = useRecoilState(WritePostInfo);

  useEffect(() => {
    if (boardName === "전체") {
      resetAllBoard();
    } else {
      resetMbtiBoard();
    }
  }, []);

  useEffect(() => {
    setAllBoard(null);
    setAllHotBoard(null);
    if (boardName === "전체") {
      resetAllBoard();
    } else {
      resetMbtiBoard();
    }
  }, [writePostInfo]);

  const resetAllBoard = () => {
    getAllBoard(0)
      .then((data) => {
        setAllBoard(data.body);
      })
      .catch((err) => console.log("allBoard api err"));

    getAllHotBoard(0)
      .then((data) => {
        setAllHotBoard(data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetMbtiBoard = () => {
    getMbtiBoard(0, boardName)
      .then((data) => {
        setAllBoard(data.body);
      })
      .catch((err) => console.log("allBoard api err"));

    getMbtiHotBoard(0, boardName)
      .then((data) => {
        setAllHotBoard(data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className={styles.newContainer}>
      <div className={styles.newContainer__mainTitle}>
        <div>{boardName} 게시판</div>
      </div>
      <div className={styles.newContainer__all}>
        <div className={styles.newContainer__all__top}>
          <div className={styles.newContainer__all__top__title}>
            <FaListUl />
            <div>전체 게시글</div>
          </div>
          <div className={styles.moreShow}>
            <button
              onClick={() =>
                history("/more", {
                  state: { boardId: boardName, sub: "all" },
                })
              }
            >
              <div>더보기</div>
            </button>
          </div>
        </div>
        {allBoard == null ? (
          <></>
        ) : (
          allBoard.map((item, id) => <HomePostSmall props={item} key={id} />)
        )}
        <div>
          <button
            onClick={() =>
              history("/more", {
                state: { boardId: boardName, sub: "all" },
              })
            }
            className={styles.mobileMoreShow}
          >
            <div>더보기</div>
          </button>
        </div>
      </div>
    </section>
  );
};
