import styles from "../styles/WritePost.module.css";
import { WritePostContents } from "./WritePostContents";

export const WritePost = ({ setWrite }) => {
  return (
    <div className={styles.container}>
      <WritePostContents setWrite={setWrite} />
    </div>
  );
};
