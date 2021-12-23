import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userLogin, userInfo } from "../atom/User";
import { BaseUrl } from "../ignore/Base";

export const LoginCallback = () => {
  const history = useNavigate();
  const [login, setLogin] = useRecoilState(userLogin);
  const [info, setInfo] = useRecoilState(userInfo);
  const params = new URL(window.location.href).searchParams;
  const code = params.get("code");
  const baseUrl = BaseUrl;

  useEffect(() => {
    fetch(`${baseUrl}/api/member/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        code: code,
      },
      body: JSON.stringify({
        accessToken: code,
      }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          window.sessionStorage.setItem("jwt", data.jwt);
          window.sessionStorage.setItem("userId", data.memberInfo.memberId);
          window.sessionStorage.setItem("userMbti", data.memberInfo.memberMbti);
          window.sessionStorage.setItem(
            "userNickname",
            data.memberInfo.memberNickname
          );
          //window.sessionStorage.setItem("userMbti", data.userInfo.userMbti);
          window.sessionStorage.setItem(
            "userContent",
            data.memberInfo.memberContent
          );
          setInfo({
            ...info,
            userId: data.memberInfo.memberId,
            userNickname: data.memberInfo.memberNickname,
            userMbti: data.memberInfo.memberMbti,
            userContent: data.memberInfo.memberContent,
          });
          if (data.memberInfo.memberMbti === null) {
            history("/register");
          } else {
            setLogin(true);
            history("/");
          }
        });
      } else {
        window.alert("로그인에 실패했습니다. 다시 시도해 주세요.");
        history("/");
      }
    });
  }, []);
  return (
    <div>
      <div>loding...</div>
    </div>
  );
};
