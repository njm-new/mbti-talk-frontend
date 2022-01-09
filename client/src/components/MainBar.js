import styles from "../styles/MainBar.module.css";
import logo from "../icon/logo.png";
import { MyInfo } from "../components/MyInfo";
import { userLogin, userInfo } from "../atom/User";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
export const MainBar = ({ loginMenuShow, setBoardId }) => {
  const [login, setLogin] = useRecoilState(userLogin);
  const [info, setInfo] = useRecoilState(userInfo);
  const history = useNavigate();

  const selectAll = () => {
    setBoardId("listAll");
    history("/");
  };
  const selectMy = () => {
    if (login === false) {
      window.alert("로그인을 해주세요");
    } else {
      setBoardId(info.userMbti);
      history("/");
    }
  };
  return (
    <div>
      <div className={styles.container}>
        <section>
          <button onClick={() => history("/")}>
            <div className={styles.container__logo_btn}>
              <img src={logo} alt="없음" className={styles.container__logo} />
            </div>
          </button>
        </section>
        <section>
          <ul className={styles.container__mbtiList}>
            <li>
              <button onClick={selectAll}>전체 MBTI</button>
            </li>
            <li>
              <button onClick={selectMy}>내 MBTI</button>
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
    </div>
  );
};
