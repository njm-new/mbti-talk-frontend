import { useState } from "react";
import styles from "../styles/WritePostContents.module.css";

export const WritePage = () => {
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    window.alert(post.title + " " + post.content);
  };

  const handleChangeTitle = (e) => {
    const title = e.target.value.trim();
    setPost({ ...post, title: title });
  };

  const handleChangeContent = (e) => {
    const content = e.target.value.trim();
    setPost({ ...post, content: content });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.container__contents}>
          <input
            type="text"
            placeholder="제목을 입력해 주세요"
            value={post.title}
            onChange={handleChangeTitle}
          />
          <div div className={styles.container__contents__hr}></div>
          <textarea
            type="text"
            placeholder="내용을 입력해 주세요"
            value={post.content}
            onChange={handleChangeContent}
          />
        </div>
        <button type="submit">등록</button>
      </form>
    </div>
  );
};
