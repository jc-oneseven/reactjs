import { useEffect, useState } from "react";
import Header from "../Components/Header/Header";
import SubHeader from "../Components/Header/SubHeader";
import { GetRestaurants } from "../Service/GetRestaurants";

const Owner = (props) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(function () {
    GetRestaurants()
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data);
      });
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

  return (
    <div>
      <Header
        isLoggedIn={props.isLoggedIn}
        logout={props.logout}
        showModal={props.showModal}
        userName={props.userName}
        currentUserRole={props.currentUserRole}
      />
      <SubHeader
        currentUserRole={props.currentUserRole}
        title="Owners Portal"
      />
      <div className="container mt-4">
        <header className="border-bottom mb-3">
          <h4> Manage Restaurants </h4>
        </header>
        <div className="list">
          {/* Search Bar */}
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingSearch"
              placeholder="Search now"
            />
            <label htmlFor="floatingSearch">Search Restaurant</label>
          </div>

          {/* End Search Bar */}

          {restaurants &&
            restaurants.map((restaurant) => (
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                      className="img-fluid rounded-start"
                      alt={restaurant.name}
                    />
                  </div>
                  <div className="col-md-8 card-body">
                    {/* Header */}
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="card-title mb-0">{restaurant.name}</h5>
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

                        <button className="btn btn-primary ms-3">Edit</button>
                      </div>
                    </div>
                    {/* Description */}
                    <p className="card-text small">
                      This is a longer card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
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
                                {cuisine.name}{" "}
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
        </div>
      </div>
    </div>
  );
};

export default Owner;
