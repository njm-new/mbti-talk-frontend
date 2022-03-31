import { Comment } from "./Comment";
import styles from "../styles/Comments.module.css";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { userLogin } from "../atom/User";
import { getComments, postComments } from "../api/http/Fetch";
import { Modal } from "../components/Modal";
import { CommentInsertData, CommentCancelData } from "../data/ModalData";

export const Comments = ({ postId }) => {
  const [comments, setComments] = useState(null);
  const [commentsCount, setCommentsCount] = useState(null);
  const ref = useRef(null);
  const [login, setLogin] = useRecoilState(userLogin);
  const [clickInput, setClickInput] = useState(false);
  const [content, setContent] = useState("");
  const [insertModal, setInsertModal] = useState(false);
  const insertModalData = CommentInsertData;

  useEffect(() => {
    getCom();
  }, []);

  const getCom = () => {
    getComments(postId).then((data) => {
      setComments(data.body.commentList);
      setCommentsCount(data.body.commentCount);
    });
  };

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

      const comment = {
        postId: postId,
        memberId: window.sessionStorage.getItem("userId"),
        content: content,
      };
      postComments(postId, comment)
        .then((res) => {
          if (res.status === 200) {
            getCom();
          }
        })
        .catch((err) => console.log(err));
      ref.current.style.height = "25px";
    }
    setClickInput(false);
    setContent("");
    setInsertModal(false);
  };

  const inputCancel = () => {
    setClickInput(false);
    ref.current.blur();
    setContent("");
    ref.current.style.height = "25px";
  };

  return (
    <div>
      <div className={styles.comment}>댓글 {commentsCount}</div>
      <div>
        <textarea
          className={styles.inputText}
          placeholder="댓글을 남겨주세요."
          ref={ref}
          onInput={handleResizeHeight}
          spellCheck="false"
          onClick={inputClick}
          onChange={contentChangeHandler}
          value={content}
          rows="4"
        ></textarea>
        {clickInput === false ? (
          <></>
        ) : (
          <div className={styles.btnDiv}>
            <button className={styles.btnDiv__cancelBtn} onClick={inputCancel}>
              취소
            </button>
            <button
              className={styles.btnDiv__submitBtn}
              onClick={() => setInsertModal(true)}
            >
              등록
            </button>
          </div>
        )}
      </div>
      {comments == null ? (
        <></>
      ) : (
        <div>
          {comments.map((item, id) => (
            <div className={styles.commentDiv} key={id}>
              <Comment props={item} key={id} getCom={getCom} />
            </div>
          ))}
        </div>
      )}
      {insertModal === false ? (
        <></>
      ) : (
        <Modal
          content={insertModalData}
          checkBtn={onsubmitHandler}
          cancelBtn={() => setInsertModal(false)}
        />
      )}
    </div>
  );
};
