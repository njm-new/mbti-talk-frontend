import styles from "../styles/MyCommentsPage.module.css";
import { useEffect, useState } from "react";
import { HomePostSmall } from "../components/HomePostSmall";
import { AiOutlineComment } from "react-icons/ai";
import { getMyComments } from "../api/http/Fetch";

export const MyCommentsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getMyComments()
      .then((data) => {
        setPosts(data.body);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.mainBackground}>
      <div className={styles.main}>
        <section className={styles.newContainer}>
          <div className={styles.newContainer__top}>
            <div>
              <AiOutlineComment />
            </div>
            <div>내 댓글 게시글</div>
          </div>
          {posts === [] ? (
            <></>
          ) : (
            posts.map((item, id) => <HomePostSmall props={item} key={id} />)
          )}
        </section>
      </div>
    </div>
  );
};
