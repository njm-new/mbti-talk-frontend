import { atom } from "recoil";

export const userLogin = atom({
  key: "login",
  default: false,
});

export const userInfo = atom({
  key: "info",
  default: {
    userId: "",
    userNickname: "",
    userMbti: "",
    userContent: "",
  },
});
