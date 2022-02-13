import { useState, useRef } from "react";
import { patchComments } from "../api/http/Fetch";
import styles from "../styles/CommentModify.module.css";
import { Modal } from "../components/Modal";
import { CommentModifyData } from "../data/ModalData";

export const CommentModify = ({
  getCom,
  cont,
  postId,
  setModifyComment,
  commentId,
}) => {
  const [content, setContent] = useState(cont);
  const ref = useRef(null);
  const [modal, setModal] = useState(false);
  const modalData = CommentModifyData;

  const handleResizeHeight = () => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = "25px";
    ref.current.style.height = ref.current.scrollHeight + "px";
  };

  const inputClick = () => {
    setModifyComment(true);
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
      setContent(cont);
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
      const jwt = window.sessionStorage.getItem("jwt");
      patchComments(postId, commentId, content.trim())
        .then((res) => {
          if (res.status === 200) {
            getCom();
            setModifyComment(false);
            setContent("");
          }
        })
        .catch((err) => console.log(err));
      ref.current.style.height = "25px";
    }
  };

  const inputCancel = () => {
    setModifyComment(false);
    ref.current.blur();
    setContent("");
    ref.current.style.height = "25px";
    setModifyComment(false);
  };

  return (
    <div>
      <textarea
        className={styles.inputText}
        placeholder="댓글을 수정해주세요."
        ref={ref}
        onInput={handleResizeHeight}
        spellCheck="false"
        onClick={inputClick}
        onChange={contentChangeHandler}
        value={content}
        rows="4"
      ></textarea>
      <div className={styles.btnDiv}>
        <button className={styles.btnDiv__cancelBtn} onClick={inputCancel}>
          취소
        </button>
        <button
          className={styles.btnDiv__submitBtn}
          onClick={() => setModal(true)}
        >
          등록
        </button>
      </div>
      {modal === false ? (
        <></>
      ) : (
        <Modal
          content={modalData}
          checkBtn={onsubmitHandler}
          cancelBtn={() => setModal(false)}
        />
      )}
    </div>
  );
};
