import styles from "../styles/MbtiColor.module.css";

export const MbtiColor = ({ mbti }) => {
  return (
    <div>
      <span className={mbti[0] === "E" ? styles.E : styles.I}>{mbti[0]}</span>
      <span className={mbti[1] === "S" ? styles.S : styles.N}>{mbti[1]}</span>
      <span className={mbti[2] === "T" ? styles.T : styles.F}>{mbti[2]}</span>
      <span className={mbti[3] === "J" ? styles.J : styles.P}>{mbti[3]}</span>
    </div>
  );
};
