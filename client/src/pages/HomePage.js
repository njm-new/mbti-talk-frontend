import { useState } from "react";
import { postInfo } from "../data/testPosts";
import styles from "../styles/HomePage.module.css";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../atom/User";
import { useRecoilState } from "recoil";
import { FaCrown } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { HomePostSmall } from "../components/HomePostSmall";
import { BsSearch } from "react-icons/bs";

export const HomePage = () => {
  const posts = postInfo;
  const history = useNavigate();
  const [boardId, setBoardId] = useState("listAll");

  return (
    <div className={styles.mainBackground}>
      <div className={styles.main}>
        <section className={styles.newContainer}>
          <div className={styles.newContainer__mainTitle}>
            <div>ENFP 게시판</div>
            <div className={styles.container__topDiv__sub}>
              <div className={styles.container__topDiv__sub__inputDiv}>
                <input
                  className={styles.container__topDiv__sub__input}
                  placeholder="관심있는 내용을 검색해 주세요."
                />
                <div className={styles.container__topDiv__sub__inputIcon}>
                  <BsSearch />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.newContainer__hot}>
            <div className={styles.newContainer__hot__top}>
              <div className={styles.newContainer__hot__top__title}>
                <FaCrown />
                <div>베스트 게시글</div>
              </div>
              <div>
                <button
                  onClick={() =>
                    history("/more", {
                      state: { boardId: boardId, sub: "hot" },
                    })
                  }
                >
                  더보기
                </button>
              </div>
            </div>
            {posts
              .find((el) => el.pageNum === 1)
              .posts.map((item, id) => (
                <HomePostSmall props={item} key={id} />
              ))}
          </div>
          <div className={styles.newContainer__all}>
            <div className={styles.newContainer__all__top}>
              <div className={styles.newContainer__all__top__title}>
                <FaListUl />
                <div>전체 게시글</div>
              </div>
              <div>
                <button
                  onClick={() =>
                    history("/more", {
                      state: { boardId: boardId, sub: "all" },
                    })
                  }
                >
                  더보기
                </button>
              </div>
            </div>
            {posts
              .find((el) => el.pageNum === 2)
              .posts.map((item, id) => (
                <HomePostSmall props={item} key={id} />
              ))}
          </div>
        </section>
        <section className={styles.newContainer}>
          <div className={styles.newContainer__mainTitle}>
            <div>전체 게시판</div>
            <div className={styles.container__topDiv__sub}>
              <div className={styles.container__topDiv__sub__inputDiv}>
                <input
                  className={styles.container__topDiv__sub__input}
                  placeholder="관심있는 내용을 검색해 주세요."
                />
                <div className={styles.container__topDiv__sub__inputIcon}>
                  <BsSearch />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.newContainer__hot}>
            <div className={styles.newContainer__hot__top}>
              <div className={styles.newContainer__hot__top__title}>
                <FaCrown />
                <div>베스트 게시글</div>
              </div>
              <div>
                <button
                  onClick={() =>
                    history("/more", {
                      state: { boardId: boardId, sub: "hot" },
                    })
                  }
                >
                  더보기
                </button>
              </div>
            </div>
            {posts
              .find((el) => el.pageNum === 1)
              .posts.map((item, id) => (
                <HomePostSmall props={item} key={id} />
              ))}
          </div>
          <div className={styles.newContainer__all}>
            <div className={styles.newContainer__all__top}>
              <div className={styles.newContainer__all__top__title}>
                <FaListUl />
                <div>전체 게시글</div>
              </div>
              <div>
                <button
                  onClick={() =>
                    history("/more", {
                      state: { boardId: boardId, sub: "all" },
                    })
                  }
                >
                  더보기
                </button>
              </div>
            </div>
            {posts
              .find((el) => el.pageNum === 2)
              .posts.map((item, id) => (
                <HomePostSmall props={item} key={id} />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};
