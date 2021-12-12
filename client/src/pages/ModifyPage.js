import { useParams } from "react-router";
export const ModifyPage = () => {
  const { post_id } = useParams();
  return <div>Modify {post_id}</div>;
};
