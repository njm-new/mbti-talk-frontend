import { Comment } from "./Comment";
import styles from "../styles/Comments.module.css";
import { useCallback, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { userLogin, userInfo } from "../atom/User";
import { MbtiColor } from "./MbtiColor";
import { testComments } from "../data/testComments";

export const Comments = ({ postId }) => {
  const id = postId;
  const [comments, setComments] = useState(testComments);
  const ref = useRef(null);
  const [login, setLogin] = useRecoilState(userLogin);
  const [info, setInfo] = useRecoilState(userInfo);
  const [clickInput, setClickInput] = useState(false);
  const [content, setContent] = useState("");

  const handleResizeHeight = () => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = "25px";
    ref.current.style.height = ref.current.scrollHeight + "px";
  };

  const inputClick = () => {
    if (login === false) {
      window.alert("로그인을 해주세요.");
      ref.current.blur();
    } else {
      setClickInput(true);
    }
  };

  const contentChangeHandler = (e) => {
    let rows = e.currentTarget.value.length + 1;
    let maxRows = 100;

    if (rows < maxRows) {
      setContent(e.currentTarget.value);
    } else {
      let sl = e.currentTarget.value.slice(0, maxRows);
      setContent(sl);
    }
  };

  const onsubmitHandler = () => {
    if (content === "") {
      window.alert("내용을 입력해 주세요");
    } else {
      const contentsReplaceNewline = () => {
        const reple = content.replaceAll("<br>", "\r\n");
        return reple.trim();
      };

      const body = {
        commentId: 1,
        postId: 1,
        recommentId: 1,
        member: {
          memberId: 1,
          mbti: info.userMbti,
          nickname: info.userNickname,
        },
        content: contentsReplaceNewline(),
        likeCount: 200,
        createTime: Date(),
      };
      setComments([...comments, body]);
      setContent("");
      ref.current.style.height = "25px";
    }
  };

  const inputCancel = () => {
    setClickInput(false);
    ref.current.blur();
    setContent("");
    ref.current.style.height = "25px";
  };

  return (
    <div>
      <div className={styles.mainName}>댓글</div>
      {login === false ? (
        <></>
      ) : (
        <div className={styles.myInfoDiv}>
          <div>
            <MbtiColor mbti={info.userMbti}></MbtiColor>
          </div>
          <div className={styles.myInfoDiv__nickname}>{info.userNickname}</div>
        </div>
      )}
      <div>
        <textarea
          className={styles.inputText}
          placeholder="댓글을 남겨주세요."
          ref={ref}
          onInput={handleResizeHeight}
          spellcheck="false"
          onClick={inputClick}
          onChange={contentChangeHandler}
          value={content}
          rows="4"
        ></textarea>
        {clickInput === false ? (
          <></>
        ) : (
          <div className={styles.btnDiv}>
            <button
              className={styles.btnDiv__submitBtn}
              onClick={onsubmitHandler}
            >
              등록
            </button>
            <button className={styles.btnDiv__cancelBtn} onClick={inputCancel}>
              취소
            </button>
          </div>
        )}
      </div>
      <div>
        {comments.map((item) => (
          <Comment props={item} />
        ))}
      </div>
    </div>
  );
};
