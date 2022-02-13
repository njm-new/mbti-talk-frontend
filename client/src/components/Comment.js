import styles from "../styles/Comment.module.css";
import { BiTime } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { DateToTime } from "../util/DateToTime";
import { MbtiColor } from "./MbtiColor";
import { userInfo } from "../atom/User";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { OutSideOff } from "../util/OuteSideOff";
import { useRef } from "react";
import { deleteComments } from "../api/http/Fetch";
import { CommentModify } from "../components/CommentModify";
import { Modal } from "../components/Modal";
import { CommentCancelData } from "../data/ModalData";

export const Comment = ({ props, getCom }) => {
  const time = DateToTime(props.createTime);
  const [info, setInfo] = useRecoilState(userInfo);
  const [setting, setSetting] = useState(false);
  const [modifyCommnet, setModifyComment] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const deleteModalData = CommentCancelData;

  const ref = useRef();
  const btnRef = useRef();
  OutSideOff(ref, btnRef, setSetting);

  const commentCancel = () => {
    const jwt = window.sessionStorage.getItem("jwt");
    deleteComments(jwt, props.postId, props.commentId)
      .then((res) => {
        if (res.status === 200) {
          getCom();
        }
      })
      .catch((err) => console.log(err));
    setSetting(false);
    setDeleteModal(false);
  };

  return (
    <div className={styles.container}>
      {modifyCommnet === false ? (
        <>
          <div className={styles.userInfoDiv}>
            <div>
              <MbtiColor mbti={props.mbti} />
            </div>
            <div className={styles.userInfoDiv__nickname}>{props.nickname}</div>
          </div>
          <div>
            {props.content.split("\n").map((line, id) => (
              <div key={id}>
                {line}
                <br />
              </div>
            ))}
          </div>
          <div className={styles.contentInfoDiv}>
            <div className={styles.contentInfoDiv__timeDiv}>
              <div className={styles.contentInfoDiv__timeDiv__timeIcon}>
                <BiTime />
              </div>
              <div className={styles.contentInfoDiv__timeDiv__time}>{time}</div>
            </div>

            {props.memberId == info.userId ? (
              <div className={styles.contentInfoDiv__extraDiv}>
                <button onClick={() => setSetting(true)} ref={btnRef}>
                  <div className={styles.contentInfoDiv__extra}>
                    <BsThreeDots />
                  </div>
                </button>
                {setting === false ? (
                  <></>
                ) : (
                  <div className={styles.container__moreInfo} ref={ref}>
                    <ul>
                      <li>
                        <button
                          onClick={() => {
                            setModifyComment(true);
                            setSetting(false);
                          }}
                        >
                          수정
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            setDeleteModal(true);
                            setSetting(false);
                          }}
                        >
                          삭제
                        </button>
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
        </>
      ) : (
        <CommentModify
          getCom={getCom}
          cont={props.content}
          postId={props.postId}
          setModifyComment={setModifyComment}
          commentId={props.commentId}
        />
      )}
      {deleteModal === false ? (
        <></>
      ) : (
        <Modal
          content={deleteModalData}
          checkBtn={commentCancel}
          cancelBtn={() => setDeleteModal(false)}
        />
      )}
    </div>
  );
};
