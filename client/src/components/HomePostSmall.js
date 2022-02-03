import styles from "../styles/HomePostSmall.module.css";
import { MbtiColor } from "./MbtiColor";
import { BiLike } from "react-icons/bi";
import { AiOutlineComment } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const HomePostSmall = ({ props }) => {
  const history = useNavigate();
  return (
    <div className={styles.container}>
      <div>
        <MbtiColor mbti={props.mbti} />
      </div>
      <div>
        <button onClick={() => history(`/detail/${props.postId}`)}>
          {props.title}
        </button>
      </div>
      <div>
        <BiLike />
        {props.likeCount}
      </div>
      <div>
        <AiOutlineComment />
        {props.commentCount}
      </div>
    </div>
  );
};
