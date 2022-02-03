import { useState, useRef, useEffect } from "react";
import styles from "../styles/WritePostContents.module.css";
import { AiOutlinePicture } from "react-icons/ai";

export const WritePostContents = ({ setWrite }) => {
  const [post, setPost] = useState({
    title: "",
    content: "",
  });
  const [picture, setPicture] = useState([]);

  const imageRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = post.content.trim();
    const title = post.title.trim();
    setPost({ ...post, title: title, content: content });
    window.alert(post.title + " " + post.content);
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
    const newExplain = e.target.value.trim();
    const num = Number(e.target.name);
    const newpicture = [];
    for (let i = 0; i < picture.length; i++) {
      if (picture[i].num !== num) {
        newpicture[i] = {
          num: picture[i].num,
          imgUrl: picture[i].imgUrl,
          explain: picture[i].explain,
        };
      } else {
        newpicture[i] = {
          num: picture[i].num,
          imgUrl: picture[i].imgUrl,
          explain: newExplain,
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
            fileUrls = { num: imgNum.current, imgUrl: dataa, explain: "" };
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
        <div>글쓰기</div>
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
        <button onClick={handleSubmit}>등록</button>
      </div>
    </div>
  );
};
