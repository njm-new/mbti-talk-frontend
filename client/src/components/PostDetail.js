import { useEffect, useState, useRef } from "react";
import { MbtiColor } from "../components/MbtiColor";
import styles from "../styles/PostDetail.module.css";
import { BiTime } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { DateToTime } from "../util/DateToTime";
import { BiChevronRight } from "react-icons/bi";
import { postLike, deleteLike, getPicture } from "../api/http/Fetch";
import { AiFillLike } from "react-icons/ai";
import { AiFillSetting } from "react-icons/ai";
import { OutSideOff } from "../util/OuteSideOff";
import { deletePost } from "../api/http/Fetch";
import { useNavigate } from "react-router-dom";
import { Modal } from "../components/Modal";
import { PostCancelData, PostModifyData } from "../data/ModalData";
import { ModifyPost } from "./ModifyPost";

export const PostDetail = ({ post, detailPageGetPost }) => {
  const [time, setTime] = useState(0);
  const [postItem, setPostItem] = useState(post);
  const [postSetting, setPostSetting] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [ModifyModal, setModifyModal] = useState(false);
  const [modifyPostSetting, setModifyPostSetting] = useState(false);
  const postCancelData = PostCancelData;
  const postModifyData = PostModifyData;
  const history = useNavigate();
  const memberId = post.memberId.split("-");

  const [imgSet, setImgSet] = useState([]);

  const ref = useRef();
  const btnRef = useRef();
  OutSideOff(ref, btnRef, setPostSetting);

  useEffect(() => {
    setTime(DateToTime(postItem.createTime));
    getPicture(postItem.postId)
      .then((data) => {
        setImgSet([...data.body]);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setPostItem(post);
  }, [post]);

  const delPost = () => {
    setPostSetting(false);
    deletePost(postItem.postId)
      .then((res) => {
        if (res.status === 200) {
          history("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const postDeleteModal = () => {
    setCancelModal(false);
  };

  const modifyPost = () => {
    setModifyPostSetting(true);
    setModifyModal(false);
  };

  const postModifyModal = () => {
    setModifyModal(false);
  };

  const goodLike = () => {
    postLike(postItem.postId)
      .then((res) => {
        if (res.status === 200) {
          setPostItem({
            ...postItem,
            like: true,
            likeCount: postItem.likeCount + 1,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const cancelLike = () => {
    deleteLike(postItem.postId)
      .then((res) => {
        if (res.status === 200) {
          setPostItem({
            ...postItem,
            like: false,
            likeCount: postItem.likeCount - 1,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className={styles.titleDiv}>
        <div className={styles.titleDiv__boardIdDiv}>
          <div>게시판</div>
          <BiChevronRight />
          <div>{postItem.boardId === "ALL" ? "전체" : postItem.boardId}</div>
        </div>
        <div className={styles.titleDiv__title}>{postItem.title}</div>
        <div className={styles.userInfoDiv}>
          <div className={styles.userInfoDiv__mbti}>
            <MbtiColor mbti={postItem.mbti} />
          </div>
          <div className={styles.userInfoDiv__nickname}>
            {postItem.nickname}
          </div>
        </div>
        <div className={styles.postInfoBigDiv}>
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
          <div className={styles.postSettingDiv}>
            {memberId[1] === window.sessionStorage.getItem("userId") ? (
              <button onClick={() => setPostSetting(true)} ref={btnRef}>
                <AiFillSetting />
              </button>
            ) : (
              <></>
            )}

            {postSetting === false ? (
              <></>
            ) : (
              <div className={styles.container__moreInfo} ref={ref}>
                <ul>
                  <li>
                    <button
                      onClick={() => {
                        setModifyModal(true);
                      }}
                    >
                      수정
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setCancelModal(true);
                      }}
                    >
                      삭제
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setPostSetting(false)}>취소</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.contentDiv}>
        <div>
          {postItem.content.split("\n").map((line, id) => (
            <div key={id}>
              {line}
              <br />
            </div>
          ))}
        </div>
      </div>
      {imgSet.length === 0 ? (
        <></>
      ) : (
        imgSet.map((item, id) => (
          <div className={styles.imgDiv} key={id}>
            <img alt="sorryImg" src={item.pictureUrl} />
            <div>{item.comment}</div>
          </div>
        ))
      )}
      <div className={styles.likeDiv}>
        {postItem.like === false ? (
          <button onClick={goodLike}>
            <BiLike />
          </button>
        ) : (
          <button onClick={cancelLike} className={styles.likeDiv__likeActive}>
            <AiFillLike />
          </button>
        )}
        <div className={styles.likeDiv__count}>{postItem.likeCount}</div>
      </div>
      <hr />
      {cancelModal === false ? (
        <></>
      ) : (
        <Modal
          content={postCancelData}
          checkBtn={delPost}
          cancelBtn={postDeleteModal}
        />
      )}
      {ModifyModal === false ? (
        <></>
      ) : (
        <Modal
          content={postModifyData}
          checkBtn={modifyPost}
          cancelBtn={postModifyModal}
        />
      )}
      {modifyPostSetting === false ? (
        <></>
      ) : (
        <ModifyPost
          postItem={postItem}
          imgSet={imgSet}
          setModifyPostSetting={setModifyPostSetting}
          detailPageGetPost={detailPageGetPost}
        />
      )}
    </div>
  );
};
