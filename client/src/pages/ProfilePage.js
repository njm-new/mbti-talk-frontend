import { useParams } from "react-router";
export const ProfilePage = () => {
  const { user_id } = useParams();
  return <div>Profile {user_id}</div>;
};
