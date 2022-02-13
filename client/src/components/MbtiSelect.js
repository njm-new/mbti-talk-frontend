import styles from "../styles/MbtiSelect.module.css";

export const MbtiSelect = ({ item, actives, mbtiSet }) => {
  const active = () => {
    if (item.num === "first") {
      return actives.first;
    } else if (item.num === "second") {
      return actives.second;
    } else if (item.num === "third") {
      return actives.third;
    } else {
      return actives.fourth;
    }
  };
  const act = active();
  return (
    <button onClick={() => mbtiSet(item.num, item.mbti)}>
      <div
        className={
          item.mbti === act ? styles.container__active : styles.container
        }
      >
        <div className={styles.container__mbti}>{item.mbti}</div>
        <div className={styles.container__hr}></div>
        <div className={styles.container__content}>
          <div className={styles.container__content__main}>{item.main}</div>
          <div className={styles.container__content__sub}>{item.sub}</div>
        </div>
      </div>
    </button>
  );
};
