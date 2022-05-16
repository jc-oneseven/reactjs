import { Link } from "react-router-dom";

const Header = (props) => {
  let settingButton;
  if (props.currentUserRole === "Admin") {
    settingButton = (
      <Link to={"/admin"} className="btn btn-gray me-3">
        Admin Settings
      </Link>
    );
  } else if (props.currentUserRole === "Owner") {
    settingButton = (
      <Link to={"/owner"} className="btn btn-gray me-3">
        Owner Settings
      </Link>
    );
  }

  return (
    <header className="Header py-3 bg-primary">
      <div className="container d-flex">
        <Link to={"/"} className="Header--logo me-auto">
          <span> Restaurant </span>
          <span> Reservation </span>
        </Link>
        {props.isLoggedIn ? (
          <div className="d-flex align-items-center text-white">
            {settingButton}

            <h6 className="me-2 mb-0 "> Welecome {props.userName}, </h6>
            <Link
              className="btn btn-primary p-0 text-secondary"
              onClick={props.logout}
              to="/"
            >
              Logout
            </Link>
          </div>
        ) : (
          <>
            <button
              id="register"
              className="btn btn-outline-secondary me-2"
              onClick={props.showModal}
            >
              Register
            </button>
            <button
              id="login"
              className="btn btn-secondary"
              onClick={props.showModal}
            >
              Login
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
