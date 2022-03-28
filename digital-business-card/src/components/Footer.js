import iconInstagram from "../images/icon-instagram.svg";
import iconGithub from "../images/icon-github.svg";

const Footer = () => {
  return (
    <footer className="social-links">
      <a href="https://github.com/jc-oneseven">
        <img src={iconGithub} alt="My Github Account" />
      </a>
      <a href="https://www.instagram.com/jehchaudhari/">
        <img src={iconInstagram} alt="My Instagram Account" />
      </a>
    </footer>
  );
};

export default Footer;
