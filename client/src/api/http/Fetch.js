import { BaseUrl } from "../../ignore/Base";

const baseUrl = BaseUrl;
// post api
export async function getPost(postId) {
  const res = await fetch(`${baseUrl}/api/posts/${postId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: window.sessionStorage.getItem("jwt"),
    },
  });
  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else if (res.status === 403) {
    window.sessionStorage.clear();
  } else {
    console.log("error");
  }
}
// member api
export async function getMember(memberId) {
  const res = await fetch(`${baseUrl}/api/member/info/${memberId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: window.sessionStorage.getItem("jwt"),
    },
  });
  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else if (res.status === 403) {
    window.sessionStorage.clear();
  } else {
    console.log("error");
  }
}
