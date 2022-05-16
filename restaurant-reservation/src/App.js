import Hero from "./Components/Hero/Hero";
import RestaurantList from "./Components/RestaurantList/RestaurantList";
import { useEffect, useState } from "react";
import Modal from "./Components/Modal/Modal";
import { GetUser } from "./Service/GetUser";
import { GetActiveUserInStore, SetActiveUserInStore } from "./Service/Storage";
import { SignOut } from "./Service/Auth.service";

import { Route } from "react-router-dom";
import RestaurantDetails from "./Components/RestaurantDetails/RestaurantDetails";
import { Switch } from "react-router-dom";
import Admin from "./Pages/Admin";
import Owner from "./Pages/Owner";
import { getReservations } from "./Service/getReservations";
import Card from "./Components/Card/Card";
import { month, weekday } from "./Constant/Constant";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modal, setModal] = useState(false);
  const [activeUser, setActiveUser] = useState("");
  const [modalComponent, SetModalComponent] = useState("");
  const [currentUserRole, setCurrentUserRole] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [reservations, setReservations] = useState([]);

  function closeModal() {
    setModal(false);
  }

  function showModal(event) {
    setModal(true);
    SetModalComponent(event.target.id);
  }

  function setDate(date) {
    console.log(date);
    setSearchDate(date);
  }

  // check if the JWT available
  let authToken = localStorage.getItem("user");

  useEffect(
    function () {
      if (authToken) {
        setIsLoggedIn(true);
        GetUser()
          .then((res) => res.json())
          .then((data) => {
            SetActiveUserInStore(JSON.stringify(data));
            setActiveUser(data.firstName);
            setCurrentUserRole(
              GetActiveUserInStore().roles[0] &&
                GetActiveUserInStore().roles[0].name
            );
            // Get All reservations
            getReservations()
              .then((res) => res.json())
              .then((data) => {
                setReservations(data);
              })
              .catch((err) => alert(err));
          });
      } else {
        setIsLoggedIn(false);
      }

      setSearchDate(() => {
        // Find Dates
        const today = new Date();
        let tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        return tomorrow.toISOString().split("T")[0];
      });
    },
    [authToken]
  );

  function logout() {
    setIsLoggedIn(false);
    setCurrentUserRole("");
    setReservations([]);
    SignOut();
  }

  return (
    <div className="App">
      <Switch>
        <Route path={"/admin"}>
          <Admin
            isLoggedIn={isLoggedIn}
            logout={logout}
            showModal={showModal}
            userName={activeUser}
            currentUserRole={currentUserRole}
          />
        </Route>
        <Route path={"/owner"}>
          <Owner
            isLoggedIn={isLoggedIn}
            logout={logout}
            showModal={showModal}
            userName={activeUser}
            currentUserRole={currentUserRole}
          />
        </Route>
        <Route path="/">
          <Hero
            isLoggedIn={isLoggedIn}
            logout={logout}
            showModal={showModal}
            userName={activeUser}
            currentUserRole={currentUserRole}
            searchDate={searchDate}
            setDate={setDate}
          />

          <main className="container">
            <Switch>
              <Route path="/restautants/:id">
                <RestaurantDetails
                  showModal={showModal}
                  isLoggedIn={isLoggedIn}
                  searchDate={searchDate}
                  reservations={reservations}
                />
              </Route>
              <Route path="/" exact>
                {reservations.length > 0 && (
                  <section className="List">
                    <header className="List--title">
                      <h4> My Reservations </h4>
                    </header>

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
                          <tr
                            className={
                              new Date() > new Date(item.reservationDate)
                                ? "text-strike"
                                : ""
                            }
                            key={item.id}
                          >
                            <td>{item.reservationNumber}</td>
                            <td> {item.restaurant.name} </td>
                            <td>{item.slot.slot}</td>
                            <td>
                              {`${
                                weekday[new Date(item.reservationDate).getDay()]
                              },
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
                <RestaurantList title="All Restaurants" />
              </Route>
            </Switch>
          </main>

          {/* Modal */}
          {modal && !isLoggedIn && (
            <Modal
              showModal={showModal}
              closeModal={closeModal}
              component={modalComponent}
            />
          )}
        </Route>
      </Switch>
    </div>
  );
};

export default App;
