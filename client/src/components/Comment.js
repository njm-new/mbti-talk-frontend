import styles from "../styles/Comment.module.css";
import { BiTime } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { DateToTime } from "../util/DateToTime";
import { MbtiColor } from "./MbtiColor";
import { userInfo } from "../atom/User";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

export const Comment = ({ props }) => {
  const time = DateToTime(props.createTime);
  const [info, setInfo] = useRecoilState(userInfo);
  const [setting, setSetting] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.userInfoDiv}>
        <div>
          <MbtiColor mbti={props.member.mbti} />
        </div>
        <div className={styles.userInfoDiv__nickname}>
          {props.member.nickname}
        </div>
      </div>
      <div>
        {props.content.split("\n").map((line) => (
          <div>
            {line}
            <br />
          </div>
        ))}
      </div>
      <div className={styles.contentInfoDiv}>
        <div className={styles.contentInfoDiv__timeDiv}>
          <div>
            <BiTime />
          </div>
          <div className={styles.contentInfoDiv__timeDiv__time}>{time}</div>
        </div>
        <div className={styles.contentInfoDiv__likeDiv}>
          <div>
            <BiLike />
          </div>
          <div className={styles.contentInfoDiv__likeDiv__count}>
            {props.likeCount}
          </div>
        </div>
        {props.member.memberId == info.userId ? (
          <div className={styles.contentInfoDiv__extraDiv}>
            <button onClick={() => setSetting(true)}>
              <div className={styles.contentInfoDiv__extra}>
                <BsThreeDots />
              </div>
            </button>
            {setting === false ? (
              <></>
            ) : (
              <div className={styles.contentInfoDiv__extraInfo}>
                <ul>
                  <li>
                    <button>수정</button>
                  </li>
                  <li>
                    <button>삭제</button>
                  </li>
                  <li>
                    <button onClick={() => setSetting(false)}>취소</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
