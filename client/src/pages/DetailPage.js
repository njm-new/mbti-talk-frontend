import { useParams } from "react-router";
export const DetailPage = () => {
  const { post_id } = useParams();
  return <div>Detail {post_id}</div>;
};
