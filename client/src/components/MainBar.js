import styles from "../styles/MainBar.module.css";
import logo from "../icon/mbtitalkLogoBig.png";
import { MyInfo } from "../components/MyInfo";
import { userLogin } from "../atom/User";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { SelectMbti } from "./SelectMbti";
import { useState, useRef } from "react";
import { WritePost } from "../components/WritePost";
import { RiPencilFill } from "react-icons/ri";

export const MainBar = ({ loginMenuShow }) => {
  const [login, setLogin] = useRecoilState(userLogin);
  const [write, setWrite] = useState(false);
  const history = useNavigate();

  const moveWritePage = () => {
    if (login === true) {
      setWrite(true);
      document.body.style.overflow = "hidden";
    } else {
      window.alert("로그인을 해주세요.");
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <section className={styles.container__logoName}>
          <button onClick={() => history("/")}>
            <div className={styles.container__logo_btn}>
              <img src={logo} alt="없음" className={styles.container__logo} />
            </div>
          </button>
        </section>
        <section className={styles.container__right}>
          {login === false ? (
            <button
              className={styles.container__loginBtn}
              onClick={loginMenuShow}
            >
              로그인
            </button>
          ) : (
            <MyInfo />
          )}
          <button
            className={styles.container__topDiv__sub__btn}
            onClick={moveWritePage}
          >
            글쓰기
          </button>
        </section>
        {write === true ? (
          <>
            <div className={styles.writePostDiv}>
              <div className={styles.writePost}>
                <WritePost setWrite={setWrite} />
              </div>
            </div>
            <div className={styles.modalBackground}></div>
          </>
        ) : (
          <></>
        )}
      </div>
      <button
        className={styles.container__topDiv__sub__btnMobile}
        onClick={moveWritePage}
      >
        <RiPencilFill />
      </button>
    </div>
  );
};
