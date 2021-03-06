import { useEffect } from "react";
import { DateToTime } from "../util/DateToTime";
import { MbtiColor } from "./MbtiColor";
import styles from "../styles/HomePost.module.css";
import { BsEye } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { AiOutlineComment } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getPicture } from "../api/http/Fetch";

export const HomePost = ({ props }) => {
  const history = useNavigate();
  const [imgSet, setImgSet] = useState([]);

  useEffect(() => {
    getPicture(props.postId)
      .then((data) => {
        setImgSet([...data.body]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <button
      className={styles.btn}
      onClick={() => history(`/detail/${props.postId}`)}
    >
      <div className={styles.container}>
        <div className={styles.container__contentDiv}>
          <div className={styles.container__contentDiv__Div}>
            <div className={styles.container__contentDiv__title}>
              {props.title}
            </div>
            <div className={styles.container__contentDiv__content}>
              {props.content.length > 40
                ? props.content.slice(0, 40) + "..."
                : props.content}
            </div>
          </div>
          {imgSet.length === 0 ? (
            <></>
          ) : imgSet.length < 2 ? (
            <div className={styles.container__contentDiv__img}>
              <img alt="sorryImg" src={imgSet[0].pictureUrl} />
            </div>
          ) : (
            <div className={styles.container__contentDiv__imgMulti}>
              <img alt="sorryImg" src={imgSet[0].pictureUrl} />
              <div
                className={styles.container__contentDiv__imgMulti__back}
              ></div>
              <div className={styles.container__contentDiv__imgMulti__count}>
                +{imgSet.length - 1}
              </div>
            </div>
          )}
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
        </div>

        <div className={styles.container__thirdDiv}>
          <div className={styles.container__thirdDiv__first}>
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
          <div className={styles.container__thiredDiv__time}>
            {DateToTime(props.createTime)}
          </div>
        </div>
      </div>
    </button>
  );
};
