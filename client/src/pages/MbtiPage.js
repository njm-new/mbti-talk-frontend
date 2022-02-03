import { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import styles from "../styles/MbtiPage.module.css";
import Draggable from "react-draggable";
import { MbtiRoute } from "../components/MbtiRoute";
import { MainBar } from "../components/MainBar";
import { LoginMenu } from "../components/LoginMenu";
import { userLogin, userInfo } from "../atom/User";
import { SelectMbti } from "../components/SelectMbti";

export const MbtiPage = () => {
  const [loginMenu, loginMenuSet] = useState(false);
  const [login, setLogin] = useRecoilState(userLogin);
  const [info, setInfo] = useRecoilState(userInfo);
  const nodeRef = useRef(null);
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
            <Draggable nodeRef={nodeRef}>
              <div ref={nodeRef} className={styles.loginMenu}>
                <LoginMenu loginMenuUnShow={loginMenuUnShow} />
              </div>
            </Draggable>
            <div className={styles.modalBackground}></div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.bar}>
        <div className={styles.bar__content}></div>
      </div>

      <MbtiRoute />
    </div>
  );
};
