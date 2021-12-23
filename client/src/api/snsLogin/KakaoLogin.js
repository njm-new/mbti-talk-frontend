import { RiKakaoTalkFill } from "react-icons/ri";
import styles from "../../styles/Kakao.module.css";
class Kakao {
  constructor(clientId, redirectUri) {
    this.clientId = clientId;
    this.redirectUri = redirectUri;
  }
  Login = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=code&prompt=login`;
    return (
      <div>
        <a href={kakaoAuthUrl}>
          <div className={styles.divStyles}>
            <RiKakaoTalkFill size="50" color="black" />
          </div>
        </a>
      </div>
    );
  };
}

export default Kakao;
