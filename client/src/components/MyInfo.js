import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/MyInfo.module.css";
import { useRecoilState } from "recoil";
import { userLogin, userInfo } from "../atom/User";
import { MbtiColor } from "../components/MbtiColor";

export const MyInfo = () => {
  const [login, setLogin] = useRecoilState(userLogin);
  const [info, setInfo] = useRecoilState(userInfo);
  const history = useNavigate();
  const logOut = () => {
    sessionStorage.clear();
    setLogin(false);
    setInfo({
      ...info,
      userId: "",
      userNickname: "",
      userMbti: "",
      userContent: "",
    });
    history("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__info}>
        <MbtiColor mbti={info.userMbti} />
        <div className={styles.container__info__nickname}>
          {info.userNickname}
        </div>
      </div>
      <button className={styles.container__btn} onClick={logOut}>
        로그아웃
      </button>
    </div>
  );
};
