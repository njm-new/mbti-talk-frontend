import styles from "../styles/MyProfile.module.css";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { nicknameCheck, patchMember, getMember } from "../api/http/Fetch";
import { Modal } from "../components/Modal";

export const MyProfile = () => {
  const [userId, setUserId] = useState(window.sessionStorage.getItem("userId"));
  const [info, setInfo] = useState({
    userMbti: "",
    userNickname: "",
    userContent: "",
  });
  const [defualtInfo, setDefualtInfo] = useState({
    userMbti: "",
    userNickname: "",
    userContent: "",
  });
  const [btn, setBtn] = useState(false);
  const [doubleCheck, setDoubleCheck] = useState(false);
  const [checkBtn, setCheckBtn] = useState(true);
  const [modal, setModal] = useState(false);
  const history = useNavigate();
  const regS = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gim;
  const regN = /[0-9 ]/gim;
  const modalContent = {
    title: "정보 수정",
    content: "정보를 수정하시겠습니까?",
  };

  useEffect(() => {
    getMember(userId).then((data) => {
      setInfo({
        userMbti: data.body.mbti,
        userNickname: data.body.nickname,
        userContent: data.body.content === "null" ? "" : data.body.content,
      });
      setDefualtInfo({
        userMbti: data.body.mbti,
        userNickname: data.body.nickname,
        userContent: data.body.content === "null" ? "" : data.body.content,
      });
    });
  }, []);

  useEffect(() => {
    if (info.userContent !== defualtInfo.userContent) {
      if (info.userNickname !== defualtInfo.userNickname) {
        if (doubleCheck) {
          setBtn(true);
        } else {
          setBtn(false);
        }
      } else {
        setBtn(true);
      }
    } else {
      setBtn(false);
    }
  }, [info]);

  useEffect(() => {
    if (doubleCheck) {
      setBtn(true);
    } else {
      setBtn(false);
    }
  }, [doubleCheck]);

  const handleChangeNickname = (e) => {
    const nickname = e.target.value.trim();
    if (nickname.indexOf(" ") !== -1) {
      window.alert("띄어쓰기를 입력할 수 없습니다.");
      const newNick = nickname.replace(" ", "");
      setInfo({ ...info, userNickname: newNick });
    } else if (nickname.length > 10) {
      window.alert("10글자 이내로 입력해 주세요.");
      const newNick = nickname.slice(0, 10);
      setInfo({ ...info, userNickname: newNick });
    } else if (regS.test(nickname)) {
      window.alert("특수문자를 입력할 수 없습니다.");
      const newNick = nickname.replace(regS, "");
      setInfo({ ...info, userNickname: newNick });
    } else if (regN.test(nickname)) {
      window.alert("숫자를 입력할 수 없습니다.");
      const newNick = nickname.replace(regN, "");
      setInfo({ ...info, userNickname: newNick });
    } else {
      setInfo({ ...info, userNickname: nickname });
    }
  };

  const handleChangeContent = (e) => {
    const newContent = e.target.value.slice(0, 50);
    setInfo({ ...info, userContent: newContent });
  };

  const handleDoubleCheck = () => {
    nicknameCheck(info.userNickname).then((res) => {
      if (res.status === 200) {
        setDoubleCheck(true);
        setCheckBtn(false);
        window.alert("해당 닉네임을 사용할 수 있습니다.");
      }
    });
  };

  const handleSubmit = () => {
    const member = {
      memberId: window.sessionStorage.getItem("userId"),
      nickname: info.userNickname,
      mbti: info.userMbti,
      content: info.userContent,
    };
    patchMember(member).then((res) => {
      if (res.status === 200) {
        window.sessionStorage.setItem("userNickname", info.userNickname);
        window.sessionStorage.setItem("userContent", info.userContent);
        setBtn(false);
        setCheckBtn(true);
        setDoubleCheck(false);
      } else {
        window.alert("다시 시도해 주세요.");
      }
    });
    setModal(false);
  };

  const cancelModal = () => {
    setModal(false);
  };

  const openModal = () => {
    setModal(true);
  };

  return (
    <div className={styles.mainBackground}>
      <div className={styles.container}>
        <div className={styles.container__top}>
          <div>
            <div>
              <CgProfile />
            </div>
            <div className={styles.container__top__title}>내 프로필</div>
          </div>
          <div>
            {btn === false ? (
              <button className={styles.container__bottom__content__input__btn}>
                수정
              </button>
            ) : (
              <button
                className={styles.container__bottom__content__input__btnActive}
                onClick={openModal}
              >
                수정
              </button>
            )}
          </div>
        </div>
        <div className={styles.container__bottom}>
          <div className={styles.container__bottom__content}>
            <div>MBTI</div>
            <div>:</div>
            <div>
              <input
                value={info.userMbti}
                spellCheck="false"
                onClick={() => history("/register")}
              ></input>
            </div>
          </div>
          <div className={styles.container__bottom__content}>
            <div>닉네임</div>
            <div>:</div>
            <div className={styles.container__bottom__content__input}>
              {doubleCheck === true ? (
                <div className={styles.replaceInput}>{info.userNickname}</div>
              ) : (
                <input
                  value={info.userNickname}
                  onChange={handleChangeNickname}
                  spellCheck="false"
                />
              )}
              {checkBtn === false ? (
                <button
                  className={styles.container__bottom__content__input__btn}
                >
                  중복확인
                </button>
              ) : (
                <button
                  className={
                    styles.container__bottom__content__input__btnActive
                  }
                  onClick={handleDoubleCheck}
                >
                  중복확인
                </button>
              )}
            </div>
          </div>
          <div className={styles.container__bottom__content}>
            <div>소개글</div>
            <div>:</div>
            <div>
              <textarea
                value={info.userContent}
                onChange={handleChangeContent}
                spellCheck="false"
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      {modal === false ? (
        <></>
      ) : (
        <Modal
          content={modalContent}
          checkBtn={handleSubmit}
          cancelBtn={cancelModal}
        />
      )}
    </div>
  );
};
