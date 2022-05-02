import { GetUser } from "../../Service/GetUser";

const Header = (props) => {
  return (
    <header className="Header py-3 bg-primary">
      <div className="container d-flex">
        <span className="Header--logo me-auto">
          <span> Restaurant </span>
          <span> Reservation </span>
        </span>
        {props.isLoggedIn ? (
          <div className="d-flex align-items-center text-white">
            <h6 className="me-2 mb-0 "> Welecome [username], </h6>
            <button
              className="btn btn-primary p-0 text-secondary"
              onClick={props.logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <button className="btn btn-outline-secondary me-2">Register</button>
            <button className="btn btn-secondary" onClick={props.showModal}>
              Login
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
