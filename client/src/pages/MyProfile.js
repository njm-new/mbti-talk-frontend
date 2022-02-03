import styles from "../styles/MyProfile.module.css";
import { userInfo } from "../atom/User";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

export const MyProfile = () => {
  const [user, setUser] = useRecoilState(userInfo);
  const [info, setInfo] = useState(user);
  const [btn, setBtn] = useState(false);
  const history = useNavigate();
  const regS = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gim;
  const regN = /[0-9 ]/gim;

  useEffect(() => {
    setInfo(user);
  }, [user]);

  useEffect(() => {
    if (
      info.userMbti !== user.userMbti ||
      info.userNickname !== user.userNickname ||
      info.userContent !== user.userContent
    ) {
      setBtn(true);
    } else {
      setBtn(false);
    }
  }, [info]);

  const handleChangeNickname = (e) => {
    const nickname = e.target.value.trim();
    if (nickname.indexOf(" ") !== -1) {
      window.alert("띄어쓰기를 입력할 수 없습니다.");
      const newNick = nickname.replace(" ", "");
      setInfo({ ...info, userNickname: newNick });
    } else if (nickname.length > 10) {
      window.alert("10글자 이내로 입력해 주세요.");
      const newNick = nickname.slice(0, 10);
      setInfo({ ...info, userNickname: newNick });
    } else if (regS.test(nickname)) {
      window.alert("특수문자를 입력할 수 없습니다.");
      const newNick = nickname.replace(regS, "");
      setInfo({ ...info, userNickname: newNick });
    } else if (regN.test(nickname)) {
      window.alert("숫자를 입력할 수 없습니다.");
      const newNick = nickname.replace(regN, "");
      setInfo({ ...info, userNickname: newNick });
    } else {
      setInfo({ ...info, userNickname: nickname });
    }
  };

  const handleChangeContent = (e) => {
    const content = e.target.value.trim();
    const newContent = content.slice(0, 15);
    setInfo({ ...info, userContent: newContent });
  };
  return (
    <div className={styles.mainBackground}>
      <div className={styles.container}>
        <div className={styles.container__top}>
          <div>
            <div>
              <CgProfile />
            </div>
            <div className={styles.container__top__title}>내 프로필</div>
          </div>
          <div>
            <button
              className={
                btn === false
                  ? styles.container__top__btn
                  : styles.container__top__btn__on
              }
            >
              수정
            </button>
          </div>
        </div>
        <div className={styles.container__bottom}>
          <div className={styles.container__bottom__content}>
            <div>MBTI</div>
            <div>:</div>
            <input
              value={info.userMbti}
              spellCheck="false"
              onClick={() => history("/register")}
            ></input>
          </div>
          <div className={styles.container__bottom__content}>
            <div>닉네임</div>
            <div>:</div>
            <input
              value={info.userNickname}
              onChange={handleChangeNickname}
              spellCheck="false"
            ></input>
          </div>
          <div className={styles.container__bottom__content}>
            <div>소개글</div>
            <div>:</div>
            <input
              value={info.userContent}
              onChange={handleChangeContent}
              spellCheck="false"
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};
