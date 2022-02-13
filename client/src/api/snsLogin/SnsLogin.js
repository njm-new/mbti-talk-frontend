import Kakao from "./KakaoLogin";

export const SnsLogin = (name, client_id, redirect_uri) => {
  // eslint-disable-next-line default-case
  switch (name) {
    case "Kakao":
      window.sessionStorage.setItem("snsType", name);
      return new Kakao(client_id, redirect_uri);
  }
};

export const getCode = () => {
  const params = new URL(window.location.href).searchParams;
  let code = params.get("code");
  return code;
};
