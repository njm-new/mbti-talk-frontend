import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { DetailPage } from "../pages/DetailPage";
import { WritePage } from "../pages/WritePage";
import { ModifyPage } from "../pages/ModifyPage";
import { MyPage } from "../pages/MyPage";
import { ProfilePage } from "../pages/ProfilePage";
import { LoginCallback } from "./LoginCallback";
import { RegisterUserPage } from "../pages/RegisterUserPage";

export const MbtiRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/detail/:post_id" element={<DetailPage />} />
      <Route path="/write" element={<WritePage />} />
      <Route path="/modify/:post_id" element={<ModifyPage />} />
      <Route path="/myinfo" element={<MyPage />} />
      <Route path="/userinfo/:user_id" element={<ProfilePage />} />
      <Route path="/callback" element={<LoginCallback />} />
      <Route path="/register" element={<RegisterUserPage />} />
    </Routes>
  );
};
