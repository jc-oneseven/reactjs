import { useState } from "react";
import { Link } from "react-router-dom";
import { GetRestaurants } from "../../Service/GetRestaurants";
import { GetUserFromStore } from "../../Service/Storage";
import Header from "../Header/Header";

const Hero = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  function handleChange(event) {
    const inputText = event.target.value;

    inputText !== ""
      ? GetRestaurants(inputText)
          .then((res) => res.json())
          .then((data) => setRestaurants(data))
      : setRestaurants([]);

    setSearchText(inputText);
  }

  function handleClick(event) {
    console.log(this);
    setSearchText(this);
    setRestaurants([]);
  }

  function handleDateChange(event) {
    props.setDate(event.target.value);
  }

  // function findRestaurants(event) {
  //   event.preventDefault();

  //   const { token } = GetUserFromStore();
  //   fetch("http://localhost:8080/restaurants/1", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }

  return (
    <section className="Hero">
      <Header
        isLoggedIn={props.isLoggedIn}
        logout={props.logout}
        showModal={props.showModal}
        userName={props.userName}
        currentUserRole={props.currentUserRole}
      />

      <div className="container flex-grow-1 d-flex justify-content-center flex-column">
        <div className="Hero--content">
          <header className="Hero--content--header mb-4">
            <h2 className="Hero--content--header--title">
              Find Your Favorite Restaurant for any occasion
            </h2>
            <p className="Hero--content--header--subline">
              Search more 1000+ Restaurants for any occasion and book your table
              with ease.
            </p>
          </header>

          <form className="Hero--form">
            <div className="d-flex justify-content-center gap-4">
              <div className="col-lg-3 col-5 form-floating">
                <input
                  type="date"
                  className="form-control"
                  id="floatingInput"
                  name="date"
                  placeholder="Select Date"
                  min={props.searchDate}
                  value={props.searchDate}
                  onChange={handleDateChange}
                />
                <label htmlFor="floatingInput">Date</label>
              </div>
              <div className="col-5 form-floating">
                <input
                  type="Search"
                  className="form-control"
                  id="floatingInput"
                  name="Search"
                  placeholder="Search Restraurants"
                  onChange={handleChange}
                  value={searchText}
                />
                <label htmlFor="floatingInput">Search Restraurants</label>

                {restaurants.length > 0 && (
                  <div className="list-group">
                    {restaurants.map((restaurant, index) => (
                      <Link
                        key={index}
                        className="list-group-item list-group-item-action text-primary text-decoration-none"
                        onClick={handleClick.bind(restaurant.name)}
                        to={`/restautants/${restaurant.id}`}
                      >
                        {restaurant.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {/* <button
                onClick={findRestaurants}
                className="btn-secondary col-2 rounded-3"
              >
                Search
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
