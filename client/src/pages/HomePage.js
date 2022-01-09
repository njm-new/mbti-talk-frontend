import { useState, useEffect, useRef } from "react";
import { HomePost } from "../components/HomePost";
import { postInfo } from "../data/testPosts";
import styles from "../styles/HomePage.module.css";
import { Puff } from "react-loading-icons";
import { MbtiColor } from "../components/MbtiColor";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../atom/User";
import { useRecoilState } from "recoil";

export const HomePage = ({ boardId }) => {
  const posts = postInfo;
  const history = useNavigate();
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [lastElement, setLastElement] = useState(null);
  const [last, setLast] = useState(false);
  const [login, setLogin] = useRecoilState(userLogin);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPageNum((no) => no + 1);
      }
    })
  );

  const fakeFetch = (delay = 1000) =>
    new Promise((res) => setTimeout(res, delay));

  const callUser = async () => {
    setLoading(true);
    await fakeFetch();
    let items = posts.find((el) => el.pageNum === pageNum).posts;
    let all = new Set([...allUsers, ...items]);
    setAllUsers([...all]);
    setLoading(false);
  };

  const moveWritePage = () => {
    if (login === true) {
      history("/write");
    } else {
      window.alert("로그인을 해주세요.");
    }
  };

  useEffect(() => {
    //if (pageNum < posts.length)
    if (posts.find((el) => el.pageNum === pageNum).posts !== false) {
      console.log("useE");
      callUser();
    } else {
      console.log("else");
      setPageNum((no) => no - 1);
      setLast(true);
    }
  }, [pageNum]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  return (
    <div className={styles.container}>
      <div className={styles.container__topDiv}>
        <div className={styles.container__topDiv__boardId}>
          <div className={styles.container__topDiv__boardId__main}>
            {boardId === "listAll" ? "전체" : <MbtiColor mbti={boardId} />}
          </div>
          <div className={styles.container__topDiv__boardId__sub}>게시판</div>
        </div>
        <div className={styles.container__topDiv__sub}>
          <div className={styles.container__topDiv__sub__inputDiv}>
            <input
              className={styles.container__topDiv__sub__input}
              placeholder="관심있는 내용을 검색해 주세요."
            />
            <div className={styles.container__topDiv__sub__inputIcon}>
              <BsSearch />
            </div>
          </div>
          <div>
            <button
              className={styles.container__topDiv__sub__btn}
              onClick={moveWritePage}
            >
              글쓰기
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.container__mainDiv}>
        {allUsers !== undefined ? (
          allUsers.map((item, id) => (
            <div className={styles.container__mainDiv__post}>
              <HomePost props={item} key={id} />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      {last === false ? (
        <div ref={setLastElement} className={styles.container__mainDiv__target}>
          {loading && (
            <Puff stroke="black" strokeOpacity={0.125} speed={0.75} />
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
