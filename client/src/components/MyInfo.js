import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/MyInfo.module.css";
import { useRecoilState } from "recoil";
import { userLogin, userInfo } from "../atom/User";
import { MbtiColor } from "../components/MbtiColor";
import { OutSideOff } from "../util/OuteSideOff";

export const MyInfo = () => {
  const [login, setLogin] = useRecoilState(userLogin);
  const [info, setInfo] = useRecoilState(userInfo);
  const [moreInfo, setMoreInfo] = useState(false);
  const history = useNavigate();
  const logOut = () => {
    sessionStorage.clear();
    setLogin(false);
    setInfo({
      ...info,
      userId: "",
      userNickname: "",
      userMbti: "",
      userContent: "",
    });
    history("/");
  };

  const ref = useRef(null);
  const btnRef = useRef(null);
  /*
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (event) => {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      !btnRef.current.contains(event.target)
    ) {
      setMoreInfo(false);
    }
  };
*/
  OutSideOff(ref, btnRef, setMoreInfo);

  const showInfo = () => {
    if (moreInfo === false) {
      setMoreInfo(true);
    } else {
      setMoreInfo(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.container__posision}>
          <button
            className={styles.container__btn}
            onClick={showInfo}
            ref={btnRef}
          >
            <MbtiColor mbti={info.userMbti} />
          </button>
          {moreInfo === false ? (
            <></>
          ) : (
            <div className={styles.container__moreInfo} ref={ref}>
              <ul>
                <li>
                  <button
                    onClick={() => {
                      history("/myprofile");
                      setMoreInfo(false);
                    }}
                  >
                    내 정보
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      history("/mypost");
                      setMoreInfo(false);
                    }}
                  >
                    내가 쓴 글
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      history("/mycomment");
                      setMoreInfo(false);
                    }}
                  >
                    내가 쓴 댓글
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      window.sessionStorage.clear();
                      window.location.reload();
                    }}
                  >
                    로그아웃
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
