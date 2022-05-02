import Hero from "./Components/Hero/Hero";
import Footer from "./Components/Footer/Footer";
import RestaurantList from "./Components/RestaurantList/RestaurantList";
import { useEffect, useState } from "react";
import Modal from "./Components/Modal/Modal";
import { GetUser } from "./Service/GetUser";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [modal, setModal] = useState(false);

  // Show and Hide Modal
  function toggleModal(toggle) {
    setModal(toggle);
  }

  // check is the JWT available
  let authToken = localStorage.getItem("user");

  useEffect(
    function () {
      if (authToken) {
        setIsLoggedIn(true);
        GetUser().then((res) => console.log(res));
      } else {
        setIsLoggedIn(false);
      }
    },
    [authToken]
  );

  function logout() {
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  }

  return (
    <div className="App">
      <Hero
        isLoggedIn={isLoggedIn}
        logout={logout}
        showModal={toggleModal.bind(this, true)}
      />
      <main className="container">
        <RestaurantList title="Most Popular Restaurant" />
      </main>
      <Footer />

      {/* Modal */}
      {modal && !isLoggedIn && (
        <Modal
          showModal={toggleModal.bind(this, true)}
          closeModal={toggleModal.bind(this, false)}
        />
      )}
    </div>
  );
};

export default App;
