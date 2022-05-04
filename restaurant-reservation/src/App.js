import Hero from "./Components/Hero/Hero";
import Footer from "./Components/Footer/Footer";
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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modal, setModal] = useState(false);
  const [activeUser, setActiveUser] = useState("");
  const [modalComponent, SetModalComponent] = useState("");

  const [currentUserRole, setCurrentUserRole] = useState("");

  function closeModal() {
    setModal(false);
  }

  function showModal(event) {
    setModal(true);
    SetModalComponent(event.target.id);
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
            setCurrentUserRole(GetActiveUserInStore().roles[0].name);
          });
      } else {
        setIsLoggedIn(false);
      }
    },
    [authToken]
  );

  function logout() {
    setIsLoggedIn(false);
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
        <Route path="/">
          <Hero
            isLoggedIn={isLoggedIn}
            logout={logout}
            showModal={showModal}
            userName={activeUser}
            currentUserRole={currentUserRole}
          />

          <main className="container">
            <Route path="/" exact>
              <RestaurantList title="All Restaurants" />
            </Route>
            <Route path="/restautants/:id">
              <RestaurantDetails />
            </Route>
          </main>
          <Footer />

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
