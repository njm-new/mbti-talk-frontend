import styles from "../styles/MbtiSelect.module.css";

export const MbtiSelect = ({ mbti, main, sub, num, actives, mbtiSet }) => {
  const active = () => {
    if (num === "first") {
      return actives.first;
    } else if (num === "second") {
      return actives.second;
    } else if (num === "third") {
      return actives.third;
    } else {
      return actives.fourth;
    }
  };
  const act = active();
  return (
    <button onClick={() => mbtiSet(num, mbti)}>
      <div
        className={mbti === act ? styles.container__active : styles.container}
      >
        <div className={styles.container__mbti}>
          <span>{mbti}</span>
        </div>
        <div className={styles.container__content}>
          <div className={styles.container__content__main}>{main}</div>
          <div className={styles.container__content__sub}>{sub}</div>
        </div>
      </div>
    </button>
  );
};
