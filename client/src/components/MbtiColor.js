import styles from "../styles/MbtiColor.module.css";

export const MbtiColor = ({ mbti }) => {
  return (
    <div>
      {mbti === "ENFJ" ? (
        <span className={styles.ENFJ}>{mbti}</span>
      ) : mbti === "INFJ" ? (
        <span className={styles.INFJ}>{mbti}</span>
      ) : mbti === "INTJ" ? (
        <span className={styles.INTJ}>{mbti}</span>
      ) : mbti === "ENTJ" ? (
        <span className={styles.ENTJ}>{mbti}</span>
      ) : mbti === "ENFP" ? (
        <span className={styles.ENFP}>{mbti}</span>
      ) : mbti === "INFP" ? (
        <span className={styles.INFP}>{mbti}</span>
      ) : mbti === "INTP" ? (
        <span className={styles.INTP}>{mbti}</span>
      ) : mbti === "ENTP" ? (
        <span className={styles.ENTP}>{mbti}</span>
      ) : mbti === "ESFP" ? (
        <span className={styles.ESFP}>{mbti}</span>
      ) : mbti === "ISFP" ? (
        <span className={styles.ISFP}>{mbti}</span>
      ) : mbti === "ISTP" ? (
        <span className={styles.ISTP}>{mbti}</span>
      ) : mbti === "ESTP" ? (
        <span className={styles.ESTP}>{mbti}</span>
      ) : mbti === "ESFJ" ? (
        <span className={styles.ESFJ}>{mbti}</span>
      ) : mbti === "ISFJ" ? (
        <span className={styles.ISFJ}>{mbti}</span>
      ) : mbti === "ISTJ" ? (
        <span className={styles.ISTJ}>{mbti}</span>
      ) : (
        <span className={styles.ESTJ}>{mbti}</span>
      )}
    </div>
  );
};
