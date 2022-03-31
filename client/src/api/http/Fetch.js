import { BaseUrl, AwsUrl } from "../../ignore/Base";

//const awsUrl = BaseUrl;
const awsUrl = AwsUrl;

// post api
export async function getPost(postId) {
  const accessToken = window.sessionStorage.getItem("jwt");
  const res = await fetch(`${awsUrl}/posts/${postId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else if (res.status === 403) {
    window.sessionStorage.clear();
  } else if (res.status === 410) {
    await getToken(accessToken);
    return await getPost(postId);
  } else {
    console.log("error");
  }
}

export const postPost = async (post) => {
  const accessToken = window.sessionStorage.getItem("jwt");
  const res = await fetch(`${awsUrl}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      boardId: post.boardId,
      title: post.title,
      content: post.content,
      memberId: post.memberId,
    }),
  });
  if (res.status === 200) {
    console.log("postPost 성공");
    const data = await res.json();
    return data;
  } else if (res.status === 410) {
    await getToken(accessToken);
    return await postPost(post);
  } else {
    console.log("postPost 실패");
  }
};

export const patchPost = async (post, postId) => {
  const accessToken = window.sessionStorage.getItem("jwt");
  const res = await fetch(`${awsUrl}/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      boardId: post.boardId,
      title: post.title,
      content: post.content,
      memberId: post.memberId,
    }),
  });
  if (res.status === 200) {
    return res;
  } else if (res.status === 410) {
    await getToken(accessToken);
    return await patchPost(post, postId);
  } else {
    console.log("postPost 실패");
  }
};

export async function deletePost(postId) {
  const accessToken = window.sessionStorage.getItem("jwt");
  const res = await fetch(`${awsUrl}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (res.status === 200) {
    return res;
  } else if (res.status === 410) {
    await getToken(accessToken);
    return await deletePost(postId);
  } else {
    console.log("deletePost error");
  }
}

// member api
export const getMember = async (memberId) => {
  const accessToken = window.sessionStorage.getItem("jwt");
  const res = await fetch(`${awsUrl}/members/${memberId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (res.status === 200) {
    const data = res.json();
    return data;
  } else if (res.status === 401) {
    console.log("access token 인증 실패");
  } else if (res.status === 404) {
    console.log("id 없음");
  } else if (res.status === 410) {
    await getToken(accessToken);
    return await getMember(memberId);
  }
};

export const postMember = async (snsType, snsCode) => {
  const res = await fetch(`${awsUrl}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      snsType: snsType,
      snsCode: snsCode,
    }),
  });
  if (res.status === 200) {
    const data = res.json();
    return data;
  } else if (res.status === 400) {
    console.log("sns 타입 오류");
  } else if (res.status === 403) {
    console.log("카카오 인증 실패");
  } else {
    console.log("오류...");
  }
};

export const postMemberLocal = async (snsType, snsCode) => {
  const res = await fetch(`${awsUrl}/members/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      snsType: snsType,
      snsCode: snsCode,
    }),
  });
  if (res.status === 200) {
    const data = res.json();
    return data;
  } else if (res.status === 400) {
    console.log("sns 타입 오류");
  } else if (res.status === 403) {
    console.log("카카오 인증 실패");
  } else {
    console.log("오류...");
  }
};

export const patchMember = async (member) => {
  const accessToken = window.sessionStorage.getItem("jwt");
  const res = await fetch(`${awsUrl}/members/${member.memberId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      memberId: member.memberId,
      nickname: member.nickname,
      mbti: member.mbti,
      content: member.content,
    }),
  });
  if (res.status === 200) {
    return res;
  } else if (res.status === 401) {
    console.log("access token 인증 실패");
  } else if (res.status === 403) {
    console.log("요청 memberId가 다름");
  } else if (res.status === 410) {
    await getToken(accessToken);
    return await patchMember(member);
  }
};

