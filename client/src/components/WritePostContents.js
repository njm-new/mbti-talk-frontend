import { useState, useRef, useEffect } from "react";
import styles from "../styles/WritePostContents.module.css";
import { AiOutlinePicture } from "react-icons/ai";
import { postPost } from "../api/http/Fetch";
import { Modal } from "../components/Modal";
import { WritePostInfo } from "../atom/WritePostInfo";
import { useRecoilState } from "recoil";
import { PostInsertData } from "../data/ModalData";
import { postPicture } from "../api/http/Fetch";
import { BsChevronCompactLeft } from "react-icons/bs";
/*
function setFormData(formData, data, parentKey) {
  if (!(formData instanceof FormData)) return;
  if (!(data instanceof Object)) return;
  Object.keys(data).forEach((key) => {
    const val = data[key];
    if (parentKey) key = `${parentKey}[${key}]`;
    if (val instanceof Object && !Array.isArray(val)) {
      return setFormData(formData, val, key);
    }
    if (Array.isArray(val)) {
      val.forEach((v, idx) => {
        if (v instanceof Object) {
          setFormData(formData, v, `${key}[${idx}]`);
        } else {
          formData.append(`${key}[${idx}]`, v);
        }
      });
    } else {
      formData.append(key, val);
    }
  });
}
*/
export const WritePostContents = ({ setWrite }) => {
  const [post, setPost] = useState({
    boardId: "",
    title: "",
    content: "",
    memberId: window.sessionStorage.getItem("userId"),
  });
  const [picture, setPicture] = useState([]);
  const [Selected, setSelected] = useState("ALL");
  const imageRef = useRef(null);
  const [writePostInfo, setWritePostInfo] = useRecoilState(WritePostInfo);
  const postInsertData = PostInsertData;
  const [insertModal, setInsertModal] = useState(false);

  const openModal = () => {
    setInsertModal(true);
  };

  const cancelModal = () => {
    setInsertModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = post.content.trim();
    const title = post.title.trim();

    // 이미지 업로드

    const formData = new FormData();
    if (picture !== []) {
      for (let i = 0; i < picture.length; i++) {
        formData.append("imageVOList[" + i + "].comment", picture[i].explain);
        formData.append("imageVOList[" + i + "].file", picture[i].file);
      }
      postPicture(formData);
      for (let pair of formData.entries()) {
        console.log(`${pair[0]} = ${pair[1]}`);
      }
    }

    //제목 내용 업로드

    if (title === "") {
      window.alert("제목을 입력해주세요.");
      setInsertModal(false);
    } else if (content === "") {
      window.alert("내용을 입력해주세요.");
      setInsertModal(false);
    } else {
      setPost({ ...post, title: title, content: content });
      if (picture.length !== 0) {
        postPost(post)
          .then((data) => {
            const formData = new FormData();
            for (let i = 0; i < picture.length; i++) {
              formData.append(
                "imageVOList[" + i + "].comment",
                picture[i].explain.trim()
              );
              formData.append("imageVOList[" + i + "].file", picture[i].file);
              postPicture(formData, data.body.postId)
                .then((res) => {
                  if (res.status === 200) {
                    setWritePostInfo(writePostInfo + 1);
                    setWrite(false);
                    document.body.style.overflow = "unset";
                    setWrite(false);
                  }
                })
                .catch((err) => BsChevronCompactLeft.log(err));
            }
          })
          .catch((err) => console.log(err));
      } else {
        await postPost(post);
        setWritePostInfo(writePostInfo + 1);
        document.body.style.overflow = "unset";
        setWrite(false);
      }
    }
  };

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

  const cancel = () => {
    setWrite(false);
    document.body.style.overflow = "unset";
  };

  const enterCancel = (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
    }
  };
  const hadleFileButton = () => {
    imageRef.current.click();
  };

  let imgNum = useRef(0);

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

  const fileReader = (file) =>
    new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
    });

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

  /*
  useEffect(() => {
    console.log(picture);
    console.log("imgNum : " + imgNum.current);
  }, [picture]);
*/
  return (
    <div className={styles.container}>
      <div className={styles.container__top}>
        <div></div>
        <div className={styles.container__top__name}>
          <div>글쓰기</div>
          <select onChange={handleSelect} value={Selected}>
            <option value="ALL">전체</option>
            <option value={window.sessionStorage.getItem("userMbti")}>
              {window.sessionStorage.getItem("userMbti")}
            </option>
          </select>
        </div>

        <button onClick={cancel}>X</button>
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
                  className={styles.container__contents__imageDiv__cancelBtn}
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
        <button onClick={openModal}>등록</button>
      </div>
      {insertModal === false ? (
        <></>
      ) : (
        <Modal
          content={postInsertData}
          checkBtn={handleSubmit}
          cancelBtn={cancelModal}
        />
      )}
    </div>
  );
};
