import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { DetailPage } from "../pages/DetailPage";
import { WritePage } from "../pages/WritePage";
import { LoginCallback } from "./LoginCallback";
import { RegisterUserPage } from "../pages/RegisterUserPage";
import { MorePostPage } from "../pages/MorePostPage";
import { MyProfile } from "../pages/MyProfile";
import { MyPost } from "../pages/MyPost";
import { MyCommentsPage } from "../pages/MyCommentsPage";
import { userLogin } from "../atom/User";
import { useRecoilState } from "recoil";

export const MbtiRoute = () => {
  const access = window.sessionStorage.getItem("jwt");
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/myprofile"
        element={access !== null ? <MyProfile /> : <Navigate to="/" />}
      />
      <Route
        path="/more"
        element={access !== null ? <MorePostPage /> : <Navigate to="/" />}
      />
      <Route
        path="/detail/:post_id"
        element={access !== null ? <DetailPage /> : <Navigate to="/" />}
      />
      <Route
        path="/write"
        element={access !== null ? <WritePage /> : <Navigate to="/" />}
      />
      <Route path="/callback" element={<LoginCallback />} />
      <Route
        path="/register"
        element={access !== null ? <RegisterUserPage /> : <Navigate to="/" />}
      />
      <Route
        path="/mypost"
        element={access !== null ? <MyPost /> : <Navigate to="/" />}
      />
      <Route
        path="/mycomment"
        element={access !== null ? <MyCommentsPage /> : <Navigate to="/" />}
      />
    </Routes>
  );
};
