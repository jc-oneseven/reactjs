import profilePicture from "../images/profile-picture.jpg";
import iconMail from "../images/Mail.svg";
import iconLinkedin from "../images/linkedin.svg";

// CSS
import "./Info.css";

const Info = () => {
  return (
    <header className="info">
      <img
        className="info--picture"
        src={profilePicture}
        alt="Jagdish Chaudhari"
      />
      <h3 className="info--name"> Jagdish Chaudhari </h3>
      <h4 className="info--post"> Frontend Developer </h4>

      <div className="info--ctas">
        <button className="info--btn">
          <img className="info--btn-icon" src={iconMail} alt="Icon Mail" />
          Email
        </button>
        <button className="info--btn info--btn__linkedIn">
          <img
            className="info--btn-icon"
            src={iconLinkedin}
            alt="Icon LinkedIn"
          />
          LinkedIn
        </button>
      </div>
    </header>
  );
};

export default Info;
