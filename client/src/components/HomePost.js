import { useEffect, useState } from "react";
import { getMember } from "../api/http/Fetch";
import { DateToTime } from "../util/DateToTime";
import { MbtiColor } from "./MbtiColor";
import styles from "../styles/HomePost.module.css";
import { BsEye } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { AiOutlineComment } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const HomePost = ({ props }) => {
  const history = useNavigate();
  /*
  const [member, setMember] = useState({
    memberId: 0,
    nickname: "",
    mbti: "",
    content: "",
  });
  useEffect(() => {
    getMember(props.memberId).then((data) => setMember(data));
  }, []);
*/
  return (
    <button onClick={() => history(`/detail/${props.postId}`)}>
      <div className={styles.container}>
        <div className={styles.container__contentDiv}>
          <div className={styles.container__contentDiv__title}>
            {props.title}
          </div>
          <div className={styles.container__contentDiv__content}>
            {props.content.length > 40
              ? props.content.slice(0, 40) + "..."
              : props.content}
          </div>
        </div>
        <div className={styles.container__secondDiv}>
          <div className={styles.container__secondDiv__userInfo}>
            <div>
              <MbtiColor mbti={props.mbti} />
            </div>
            <div className={styles.container__secondDiv__userInfo__nickname}>
              {props.nickname}
            </div>
          </div>
          <div className={styles.container__secondDiv__time}>
            {DateToTime(props.createTime)}
          </div>
        </div>
        <div className={styles.container__hr}></div>
        <div className={styles.container__thirdDiv}>
          <div className={styles.container__thirdDiv__view}>
            <BsEye />
            <div className={styles.container__thirdDiv__view__count}>
              {props.viewCount}
            </div>
          </div>
          <div className={styles.container__thirdDiv__like}>
            <BiLike />
            <div className={styles.container__thirdDiv__like__count}>
              {props.likeCount}
            </div>
          </div>
          <div className={styles.container__thirdDiv__comment}>
            <AiOutlineComment />
            <div className={styles.container__thirdDiv__comment__count}>
              {props.commentCount}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};
