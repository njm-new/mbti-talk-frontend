import styles from "../styles/MainBar.module.css";
import mbtiIconSrc from "../icon/mbti_icon.png";
export const MainBar = () => {
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
          <button className={styles.container__loginBtn}>로그인</button>
        </section>
      </div>
      <hr />
    </div>
  );
};
