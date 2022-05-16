import { useEffect, useState } from "react";
import Header from "../Components/Header/Header";
import { getReservationsByOwner } from "../Service/getReservations";
import { GetRestaurantsByOwner } from "../Service/GetRestaurants";
import { Link } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { month, weekday } from "../Constant/Constant";
import { useForm } from "react-hook-form";

const Owner = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [reservations, setReservations] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(function () {
    GetRestaurantsByOwner()
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data);
      });
    // Get All reservations
    getReservationsByOwner()
      .then((res) => res.json())
      .then((data) => {
        setReservations(data);
      })
      .catch((err) => alert(err));
  }, []);

  function handleFormSubmit(user) {
    // setUser((prevUser) => {
    //   const mergeUsers = [user, ...prevUser];
    //   return sortUsers(mergeUsers);
    // });
  }

  function sortUsers(usersList) {
    return usersList.sort((a, b) =>
      a.firstName.toUpperCase() > b.firstName.toUpperCase()
        ? 1
        : b.firstName.toUpperCase() > a.firstName.toUpperCase()
        ? -1
        : 0
    );
  }

  // Add Restaurant
  function handleChange(event) {
    const { name, value } = event.target;

    // setRegistration((prevRegister) => {
    //   return {
    //     ...prevRegister,
    //     [name]: value,
    //   };
    // });
  }
  function handleAddRestaurant(data, event) {
    event.preventDefault();
    //  signUp(registration)
    //    .then((res) => res.json())
    //    .then((data) => {
    //      setisRegistered(true);
    //      props.formSubmit(data);
    //      setRegistration({
    //        firstName: "",
    //        lastName: "",
    //        email: "",
    //        mobile: "",
    //        password: "",
    //      });
    //    })
    //    .catch((err) => alert("something went wrong"));
  }

  return (
    <div>
      <Header
        isLoggedIn={props.isLoggedIn}
        logout={props.logout}
        showModal={props.showModal}
        userName={props.userName}
        currentUserRole={props.currentUserRole}
      />

      <nav className="navbar navbar-light bg-gray">
        <div className="container">
          <span className="navbar-brand mb-0 h1"> Owners Portal </span>

          {props.currentUserRole === "Owner" && (
            <ul className="nav">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/owner"
                >
                  Restaurants
                  <span className="badge bg-info ms-1">
                    {restaurants.length}
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="owner/reservations">
                  Reservation
                  <span className="badge bg-info ms-1">
                    {reservations.length}
                  </span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>

      <div className="container mt-4">
        <Switch>
          <Route path={"/owner"} exact>
            <header className="border-bottom mb-3">
              <h4> Manage Restaurants </h4>
            </header>
            <div className="row">
              <div className="col-4 border-end p-4 pt-2 bg-gray ">
                <form
                  className="needs-validation"
                  noValidate
                  onSubmit={handleSubmit(handleAddRestaurant)}
                >
                  <h3 className="mt-3"> Add Restaurant </h3>

                  <button type="submit" className="btn btn-secondary">
                    Add
                  </button>
                </form>
              </div>
              <div className="col-8">
                {restaurants &&
                  restaurants.map((restaurant, index) => (
                    <div key={index} className="card mb-3">
                      <div className="row g-0">
                        <div className="col-md-3">
                          <img
                            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            className="img-fluid rounded-start object-fit-cover h-100"
                            alt={restaurant.name}
                          />
                        </div>
                        <div className="col-md-8 card-body">
                          {/* Header */}
                          <div className="d-flex align-items-center justify-content-between">
                            <h5 className="card-title mb-0">
                              {restaurant.name}
                            </h5>
                            <div className="d-flex align-items-center my-2">
                              <img
                                width="14px"
                                src="https://www.svgrepo.com/show/127575/location-sign.svg"
                                alt="location"
                              />
                              <small className="text-muted ms-1 me-3">
                                {restaurant.city.name}
                              </small>

                              <img
                                width="14px"
                                src="https://www.svgrepo.com/show/32285/email.svg"
                                alt="email"
                              />
                              <a
                                className="ms-1 small text-secondary text-decoration-none"
                                href={`mailto${restaurant.email}`}
                              >
                                <small>{restaurant.email}</small>
                              </a>

                              <button className="btn btn-primary ms-3">
                                Edit
                              </button>
                            </div>
                          </div>
                          {/* Description */}
                          <p className="card-text small">
                            This is a longer card with supporting text below as
                            a natural lead-in to additional content. This
                            content is a little bit longer.
                          </p>

                          {/* Additional details */}

                          <ul className="list-group mb-4 list-group-horizontal">
                            <li className="list-group-item d-flex flex-column gap-2">
                              Tables
                              <span className="badge bg-primary rounded-pill">
                                {restaurant.tables}
                              </span>
                            </li>
                            {restaurant.cuisines.length > 0 && (
                              <>
                                <li className="list-group-item">
                                  Cuisines <br></br>
                                  {restaurant.cuisines.map((cuisine) => (
                                    <span
                                      key={cuisine.id}
                                      className="me-1 badge bg-primary rounded-pill"
                                    >
                                      {cuisine.name}
                                    </span>
                                  ))}
                                </li>
                              </>
                            )}
                            <li className="list-group-item d-flex flex-column gap-2">
                              Phone
                              <span className="badge bg-primary rounded-pill">
                                {restaurant.phone}
                              </span>
                            </li>
                            <li className="list-group-item d-flex flex-column gap-2">
                              Email
                              <span className="badge bg-primary rounded-pill">
                                {restaurant.email}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}

                {restaurants.length === 0 && (
                  <div className="alert alert-info">No Restaurants found.</div>
                )}
              </div>
            </div>
          </Route>
          <Route path={"/owner/reservations"}>
            <header className="border-bottom mb-3">
              <h4> Reservations </h4>
            </header>
            {reservations.length > 0 && (
              <section className="List">
                <table className="table border">
                  <thead>
                    <tr>
                      <th> Reservation Number </th>
                      <th> Restaurant Name </th>
                      <th> Time Slot </th>
                      <th> Reservation Date </th>
                      <th> Status </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((item) => (
                      <tr key={item.id}>
                        <td>{item.reservationNumber}</td>
                        <td> {item.restaurant.name} </td>
                        <td>{item.slot.slot}</td>
                        <td>
                          {`${weekday[new Date(item.reservationDate).getDay()]},
                                ${
                                  month[
                                    new Date(item.reservationDate).getMonth()
                                  ]
                                }
                                ${new Date(item.reservationDate).getDate()}
                              `}
                        </td>
                        <td>
                          {new Date() > new Date(item.reservationDate) ? (
                            <span class="badge bg-light"> Expired </span>
                          ) : (
                            <span class="badge bg-success">
                              Upcoming Booking
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}
            {reservations.length === 0 && (
              <div className="alert alert-info"> No Reservation found. </div>
            )}
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Owner;
