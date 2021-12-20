import { RiKakaoTalkFill } from "react-icons/ri";
import styles from "../../styles/Kakao.module.css";
class Kakao {
  constructor(client_id, redirect_uri) {
    this.client_id = client_id;
    this.redirect_uri = redirect_uri;
  }
  Login = () => {
    const kauthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&response_type=code&prompt=login`;
    return (
      <div>
        <a href={kauthUrl}>
          <div className={styles.divStyles}>
            <RiKakaoTalkFill size="50" color="black" />
          </div>
        </a>
      </div>
    );
  };
}

export default Kakao;
