import styles from "../styles/MyProfile.module.css";
import { userInfo } from "../atom/User";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { nicknameCheck, patchMember, getMember } from "../api/http/Fetch";
import { Modal } from "../components/Modal";

export const MyProfile = () => {
  const [user, setUser] = useRecoilState(userInfo);
  const [info, setInfo] = useState(user);
  const [btn, setBtn] = useState(false);
  const [checkedNick, setCheckedNick] = useState("");
  const [doubleCheck, setDoubleCheck] = useState(false);
  const [checkBtn, setCheckBtn] = useState(false);
  const [modal, setModal] = useState(false);
  const history = useNavigate();
  const regS = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gim;
  const regN = /[0-9 ]/gim;
  const modalContent = {
    title: "정보 수정",
    content: "정보를 수정하시겠습니까?",
  };

  useEffect(() => {
    setInfo(user);
  }, [user]);

  useEffect(() => {
    if (info.userNickname !== user.userNickname) {
      setCheckBtn(true);
    } else {
      setCheckBtn(false);
    }
    if (
      info.userContent !== user.userContent ||
      info.userNickname !== user.userNickname
    ) {
      setBtn(true);
    } else {
      setBtn(false);
    }
  }, [info]);

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
    //const content = e.target.value.trim();
    const newContent = e.target.value.slice(0, 50);
    setInfo({ ...info, userContent: newContent });
  };

  const handleDoubleCheck = () => {
    const jwt = window.sessionStorage.getItem("jwt");
    nicknameCheck(jwt, info.userNickname).then((res) => {
      if (res.status === 200) {
        setCheckedNick(info.userNickname);
        setDoubleCheck(true);
        window.alert("해당 닉네임을 사용할 수 있습니다.");
      }
    });
  };

  const handleSubmit = () => {
    if (checkBtn === true && doubleCheck === false) {
      window.alert("중복확인을 해주세요.");
    } else {
      if (doubleCheck === true) {
        const jwt = window.sessionStorage.getItem("jwt");
        const member = {
          memberId: window.sessionStorage.getItem("userId"),
          nickname: checkedNick,
          mbti: window.sessionStorage.getItem("userMbti"),
          content: info.userContent,
        };

        patchMember(jwt, member)
          .then((res) => {
            if (res.status === 200) {
              const id = window.sessionStorage.getItem("userId");
              getMember(id)
                .then((data) => {
                  window.sessionStorage.setItem(
                    "userNickname",
                    data.body.nickname
                  );
                  window.sessionStorage.setItem(
                    "userContent",
                    data.body.content
                  );
                  setInfo({
                    userMbti: data.body.mbti,
                    userNickname: data.body.nickname,
                    userId: data.body.memberId,
                    userContent: data.body.memberContent,
                  });
                  setCheckedNick("");
                  setDoubleCheck(false);
                  setBtn(false);
                  setCheckBtn(false);
                })
                .catch((err) => console.log(err));
              setModal(false);
              window.alert("수정에 성공하였습니다.");
            }
          })
          .catch((err) => console.log(err));
      } else {
        const jwt = window.sessionStorage.getItem("jwt");
        const member = {
          memberId: window.sessionStorage.getItem("userId"),
          nickname: window.sessionStorage.getItem("userNickname"),
          mbti: window.sessionStorage.getItem("userMbti"),
          content: info.userContent,
        };

        patchMember(jwt, member)
          .then((res) => {
            if (res.status === 200) {
              const id = window.sessionStorage.getItem("userId");
              getMember(id)
                .then((data) => {
                  window.sessionStorage.setItem(
                    "userNickname",
                    data.body.nickname
                  );
                  window.sessionStorage.setItem(
                    "userContent",
                    data.body.content
                  );
                  setInfo({
                    userMbti: data.body.mbti,
                    userNickname: data.body.nickname,
                    userId: data.body.memberId,
                    userContent: data.body.memberContent,
                  });
                  setCheckedNick("");
                  setDoubleCheck(false);
                  setBtn(false);
                  setCheckBtn(false);
                })
                .catch((err) => console.log(err));
              setModal(false);
              window.alert("수정에 성공하였습니다.");
            }
          })
          .catch((err) => console.log(err));
      }
    }
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
              <input
                value={info.userNickname}
                onChange={handleChangeNickname}
                spellCheck="false"
              ></input>
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
