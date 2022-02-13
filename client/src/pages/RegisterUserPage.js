import { useState } from "react";
import { MbtiSelect } from "../components/MbtiSelect";
import { MbtiAll } from "../data/MbtiAll";
import { BaseUrl } from "../ignore/Base";
import { userLogin, userInfo } from "../atom/User";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import styles from "../styles/RegisterUserPage.module.css";
import { MbtiColor } from "../components/MbtiColor";
import { patchMember } from "../api/http/Fetch";
import { Modal } from "../components/Modal";
import { RegisterModalData } from "../data/ModalData";

export const RegisterUserPage = () => {
  const [login, setLogin] = useRecoilState(userLogin);
  const [info, setInfo] = useRecoilState(userInfo);
  const [modalShow, setModalShow] = useState(false);
  document.body.style.overflow = "hidden";
  const [content, setContent] = useState({
    title: "MBTI 선택",
    content: "MBTI를 선택하시겠습니까?",
  });
  const history = useNavigate();
  const [actives, setActives] = useState({
    first: "",
    second: "",
    third: "",
    fourth: "",
  });
  const [mbtiAll, setMbtiAll] = useState(MbtiAll);
  const [myMbti, setMyMbti] = useState({
    first: "",
    second: "",
    third: "",
    fourth: "",
  });
  const baseUrl = BaseUrl;
  const mbtiSet = (num, mbti) => {
    if (num === "first") {
      setMyMbti({ ...myMbti, first: mbti });
      if (mbti === "E") {
        setActives({ ...actives, first: "E" });
      } else {
        setActives({ ...actives, first: "I" });
      }
    } else if (num === "second") {
      setMyMbti({ ...myMbti, second: mbti });
      if (mbti === "S") {
        setActives({ ...actives, second: "S" });
      } else {
        setActives({ ...actives, second: "N" });
      }
    } else if (num === "third") {
      setMyMbti({ ...myMbti, third: mbti });
      if (mbti === "T") {
        setActives({ ...actives, third: "T" });
      } else {
        setActives({ ...actives, third: "F" });
      }
    } else {
      setMyMbti({ ...myMbti, fourth: mbti });
      if (mbti === "J") {
        setActives({ ...actives, fourth: "J" });
      } else {
        setActives({ ...actives, fourth: "P" });
      }
    }
  };
  const submit = () => {
    if (
      myMbti.first === "" ||
      myMbti.second === "" ||
      myMbti.third === "" ||
      myMbti.fourth === ""
    ) {
      window.alert("4가지를 선택해주세요!");
    } else {
      const newMbt =
        myMbti.first + myMbti.second + myMbti.third + myMbti.fourth;

      const modalContent = RegisterModalData(newMbt);
      setContent({ title: modalContent.title, content: modalContent.content });
      setModalShow(true);
    }
  };

  const checkBtn = () => {
    const mbt = myMbti.first + myMbti.second + myMbti.third + myMbti.fourth;
    const member = {
      memberId: window.sessionStorage.getItem("userId"),
      nickname: window.sessionStorage.getItem("userNickname"),
      mbti: mbt,
      content: window.sessionStorage.getItem("userContent"),
    };
    patchMember(window.sessionStorage.getItem("jwt"), member)
      .then((res) => {
        if (res.status === 200) {
          window.sessionStorage.setItem("userMbti", mbt);
          setLogin(true);
          setInfo({
            ...info,
            userId: window.sessionStorage.getItem("userId"),
            userNickname: window.sessionStorage.getItem("userNickname"),
            userMbti: mbt,
            userContent: window.sessionStorage.getItem("userContent"),
          });
          document.body.style.overflow = "unset";
          history("/");
        }
      })
      .catch((err) => window.alert(err));
  };

  const cancelBtn = () => {
    setModalShow(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.container__main}>
        <div className={styles.container__mainMbti}>
          MY MBTI
          <div>
            <MbtiColor
              mbti={myMbti.first + myMbti.second + myMbti.third + myMbti.fourth}
            />
          </div>
        </div>
        <div className={styles.container__select}>
          <div className={styles.container__selectDiv}>
            <MbtiSelect item={mbtiAll.E} actives={actives} mbtiSet={mbtiSet} />
            <div className={styles.container__vs}>VS</div>
            <MbtiSelect item={mbtiAll.I} actives={actives} mbtiSet={mbtiSet} />
          </div>
          <div className={styles.container__selectDiv}>
            <MbtiSelect item={mbtiAll.S} actives={actives} mbtiSet={mbtiSet} />
            <div className={styles.container__vs}>VS</div>
            <MbtiSelect item={mbtiAll.N} actives={actives} mbtiSet={mbtiSet} />
          </div>
          <div className={styles.container__selectDiv}>
            <MbtiSelect item={mbtiAll.T} actives={actives} mbtiSet={mbtiSet} />
            <div className={styles.container__vs}>VS</div>
            <MbtiSelect item={mbtiAll.F} actives={actives} mbtiSet={mbtiSet} />
          </div>
          <div className={styles.container__selectDiv}>
            <MbtiSelect item={mbtiAll.J} actives={actives} mbtiSet={mbtiSet} />
            <div className={styles.container__vs}>VS</div>
            <MbtiSelect item={mbtiAll.P} actives={actives} mbtiSet={mbtiSet} />
          </div>
        </div>
        <div className={styles.container__linkDiv}>
          <a
            href="https://www.16personalities.com/ko/무료-성격-유형-검사"
            target="_blank"
            rel="noreferrer"
          >
            자세한 검사를 원하시면 이곳을 눌러주세요.
          </a>
          <button className={styles.container__linkDiv__btn} onClick={submit}>
            등록
          </button>
        </div>
      </div>
      {modalShow === false ? (
        <></>
      ) : (
        <Modal content={content} checkBtn={checkBtn} cancelBtn={cancelBtn} />
      )}
    </div>
  );
};
