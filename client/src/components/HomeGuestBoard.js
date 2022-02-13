import { useState, useEffect } from "react";
import { FaListUl } from "react-icons/fa";
import styles from "../styles/HomeGuestBoard.module.css";
import { getGuestBoard } from "../api/http/Fetch";
import { HomePostSmallGuest } from "./HomePostSmallGuest";
// allBoard.map((item, id) => <HomePostSmall props={item} key={id} />)
export const HomeGuestBoard = () => {
  const [allBoard, setAllBoard] = useState([]);
  const [num, setNum] = useState(0);

  useEffect(() => {
    getGB();
  }, [num]);

  const getGB = () => {
    if (num < 2) {
      getGuestBoard(num)
        .then((data) => {
          let items = data.body;
          let all = new Set([...allBoard, ...items]);
          setAllBoard([...all]);
          setNum(num + 1);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <section className={styles.newContainer}>
      <div className={styles.newContainer__mainTitle}>
        <div>전체 게시판</div>
      </div>
      <div className={styles.newContainer__all}>
        <div className={styles.newContainer__all__top}>
          <div className={styles.newContainer__all__top__title}>
            <FaListUl />
            <div>전체 게시글</div>
          </div>
          <div>
            <button
              onClick={() => {
                window.alert("로그인을 해주세요.");
              }}
            >
              더보기
            </button>
          </div>
        </div>
        {allBoard === [] ? (
          <></>
        ) : (
          allBoard.map((item, id) => (
            <HomePostSmallGuest props={item} key={id} />
          ))
        )}
      </div>
    </section>
  );
};
