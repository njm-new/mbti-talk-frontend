import styles from "../styles/MyPost.module.css";
import { useState } from "react";
import { HomePostSmall } from "../components/HomePostSmall";
import { postInfo } from "../data/testPosts";
import { BsFiles } from "react-icons/bs";

export const MyPost = () => {
  const [posts, setPosts] = useState(
    postInfo.find((el) => el.pageNum === 1).posts
  );
  console.log(posts);
  const [number, setNumber] = useState(2);
  const [last, setLast] = useState(false);
  const moreShow = () => {
    if (postInfo.find((el) => el.pageNum === number).posts !== false) {
      console.log("init");
      setPosts([
        ...posts,
        ...postInfo.find((el) => el.pageNum === number).posts,
      ]);
      setNumber(number + 1);
    } else {
      setLast(true);
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
          {posts.map((item, id) => (
            <HomePostSmall props={item} key={id} />
          ))}
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
