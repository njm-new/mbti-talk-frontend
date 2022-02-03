import { getPost } from "../api/http/Fetch";
import { useEffect, useState } from "react";
import { MbtiColor } from "../components/MbtiColor";
import styles from "../styles/PostDetail.module.css";
import { BiTime } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { DateToTime } from "../util/DateToTime";
import { BiChevronRight } from "react-icons/bi";

export const PostDetail = ({ postId }) => {
  const [postItem, setPostItem] = useState({
    boardId: "",
    member: {
      memberId: 0,
      nickname: "",
      mbti: "",
    },
    title: "",
    content: "",
    viewCount: 0,
    likeCount: 0,
    createTime: "",
    modifiedTime: "",
  });
  const [time, setTime] = useState("");
  useEffect(() => {
    getPost(postId).then(async (data) => {
      setPostItem(data);
      const createTime = data.createTime;
      setTime(DateToTime(createTime));
    });
    /*
    const datenow = new Date();
    console.log(datenow);
    console.log(Date.parse(datenow));
    console.log(new Date(Date.parse(datenow)));
    console.log(timee);
    console.log(datenow - timee);
    */
  }, []);
  return (
    <div>
      <div className={styles.titleDiv}>
        <div className={styles.titleDiv__boardIdDiv}>
          <div>게시판</div>
          <BiChevronRight />
          <div>{postItem.boardId}</div>
        </div>
        <div className={styles.titleDiv__title}>{postItem.title}</div>
        <div className={styles.userInfoDiv}>
          <div className={styles.userInfoDiv__mbti}>
            <MbtiColor mbti={postItem.member.mbti} />
          </div>
          <div className={styles.userInfoDiv__nickname}>
            {postItem.member.nickname}
          </div>
        </div>
        <div className={styles.postInfoDiv}>
          <div className={styles.postInfoDiv__time}>
            <BiTime />
            <div className={styles.postInfoDiv__time__content}>{time}</div>
          </div>
          <div className={styles.postInfoDiv__view}>
            <BsEye />
            <div className={styles.postInfoDiv__view__content}>
              {postItem.viewCount}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.contentDiv}>
        <div>
          {postItem.content.split("\n").map((line) => (
            <div>
              {line}
              <br />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.likeDiv}>
        <BiLike />
        <div className={styles.likeDiv__count}>{postItem.likeCount}</div>
      </div>
      <hr />
      <div className={styles.comment}>댓글 {postItem.commentCount}</div>
    </div>
  );
};
