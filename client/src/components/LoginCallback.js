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
    console.log("fetch");
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
          window.sessionStorage.setItem("userId", data.userInfo.userId);
          window.sessionStorage.setItem("userMbti", data.userInfo.userMbti);
          window.sessionStorage.setItem(
            "userNickname",
            data.userInfo.userNickname
          );
          //window.sessionStorage.setItem("userMbti", data.userInfo.userMbti);
          window.sessionStorage.setItem(
            "userContent",
            data.userInfo.userContent
          );
          setLogin(true);

          setInfo({
            ...info,
            userId: data.userInfo.userId,
            userNickname: data.userInfo.userNickname,
            userMbti: data.userInfo.userMbti,
            userContent: data.userInfo.userContent,
          });
          history("/");
        });
      } else if (res.status === 401) {
        history("/MakeInfo", { accessCode: code });
      } else {
        console.log("인증에 실패했습니다.");
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
