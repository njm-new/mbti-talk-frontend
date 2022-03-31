import { useState } from "react";
import { MbtiColor } from "./MbtiColor";
import { BiLike } from "react-icons/bi";
import { AiOutlineComment } from "react-icons/ai";
import styles from "../styles/HomePostSmallGuest.module.css";

export const HomePostSmallGuest = ({ props }) => {
  const [item, setItem] = useState(props);

  return (
    <div className={styles.container}>
      <div>
        <MbtiColor mbti={props.mbti} />
      </div>
      <div className={styles.title}>
        <button onClick={() => window.alert("로그인을 해주세요.")}>
          {item.title}
        </button>
      </div>
      <div className={styles.extra}>
        <div className={styles.CountDivInline}>
          <div className={styles.CountDiv}>
            <button
              className={styles.CountDiv__likeIcon}
              onClick={() => window.alert("로그인을 해주세요.")}
            >
              <BiLike />
            </button>
            <div className={styles.linkeCount}>{item.likeCount}</div>
          </div>
        </div>
        <div className={styles.CountDivInline}>
          <div className={styles.CountDivTow}>
            <button
              className={styles.CountDiv__commentIcon}
              onClick={() => () => window.alert("로그인을 해주세요.")}
            >
              <AiOutlineComment />
            </button>
            <div className={styles.commentCount}>{item.commentCount}</div>
          </div>
        </div>
      </div>
      <div className={styles.mobileExtra}>
        <div className={styles.mobileExtra__likeDiv}>
          <button
            className={styles.CountDiv__likeIcon}
            onClick={() => window.alert("로그인을 해주세요.")}
          >
            <BiLike />
          </button>

          <div className={styles.mobilelikeCount}>{item.likeCount}</div>
        </div>
        <div className={styles.mobileExtra__commentDiv}>
          <button
            className={styles.mobileExtra__commentIcon}
            onClick={() => () => window.alert("로그인을 해주세요.")}
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
