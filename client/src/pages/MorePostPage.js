import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HomePost } from "../components/HomePost";
import { Puff } from "react-loading-icons";
import { MbtiColor } from "../components/MbtiColor";
import styles from "../styles/MorePostPage.module.css";
import {
  getAllBoard,
  getAllHotBoard,
  getMbtiBoard,
  getMbtiHotBoard,
} from "../api/http/Fetch";
import { WritePostInfo } from "../atom/WritePostInfo";
import { useRecoilState } from "recoil";

export const MorePostPage = () => {
  const [posts, setPosts] = useState([]);
  const history = useNavigate();
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(0);
  const [lastElement, setLastElement] = useState(null);
  const [last, setLast] = useState(false);
  const [writePostInfo, setWritePostInfo] = useRecoilState(WritePostInfo);

  let location = useLocation();
  const boardId = location.state.boardId; // 전체 or mbti
  const sub = location.state.sub; // hot or all

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPageNum((pageNum) => pageNum + 1);
      }
    })
  );
  /*
  const fakeFetch = (delay = 1000) =>
    new Promise((res) => setTimeout(res, delay));
*/
  const AllBoardAllPosts = async () => {
    setLoading(true);
    await getAllBoard(pageNum)
      .then((data) => {
        if (data.body == []) {
          setPageNum((pageNum) => pageNum - 1);
          setLast(true);
          setLoading(false);
        } else {
          let items = data.body;
          if (pageNum === 0) {
            setPosts([...items]);
          } else {
            let all = new Set([...posts, ...items]);
            setPosts([...all]);
          }
          setLoading(false);
          setLast(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const AllBoardHotPosts = async () => {
    setLoading(true);
    await getAllHotBoard(pageNum)
      .then((data) => {
        if (data.body == []) {
          setPageNum((pageNum) => pageNum - 1);
          setLast(true);
          setLoading(false);
        } else {
          let items = data.body;
          if (pageNum === 0) {
            setPosts([...items]);
          } else {
            let all = new Set([...posts, ...items]);
            setPosts([...all]);
          }
          setLoading(false);
          setLast(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const MbtiBoardAllPosts = async () => {
    setLoading(true);
    await getMbtiBoard(pageNum, boardId)
      .then((data) => {
        if (data.body === []) {
          setPageNum((pageNum) => pageNum - 1);
          setLast(true);
          setLoading(false);
        } else {
          let items = data.body;
          if (pageNum === 0) {
            setPosts([...items]);
          } else {
            let all = new Set([...posts, ...items]);
            setPosts([...all]);
          }
          setLoading(false);
          setLast(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const MbtiBoardHotPosts = async () => {
    setLoading(true);
    await getMbtiHotBoard(pageNum, boardId)
      .then((data) => {
        if (data.body == []) {
          setPageNum((pageNum) => pageNum - 1);
          setLast(true);
          setLoading(false);
        } else {
          let items = data.body;
          if (pageNum === 0) {
            setPosts([...items]);
          } else {
            let all = new Set([...posts, ...items]);
            setPosts([...all]);
          }
          setLoading(false);
          setLast(false);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (boardId === "전체") {
      if (sub === "all") {
        // 전체 => all
        AllBoardAllPosts();
      } else {
        // 전체 => hot
        AllBoardHotPosts();
      }
    } else {
      // mbti
      if (sub === "all") {
        // mbti => all
        MbtiBoardAllPosts();
      } else {
        // mbti => hot
        MbtiBoardHotPosts();
      }
    }
  }, [pageNum]);

  useEffect(() => {
    if (pageNum === 0) {
      setLast(true);
    }
    if (boardId === "전체") {
      if (sub === "all") {
        // 전체 => all
        AllBoardAllPosts();
      } else {
        // 전체 => hot
        AllBoardHotPosts();
      }
    } else {
      // mbti
      if (sub === "all") {
        // mbti => all
        MbtiBoardAllPosts();
      } else {
        // mbti => hot
        MbtiBoardHotPosts();
      }
    }
  }, []);

  useEffect(() => {
    setLast(true);
    setPageNum(0);
    setPosts([]);
    if (boardId === "전체") {
      if (sub === "all") {
        // 전체 => all
        AllBoardAllPosts();
      } else {
        // 전체 => hot
        AllBoardHotPosts();
      }
    } else {
      // mbti
      if (sub === "all") {
        // mbti => all
        MbtiBoardAllPosts();
      } else {
        // mbti => hot
        MbtiBoardHotPosts();
      }
    }
  }, [writePostInfo]);

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
              {boardId === "전체" ? "전체" : <MbtiColor mbti={boardId} />}
            </div>
            <div className={styles.container__topDiv__boardId__sub}>게시판</div>
          </div>
        </div>
        <hr />
        <div className={styles.container__mainDiv}>
          {posts.length !== 0 ? (
            posts.map((item, id) => <HomePost props={item} key={id} />)
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
