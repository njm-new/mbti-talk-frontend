import { useParams } from "react-router";
import { PostDetail } from "../components/PostDetail";
import { Comments } from "../components/Comments";
import styles from "../styles/DetailPage.module.css";

export const DetailPage = () => {
  const { postId } = useParams();
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <PostDetail postId={postId} />
        <Comments postId={postId} />
      </div>
    </div>
  );
};
