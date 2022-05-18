import { useEffect, useState } from "react";
import Header from "../Components/Header/Header";

import { Link } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import ManageRestaurant from "../Components/Owner/ManageRestaurant";
import ManageReservation from "../Components/Owner/ManageReservation";
import { GetRestaurantsByOwner } from "../Service/GetRestaurants";
import { getReservationsByOwner } from "../Service/getReservations";
import { CreateRestaurant } from "../Service/CreateRestaurant";
import { EditRestaurant } from "../Service/EditRestaurant";

const Owner = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [isNewRestaurant, setIsNewRestaurant] = useState(false);

  useEffect(
    function () {
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
    },
    [isNewRestaurant]
  );

  function handleAddRestaurantForm(newRestaurant) {
    CreateRestaurant(newRestaurant)
      .then((res) => res.json())
      .then(() => {
        setIsNewRestaurant(true);
      })
      .finally(setIsNewRestaurant(false));
  }

  function handleEditRestaurantForm(updatedRestaurant) {
    const id = updatedRestaurant.id;

    delete updatedRestaurant.id;
    delete updatedRestaurant.user;
    delete updatedRestaurant.seatings;

    // const modifyRes = delete updatedRestaurant.cuisines.name;

    console.log(updatedRestaurant);
    // EditRestaurant(id, updatedRestaurant)
    //   .then((res) => res.json())
    //   .then(() => {
    //     setIsNewRestaurant(true);
    //   })
    //   .finally(setIsNewRestaurant(false));
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
            <ManageRestaurant
              restaurants={restaurants}
              handleAddRestaurantForm={handleAddRestaurantForm}
              handleEditRestaurantForm={handleEditRestaurantForm}
            />
          </Route>
          <Route path={"/owner/reservations"}>
            <ManageReservation reservations={reservations} />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Owner;
