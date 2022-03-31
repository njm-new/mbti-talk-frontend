import styles from "../styles/ModifyPost.module.css";
import { useState, useRef, useEffect } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { patchPost } from "../api/http/Fetch";
import { Modal } from "../components/Modal";
import { PostModifyData } from "../data/ModalData";
import { postPicture, deletePicture } from "../api/http/Fetch";
import { BsChevronCompactLeft } from "react-icons/bs";

export const ModifyPost = ({
  postItem,
  imgSet,
  setModifyPostSetting,
  detailPageGetPost,
}) => {
  const [post, setPost] = useState({
    boardId: postItem.boardId,
    title: postItem.title,
    content: postItem.content,
    memberId: window.sessionStorage.getItem("userId"),
  });
  const [picture, setPicture] = useState([]);
  const [ImgSet, SetImgSet] = useState([...imgSet]);
  const [Selected, setSelected] = useState(postItem.boardId);
  const imageRef = useRef(null);
  const [insertModal, setInsertModal] = useState(false);

  document.body.style.overflow = "hidden";

  const handleChangeTitle = (e) => {
    const title = e.target.value;
    setPost({ ...post, title: title });
  };

  const handleChangeContent = (e) => {
    const content = e.target.value;
    setPost({ ...post, content: content });
  };

  const handleChangeImgExplain = (e) => {
    const newExplain = e.target.value;
    const num = Number(e.target.name);
    const newpicture = [];
    for (let i = 0; i < picture.length; i++) {
      if (picture[i].num !== num) {
        newpicture[i] = {
          num: picture[i].num,
          imgUrl: picture[i].imgUrl,
          explain: picture[i].explain,
          file: picture[i].file,
        };
      } else {
        newpicture[i] = {
          num: picture[i].num,
          imgUrl: picture[i].imgUrl,
          explain: newExplain,
          file: picture[i].file,
        };
      }
    }
    setPicture([...newpicture]);
  };

  const hadleFileButton = () => {
    imageRef.current.click();
  };

  let imgNum = useRef(0);

  const enterCancel = (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
    }
  };

  const handleFileOnChange = async (e) => {
    if (e.target.files.length > 3) {
      window.alert("3장 이내로 올려주세요.");
      return;
    } else {
      const fileArr = e.target.files;
      let file;
      let array = [];
      array = [...picture];
      for (let i = 0; i < fileArr.length; i++) {
        if (imgNum.current > 2) {
          window.alert("3장 이내로 올려주세요.");
          return;
        } else {
          file = fileArr[i];
          let fileUrls;
          // eslint-disable-next-line no-loop-func
          await fileReader(file).then((dataa) => {
            fileUrls = {
              num: imgNum.current,
              imgUrl: dataa,
              explain: "",
              file: file,
            };
            console.log(fileUrls);
          });
          array = [...array, fileUrls];
          setPicture([...array]);
          imgNum.current += 1;
        }
      }
    }
  };

  const imgCancel = (e) => {
    e.preventDefault();
    const num = Number(e.target.name);
    let newPicture = [];
    for (let i = 0; i < picture.length; i++) {
      if (picture[i].num !== num) {
        newPicture = [...newPicture, picture[i]];
      } else {
        imgNum.current -= 1;
      }
    }
    for (let i = 0; i < newPicture.length; i++) {
      newPicture[i].num = i;
    }
    setPicture([...newPicture]);
  };
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };
  useEffect(() => {
    setPost({ ...post, boardId: Selected });
  }, [Selected]);

  const fileReader = (file) =>
    new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
    });

  const handleSubmit = async () => {
    await patchPost(post, postItem.postId);
    detailPageGetPost();
    document.body.style.overflow = "unset";
    setInsertModal(false);
    setModifyPostSetting(false);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.container__top}>
            <div></div>
            <div className={styles.container__top__name}>
              <div>글수정</div>
              <select onChange={handleSelect} value={Selected}>
                <option value="ALL">전체</option>
                <option value={window.sessionStorage.getItem("userMbti")}>
                  {window.sessionStorage.getItem("userMbti")}
                </option>
              </select>
            </div>
            <button
              onClick={() => {
                setModifyPostSetting(false);
                document.body.style.overflow = "unset";
              }}
            >
              X
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.container__contents}>
              <input
                type="text"
                placeholder="제목을 입력해 주세요"
                value={post.title}
                onChange={handleChangeTitle}
                onKeyPress={(e) => enterCancel(e)}
                spellCheck={false}
              />
              <div className={styles.container__contents__hr}></div>
              <div className={styles.container__contents__textarea}>
                <textarea
                  spellCheck="false"
                  type="text"
                  placeholder="내용을 입력해 주세요"
                  value={post.content}
                  onChange={handleChangeContent}
                />
              </div>
            </div>
            {picture == null ? (
              <></>
            ) : (
              <div className={styles.container__contents__imageDiv}>
                {picture.map((item, id) => (
                  <div
                    className={styles.container__contents__imageDiv__div}
                    key={id}
                  >
                    <button
                      className={
                        styles.container__contents__imageDiv__cancelBtn
                      }
                      name={item.num}
                      onClick={imgCancel}
                    >
                      X
                    </button>
                    <img
                      className={styles.container__contents__imageDiv__image}
                      src={item.imgUrl}
                      key={id}
                      alt="sory"
                    />
                    <input
                      className={styles.container__contents__imageDiv__input}
                      type="text"
                      placeholder="사진에 대한 설명을 적어주세요. (선택)"
                      name={item.num}
                      value={picture[item.num].explain}
                      onChange={handleChangeImgExplain}
                      spellCheck={false}
                    />
                  </div>
                ))}
              </div>
            )}
          </form>
          <div className={styles.container__bottom}>
            <button onClick={hadleFileButton}>
              <AiOutlinePicture />
            </button>
            <input
              ref={imageRef}
              onChange={handleFileOnChange}
              accept="image/jpeg, image/jpg"
              type="file"
              multiple
            ></input>
            <button onClick={() => setInsertModal(true)}>수정</button>
          </div>
          {insertModal === false ? (
            <></>
          ) : (
            <Modal
              content={PostModifyData}
              checkBtn={handleSubmit}
              cancelBtn={() => setInsertModal(false)}
            />
          )}
        </div>
      </div>
      <div className={styles.backgroundModal}></div>
    </>
  );
};
