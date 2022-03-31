import styles from "../styles/HomePostSmall.module.css";
import { MbtiColor } from "./MbtiColor";
import { BiLike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postLike, deleteLike } from "../api/http/Fetch";

export const HomePostSmall = ({ props }) => {
  const history = useNavigate();
  const [item, setItem] = useState(props);
  const goodLike = () => {
    postLike(item.postId)
      .then((res) => {
        if (res.status === 200) {
          setItem({ ...item, like: true, likeCount: item.likeCount + 1 });
        }
      })
      .catch((err) => console.log(err));
  };

  const cancelLike = () => {
    deleteLike(item.postId)
      .then((res) => {
        if (res.status === 200) {
          setItem({ ...item, like: false, likeCount: item.likeCount - 1 });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.container}>
      <div>
        <MbtiColor mbti={props.mbti} />
      </div>
      <div className={styles.title}>
        <button onClick={() => history(`/detail/${item.postId}`)}>
          {item.title}
        </button>
      </div>
      <div className={styles.extra}>
        <div className={styles.CountDivInline}>
          <div className={styles.CountDiv}>
            {item.like === false ? (
              <button className={styles.CountDiv__likeIcon} onClick={goodLike}>
                <BiLike />
              </button>
            ) : (
              <button
                className={styles.CountDiv__likeIconActive}
                onClick={cancelLike}
              >
                <AiFillLike />
              </button>
            )}

            <div className={styles.linkeCount}>{item.likeCount}</div>
          </div>
        </div>
        <div className={styles.CountDivInline}>
          <div className={styles.CountDivTow}>
            <button
              className={styles.CountDiv__commentIcon}
              onClick={() => history(`/detail/${item.postId}`)}
            >
              <AiOutlineComment />
            </button>
            <div className={styles.commentCount}>{item.commentCount}</div>
          </div>
        </div>
      </div>
      <div className={styles.mobileExtra}>
        <div className={styles.mobileExtra__likeDiv}>
          {item.like === false ? (
            <button className={styles.CountDiv__likeIcon} onClick={goodLike}>
              <BiLike />
            </button>
          ) : (
            <button
              className={styles.CountDiv__likeIconActive}
              onClick={cancelLike}
            >
              <AiFillLike />
            </button>
          )}
          <div className={styles.mobilelikeCount}>{item.likeCount}</div>
        </div>
        <div className={styles.mobileExtra__commentDiv}>
          <button
            className={styles.mobileExtra__commentIcon}
            onClick={() => history(`/detail/${item.postId}`)}
          >
            <AiOutlineComment />
          </button>
          <div className={styles.mobileExtra__commentCount}>
            {item.commentCount}
          </div>
        </div>
      </div>
    </div>
  );
};