export const nicknameCheck = async (nickname) => {
  const accessToken = window.sessionStorage.getItem("jwt");
  console.log(`${awsUrl}/members/nickname/${nickname}`);
  const res = await fetch(`${awsUrl}/members/nickname/${nickname}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (res.status === 200) {
    console.log("nicknameCheck 성공");
    return res;
  } else if (res.status === 401) {
    console.log("access token 인증 실패");
  } else if (res.status === 403) {
    console.log("요청 memberId가 다름");
  } else if (res.status === 409) {
    console.log("닉네임이 중복되었습니다.");
  } else if (res.status === 410) {
    await getToken(accessToken);
    return await nicknameCheck(nickname);
  }
};

// access token api

export const getToken = async (accessToken) => {
  const memberId = window.sessionStorage.getItem("userId");
  const res = await fetch(`${awsUrl}/members/${memberId}/access-token`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (res.status === 200) {
    const data = res.json();
    data.then((data) => {
      window.sessionStorage.setItem("jwt", data.body.accessToken);
    });
  } else if (res.status === 401) {
    console.log("access token 인증 실패");
  } else if (res.status === 403) {
    console.log("요청 memberId가 다름");
  } else {
    console.log("오류...");
  }
};

// board api

export const getAllHotBoard = async (num) => {
  const accessToken = window.sessionStorage.getItem("jwt");
  const res = await fetch(`${awsUrl}/boards/hot?pageNum=${num}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 200) {
    const data = res.json();
    return data;
  } else if (res.status === 410) {
    await getToken(accessToken);
    return await getAllHotBoard(num);
  } else {
    console.log("getAllHotBoard 실패");
  }
};

export const getMbtiHotBoard = async (num, boardId) => {
  const accessToken = window.sessionStorage.getItem("jwt");
  const res = await fetch(`${awsUrl}/boards/${boardId}/hot?pageNum=${num}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 200) {
    const data = res.json();
    return data;
  } else if (res.status === 410) {
    await getToken(accessToken);
    return await getMbtiHotBoard(num, boardId);
  } else {
    console.log("getAllHotBoard 실패");
  }
};

export const getAllBoard = async (num) => {
  const accessToken = window.sessionStorage.getItem("jwt");
  const res = await fetch(`${awsUrl}/boards?pageNum=${num}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 200) {
    const data = res.json();
    return data;
  } else if (res.status === 410) {
    await getToken(accessToken);
    return await getAllBoard(num);
  } else {
    console.log("getAllHotBoard 실패");
  }
};

