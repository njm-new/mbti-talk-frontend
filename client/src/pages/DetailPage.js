import { useEffect, useState } from "react";
import { getPost } from "../api/http/Fetch";
import { useParams } from "react-router";
import { PostDetail } from "../components/PostDetail";
import { Comments } from "../components/Comments";
import styles from "../styles/DetailPage.module.css";

// <Comments postId={post.postId} />
export const DetailPage = () => {
  const { post_id } = useParams();
  const postId = post_id;
  const [post, setPost] = useState(null);

  useEffect(() => {
    const jwt = window.sessionStorage.getItem("jwt");
    getPost(jwt, postId)
      .then((data) => setPost(data.body))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        {post === null ? <></> : <PostDetail post={post} />}
        <Comments postId={postId} />
      </div>
    </div>
  );
};
