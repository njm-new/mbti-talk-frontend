import { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import styles from "../styles/MbtiPage.module.css";
import { MbtiRoute } from "../components/MbtiRoute";
import { MainBar } from "../components/MainBar";
import { LoginMenu } from "../components/LoginMenu";
import { userLogin, userInfo } from "../atom/User";

export const MbtiPage = () => {
  const [loginMenu, loginMenuSet] = useState(false);
  const [login, setLogin] = useRecoilState(userLogin);
  const [info, setInfo] = useRecoilState(userInfo);

  const loginMenuShow = () => {
    loginMenuSet(true);
  };
  const loginMenuUnShow = () => {
    loginMenuSet(false);
  };

  useEffect(() => {
    if (window.sessionStorage.getItem("jwt") !== null) {
      setLogin(true);
      setInfo({
        ...info,
        userId: window.sessionStorage.getItem("userId"),
        userNickname: window.sessionStorage.getItem("userNickname"),
        userMbti: window.sessionStorage.getItem("userMbti"),
        userContent: window.sessionStorage.getItem("userContent"),
      });
    } else {
      setLogin(false);
      setInfo({
        ...info,
        userId: "",
        userNickname: "",
        userMbti: "",
        userContent: "",
      });
    }
  }, []);

  return (
    <div>
      <div className={styles.mainContainerBar}>
        <MainBar loginMenuShow={loginMenuShow} />
        {loginMenu === true ? (
          <div>
            <div className={styles.loginMenuDiv}>
              <div className={styles.loginMenu}>
                <LoginMenu loginMenuUnShow={loginMenuUnShow} />
              </div>
            </div>
            <div className={styles.modalBackground}></div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.bar}>
        <div className={styles.bar__content}></div>
      </div>
      <div className={styles.page}>
        <MbtiRoute />
      </div>
    </div>
  );
};
