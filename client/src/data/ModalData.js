export const RegisterModalData = (mbti) => {
  const title = "MBTI 선택";
  const content = `${mbti} 를 선택하시겠습니까?`;

  return {
    title,
    content,
  };
};

export const PostCancelData = {
  title: "게시글 삭제",
  content: "해당 게시글을 삭제하시겠습니까?",
};

export const PostModifyData = {
  title: "게시글 수정",
  content: "해당 게시글을 수정하시겠습니까?",
};

export const PostInsertData = {
  title: "댓글 등록",
  content: "해당 댓글을 등록하시겠습니까?",
};

export const CommentCancelData = {
  title: "댓글 삭제",
  content: "해당 댓글을 삭제하시겠습니까?",
};

export const CommentModifyData = {
  title: "댓글 수정",
  content: "해당 댓글을 수정하시겠습니까?",
};

export const CommentInsertData = {
  title: "댓글 등록",
  content: "해당 댓글을 등록하시겠습니까?",
};
