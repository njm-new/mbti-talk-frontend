import styles from "../styles/MainBar.module.css";
import mbtiIconSrc from "../icon/mbti_icon.png";
import { MyInfo } from "../components/MyInfo";
import { userLogin } from "../atom/User";
import { useRecoilState } from "recoil";
export const MainBar = ({ loginMenuShow }) => {
  const [login, setLogin] = useRecoilState(userLogin);
  return (
    <div>
      <div className={styles.container}>
        <section>
          <button>
            <img src={mbtiIconSrc} alt="" />
          </button>
        </section>
        <section>
          <ul className={styles.container__mbtiList}>
            <li>
              <button>전체 MBTI</button>
            </li>
            <li>
              <button>내 MBTI</button>
            </li>
          </ul>
        </section>
        <section>
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
        </section>
      </div>
      <hr />
    </div>
  );
};
