import { Link } from "react-router-dom";

const SubHeader = (props) => {
  return (
    <nav className="navbar navbar-light bg-gray">
      <div className="container">
        <span className="navbar-brand mb-0 h1"> {props.title} </span>

        {props.currentUserRole === "Owner" && (
          <ul className="nav">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/restaurants"
              >
                Restaurants
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reservations">
                Reservation
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default SubHeader;
