import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { DetailPage } from "../pages/DetailPage";
import { WritePage } from "../pages/WritePage";
import { ModifyPage } from "../pages/ModifyPage";
import { ProfilePage } from "../pages/ProfilePage";
import { LoginCallback } from "./LoginCallback";
import { RegisterUserPage } from "../pages/RegisterUserPage";
import { MorePostPage } from "../pages/MorePostPage";
import { MyProfile } from "../pages/MyProfile";
import { MyPost } from "../pages/MyPost";
import { MyCommentsPage } from "../pages/MyCommentsPage";

export const MbtiRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/myprofile" element={<MyProfile />} />
      <Route path="/more" element={<MorePostPage />} />
      <Route path="/detail/:postId" element={<DetailPage />} />
      <Route path="/write" element={<WritePage />} />
      <Route path="/modify/:post_id" element={<ModifyPage />} />
      <Route path="/userinfo/:user_id" element={<ProfilePage />} />
      <Route path="/callback" element={<LoginCallback />} />
      <Route path="/register" element={<RegisterUserPage />} />
      <Route path="/mypost" element={<MyPost />} />
      <Route path="/mycomment" element={<MyCommentsPage />} />
    </Routes>
  );
};
