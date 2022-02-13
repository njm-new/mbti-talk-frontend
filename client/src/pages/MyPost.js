import styles from "../styles/MyPost.module.css";
import { useState, useEffect } from "react";
import { HomePostSmall } from "../components/HomePostSmall";
import { BsFiles } from "react-icons/bs";
import { getMyPosts } from "../api/http/Fetch";
import { useRecoilState } from "recoil";
import { WritePostInfo } from "../atom/WritePostInfo";

export const MyPost = () => {
  const [posts, setPosts] = useState([]);
  const [number, setNumber] = useState(0);
  const [last, setLast] = useState(false);
  const [writePost, setWritePost] = useRecoilState(WritePostInfo);

  useEffect(() => {
    getMyPosts(number)
      .then((data) => {
        console.log(data.body);
        console.log(number);
        if (data.body.length === 0) {
          setLast(true);
        } else {
          let items = data.body;
          setPosts([...posts, ...items]);
          if (number === 0 && data.body.length < 12) {
            setLast(true);
          }
        }
      })
      .catch((err) => console.log(err));
  }, [number]);

  useEffect(() => {
    setPosts([]);
    setNumber(0);
    setLast(false);
  }, [writePost]);

  const moreShow = () => {
    if (last !== true) {
      setNumber(number + 1);
    }
  };
  return (
    <div className={styles.mainBackground}>
      <div className={styles.main}>
        <section className={styles.newContainer}>
          <div className={styles.newContainer__top}>
            <div>
              <BsFiles />
            </div>
            <div>내가 쓴 게시글</div>
          </div>
          {posts === [] ? (
            <></>
          ) : (
            posts.map((item, id) => <HomePostSmall props={item} key={id} />)
          )}

          {last === false ? (
            <button className={styles.newContainer__bottom} onClick={moreShow}>
              <div>더보기</div>
            </button>
          ) : (
            <></>
          )}
        </section>
      </div>
    </div>
  );
};
