import styles from "../styles/Modal.module.css";

export const Modal = ({ content, checkBtn, cancelBtn }) => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div>{content.title}</div>
        <div>{content.content}</div>
        <div>
          <button onClick={cancelBtn}>취소</button>
          <button onClick={checkBtn}>확인</button>
        </div>
      </div>
    </div>
  );
};
