import { useRef, useState, useEffect } from "react";
import { postInfo } from "../data/testPosts";
import { useNavigate, useLocation } from "react-router-dom";
import { HomePost } from "../components/HomePost";
import { Puff } from "react-loading-icons";
import { MbtiColor } from "../components/MbtiColor";
import styles from "../styles/MorePostPage.module.css";

export const MorePostPage = () => {
  const posts = postInfo;
  const history = useNavigate();
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [lastElement, setLastElement] = useState(null);
  const [last, setLast] = useState(false);

  let location = useLocation();

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

  useEffect(() => {
    //if (pageNum < posts.length)
    if (posts.find((el) => el.pageNum === pageNum).posts !== false) {
      callUser();
    } else {
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
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.container__topDiv}>
          <div className={styles.container__topDiv__boardId}>
            <div className={styles.container__topDiv__boardId__main}>
              {location.state.boardId === "listAll" ? (
                "전체"
              ) : (
                <MbtiColor mbti={location.state.boardId} />
              )}
            </div>
            <div className={styles.container__topDiv__boardId__sub}>게시판</div>
          </div>
        </div>
        <hr />
        <div className={styles.container__mainDiv}>
          {allUsers !== undefined ? (
            allUsers.map((item, id) => <HomePost props={item} key={id} />)
          ) : (
            <></>
          )}
        </div>
        {last === false ? (
          <div
            ref={setLastElement}
            className={styles.container__mainDiv__target}
          >
            {loading && (
              <Puff stroke="black" strokeOpacity={0.125} speed={0.75} />
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
