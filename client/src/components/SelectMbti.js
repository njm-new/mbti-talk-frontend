import { userLogin, userInfo } from "../atom/User";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import styles from "../styles/selectMbti.module.css";

export const SelectMbti = () => {
  const [login, setLogin] = useRecoilState(userLogin);
  const [info, setInfo] = useRecoilState(userInfo);
  const history = useNavigate();
  const selectAll = () => {
    history("/", { board: "전체" });
  };
  const selectMy = () => {
    if (login === false) {
      window.alert("로그인을 해주세요");
    } else {
      history("/", { board: info.userMbti });
    }
  };
  return (
    <div className={styles.container}>
      <ul>
        <li>
          <button onClick={selectAll}>홈</button>
        </li>
      </ul>
    </div>
  );
};
