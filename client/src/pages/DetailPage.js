import { useParams } from "react-router";
import { PostDetail } from "../components/PostDetail";
import { Comments } from "../components/Comments";

export const DetailPage = () => {
  const { postId } = useParams();
  return (
    <div>
      <PostDetail postId={postId} />
      <Comments postId={postId} />
    </div>
  );
};
