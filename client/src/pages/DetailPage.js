import { useEffect, useState } from "react";
import { getPost } from "../api/http/Fetch";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { PostDetail } from "../components/PostDetail";
import { Comments } from "../components/Comments";
import styles from "../styles/DetailPage.module.css";

// <Comments postId={post.postId} />
export const DetailPage = () => {
  const history = useNavigate();
  const { post_id } = useParams();
  const postId = post_id;
  const [post, setPost] = useState(null);

  useEffect(() => {
    detailPageGetPost();
  }, []);
  const detailPageGetPost = () => {
    getPost(postId)
      .then((data) => setPost(data.body))
      .catch((err) => console.log(err));
  };
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        {post === null ? (
          <></>
        ) : (
          <PostDetail post={post} detailPageGetPost={detailPageGetPost} />
        )}
        <Comments postId={postId} />
      </div>
    </div>
  );
};
