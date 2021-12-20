import { SnsLogin } from "../api/snsLogin/SnsLogin";
import styles from "../styles/LoginMenu.module.css";
import { GiCancel } from "react-icons/gi";
import { clientId, redirectId } from "../ignore/KakaoInfo";
export const LoginMenu = ({ loginMenuUnShow }) => {
  const kakao = SnsLogin("Kakao", clientId, redirectId);

  return (
    <div className={styles.container}>
      <section className={styles.container__bar}>
        <span>MBTI-TALK SNS LOGIN</span>
        <button onClick={loginMenuUnShow}>
          <GiCancel size="30" color="white" />
        </button>
      </section>
      <section className={styles.container__main}>
        <kakao.Login />
      </section>
    </div>
  );
};
