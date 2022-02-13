import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userLogin, userInfo } from "../atom/User";
import { postMember } from "../api/http/Fetch";
import styles from "../styles/LoginCallback.module.css";

export const LoginCallback = () => {
  const history = useNavigate();
  const [login, setLogin] = useRecoilState(userLogin);
  const [info, setInfo] = useRecoilState(userInfo);
  const params = new URL(window.location.href).searchParams;
  const snsCode = params.get("code");
  const snsType = window.sessionStorage.getItem("snsType");

  useEffect(() => {
    const login = postMember(snsType, snsCode);
    login
      .then((data) => {
        window.sessionStorage.setItem("jwt", data.body.accessToken);
        window.sessionStorage.setItem("userId", data.body.member.memberId);
        window.sessionStorage.setItem("userMbti", data.body.member.mbti);
        window.sessionStorage.setItem(
          "userNickname",
          data.body.member.nickname
        );
        window.sessionStorage.setItem("userContent", data.body.member.content);
        setInfo({
          ...info,
          userId: data.body.member.memberId,
          userNickname: data.body.member.nickname,
          userMbti: data.body.member.mbti,
          userContent: data.body.member.content,
        });
        if (data.body.member.mbti === null) {
          history("/register");
        } else {
          setLogin(true);
          history("/");
        }
      })
      .catch((err) => {
        window.alert("로그인 실패");
      });
  }, []);
  return (
    <div className={styles.background}>
      <div className={styles.container}>loding...</div>
    </div>
  );
};