export const getMbtiBoard = async (num, boardId) => {
  const accessToken = window.sessionStorage.getItem("jwt");
  const res = await fetch(`${awsUrl}/boards/${boardId}?pageNum=${num}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 200) {
    const data = res.json();
    return data;
  } else if (res.status === 410) {
    await getToken(accessToken);
    return await getMbtiBoard(num, boardId);
  } else {
    console.log("getMbtiBoard 실패");
  }
};

export const getMyPosts = async (num) => {
  const accessToken = window.sessionStorage.getItem("jwt");
  const res = await fetch(`${awsUrl}/boards/myPosts/?pageNum=${num}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (res.status === 200) {
    const data = res.json();
    return data;
  } else if (res.status === 410) {
    await getToken(accessToken);
    return await getMyPosts(num);
  } else {
    console.log("getMyPosts 실패");
  }
};

export const getMyComments = async () => {
  const accessToken = window.sessionStorage.getItem("jwt");
  const res = await fetch(`${awsUrl}/boards/myComment`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (res.status === 200) {
    const data = res.json();
    return data;
  } else if (res.status === 410) {
    await getToken(accessToken);
    return await getMyComments();
  } else {
    console.log("getMyComments 실패");
  }
};

export const getGuestBoard = async (num) => {
  const res = await fetch(`${awsUrl}/boards/guest?pageNum=${num}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.status === 200) {
    const data = res.json();
    return data;
  } else {
    console.log("getMyComments 실패");
  }
};

// comment api

export const getComments = async (postId) => {
  const accessToken = window.sessionStorage.getItem("jwt");
  const res = await fetch(`${awsUrl}/posts/${postId}/comments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (res.status === 200) {
    const data = res.json();
    return data;
  } else if (res.status === 410) {
    await getToken(accessToken);
    return await getComments(postId);
  } else {
    console.log("getComments 실패");
  }
};

export const postComments = async (postId, comment) => {
  const accessToken = window.sessionStorage.getItem("jwt");
  const res = await fetch(`${awsUrl}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      postId: comment.postId,
      memberId: comment.memberId,
      content: comment.content,
    }),
  });
  if (res.status === 200) {
    console.log("postComments 성공");
    return res;
  } else if (res.status === 410) {
    await getToken(accessToken);
    return await postComments(postId, comment);
  } else {
    console.log("getComments 실패");
  }
};

export const patchComments = async (postId, commentId, content) => {
  const accessToken = window.sessionStorage.getItem("jwt");
  const res = await fetch(`${awsUrl}/posts/${postId}/comments/${commentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      content: content,
    }),
  });
  if (res.status === 200) {
    console.log("patchComments 성공");
    return res;
  } else if (res.status === 410) {
    await getToken(accessToken);
    return await patchComments(postId, commentId, content);
  } else {
    console.log("patchComments 실패");
  }
};

export const deleteComments = async (postId, comment_id) => {
  const accessToken = window.sessionStorage.getItem("jwt");
  const res = await fetch(`${awsUrl}/posts/${postId}/comments/${comment_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (res.status === 200) {
    console.log("deleteComments 성공");
    return res;
  } else if (res.status === 410) {
    await getToken(accessToken);
    return await deleteComments(postId, comment_id);
  } else {
    console.log("getComments 실패");
  }
};

// like api

export const postLike = async (postId) => {
  const accessToken = window.sessionStorage.getItem("jwt");
  const res = await fetch(`${awsUrl}/posts/${postId}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (res.status === 200) {
    console.log("postLike 성공");
    return res;
  } else if (res.status === 410) {
    await getToken(accessToken);
    return await postLike(postId);
  } else {
    console.log("postLike 실패");
  }
};

export const deleteLike = async (postId) => {
  const accessToken = window.sessionStorage.getItem("jwt");
  const res = await fetch(`${awsUrl}/posts/${postId}/like`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (res.status === 200) {
    console.log("deleteLike 성공");
    return res;
  } else if (res.status === 410) {
    await getToken(accessToken);
    return await deleteLike(postId);
  } else {
    console.log("deleteLike 실패");
  }
};
// picture api
export const getPicture = async (postId) => {
  const accessToken = window.sessionStorage.getItem("jwt");
  const res = await fetch(`${awsUrl}/posts/${postId}/images`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (res.status === 200) {
    console.log("getpicture 성공");
    const data = res.json();
    return data;
  } else if (res.status === 410) {
    await getToken(accessToken);
    return await getPicture(postId);
  } else {
    console.log("getPicture 실패");
  }
};

export const postPicture = async (formData, postId) => {
  const accessToken = window.sessionStorage.getItem("jwt");
  const res = await fetch(`${awsUrl}/posts/${postId}/images`, {
    method: "POST",
    headers: {
      //"Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });
  if (res.status === 200) {
    console.log("postpicture 성공");
    return res;
  } else if (res.status === 410) {
    await getToken(accessToken);
    return await postPicture(formData, postId);
  } else {
    console.log("postPicture 실패");
  }
};

export const deletePicture = async (pictureName, postId) => {
  const accessToken = window.sessionStorage.getItem("jwt");
  const res = await fetch(`${awsUrl}/posts/${postId}/images/${pictureName}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      pictureName: pictureName,
    }),
  });
  if (res.status === 200) {
    console.log("postpicture 성공");
    return res;
  } else if (res.status === 410) {
    await getToken(accessToken);
    return await deletePicture(pictureName, postId);
  } else {
    console.log("postPicture 실패");
  }
};
