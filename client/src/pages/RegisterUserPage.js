import { useState } from "react";
import { MbtiSelect } from "../components/MbtiSelect";
import { MbtiAll } from "../data/MbtiAll";
import { BaseUrl } from "../ignore/Base";
import { userLogin, userInfo } from "../atom/User";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import styles from "../styles/RegisterUserPage.module.css";
import { MbtiColor } from "../components/MbtiColor";

export const RegisterUserPage = () => {
  const [login, setLogin] = useRecoilState(userLogin);
  const [info, setInfo] = useRecoilState(userInfo);
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
      const mbt = myMbti.first + myMbti.second + myMbti.third + myMbti.fourth;

      fetch(`${baseUrl}/api/member/mbti`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: window.sessionStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          mbti: mbt,
        }),
      }).then((res) => {
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
          history("/");
        } else if (res.status === 403) {
          window.alert("로그인 만료. 로그인을 다시해 주세요!");
          window.sessionStorage.clear();
          history("/");
        } else {
          window.alert("설정에 실패했습니다. 다시 시도해 주세요.");
        }
      });
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.container__mainMbti}>
        MY MBTI
        <div>
          <MbtiColor
            mbti={myMbti.first + myMbti.second + myMbti.third + myMbti.fourth}
          />
        </div>
      </div>

      <div className={styles.container__select}>
        {mbtiAll.map((item, id) => (
          <>
            <MbtiSelect
              id={id}
              mbti={item.mbti}
              main={item.main}
              sub={item.sub}
              num={item.num}
              actives={actives}
              mbtiSet={mbtiSet}
            />
            {(id + 1) % 2 === 1 ? (
              <div className={styles.container__vs}>VS</div>
            ) : (
              <></>
            )}
            {(id + 1) % 2 === 0 ? (
              <div className={styles.container__blank}></div>
            ) : (
              <></>
            )}
          </>
        ))}
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
  );
};
