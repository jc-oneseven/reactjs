import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URI, month, weekday } from "../../Constant/Constant";
import { getReservations } from "../../Service/getReservations";
import { GetRestaurant } from "../../Service/GetRestaurants";
import { GetUserFromStore } from "../../Service/Storage";

const RestaurantDetails = (props) => {
  const params = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [slots, setSlots] = useState([
    { id: 1, slot: "12:00" },
    { id: 2, slot: "13:00" },
    { id: 3, slot: "14:00" },
    { id: 4, slot: "15:00" },
    { id: 5, slot: "18:00" },
    { id: 6, slot: "19:00" },
    { id: 7, slot: "20:00" },
    { id: 8, slot: "21:00" },
    { id: 9, slot: "22:00" },
  ]);
  const [showSlots, setshowSlots] = useState(false);
  const [selectedSlot, setselectedSlot] = useState("");
  const [reserved, setReserved] = useState([]);

  function showSlotsHandler() {
    setshowSlots((prevShowSlots) => !prevShowSlots);
  }

  function handleSlotChange(event) {
    setselectedSlot(event.target.id);
  }

  function bookRestaurant() {
    const { token } = GetUserFromStore();

    const reservationsBody = {
      reservationDate: props.searchDate + " 00:00",
      restaurantId: restaurant.id,
      slotId: selectedSlot,
    };

    return fetch(`${API_URI}/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reservationsBody),
    })
      .then((res) => res.json())
      .then((data) => {
        setshowSlots(false);
        getReservations();
      })
      .catch((err) => alert(err));
  }

  useEffect(
    function () {
      // getReservations();

      // Get All reservations
      if (props.isLoggedIn) {
        getReservations()
          .then((res) => res.json())
          .then((data) => {
            setReserved(() => {
              return data.filter((item) => {
                return item.restaurant.id == params.id;
              });
            });
          })
          .catch((err) => alert(err));
      }

      GetRestaurant(params.id)
        .then((res) => res.json())
        .then((data) => {
          setRestaurant(data);
        });
    },
    [params, showSlots]
  );

  return (
    <div>
      {Object.keys(restaurant).length > 0 && (
        <div className="card my-3 border-0">
          {reserved.length > 0 && (
            <div className="alert alert-light">
              You already have booked this restaurant for :
              <ol className="list-group list-group-numbered">
                {reserved.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-info d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      {`${weekday[new Date(item.reservationDate).getDay()]}, 
                        ${month[new Date(item.reservationDate).getMonth()]}
                        ${new Date(item.reservationDate).getDate()}
                      `}{" "}
                      on {item.slot.slot}.
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <header className="d-flex align-items-center justify-content-between">
            <h2 className="card-title mb-0">{restaurant.name}</h2>

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
                className="ms-1 me-3 small text-secondary text-decoration-none"
                href={`mailto${restaurant.email}`}
              >
                <small>{restaurant.email}</small>
              </a>

              {props.isLoggedIn && !showSlots && (
                <button onClick={showSlotsHandler} className="btn btn-primary">
                  Choose Slot to book
                </button>
              )}
              {!props.isLoggedIn && (
                <>
                  <span> Please </span>
                  <a
                    id="login"
                    href="#"
                    className="text-info px-1 nav-link"
                    onClick={props.showModal}
                  >
                    Login
                  </a>
                  <span>to Book now</span>
                </>
              )}
            </div>
          </header>
          {showSlots && (
            <div className="my-3 alert alert-gray-700 border">
              <header className="d-flex justify-content-between mb-2">
                <h6> Select slot to continue with Booking </h6>
                <button
                  onClick={showSlotsHandler}
                  className="btn p-0"
                  title="Close"
                >
                  <span className="btn-close me-2"></span>
                </button>
              </header>
              <div className="d-flex flex-wrap gap-3">
                {slots.map((slot, index) => (
                  <div key={index} className="form-check p-0">
                    <input
                      type="radio"
                      className="btn-check"
                      name="slot"
                      id={slot.id}
                      value={slot.slot}
                      onChange={handleSlotChange}
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-primary-dark"
                      htmlFor={slot.id}
                    >
                      {slot.slot}
                    </label>
                  </div>
                ))}
              </div>
              <footer className="mt-3">
                <button
                  onClick={bookRestaurant}
                  className={`btn btn-secondary ${
                    selectedSlot === "" ? "disabled" : ""
                  }`}
                >
                  Book Now
                </button>
                <p className="small text-muted mt-2 mb-0">
                  <em>
                    By default, Tomorrow's date will be used as a Booking Date
                    if no date selected in Search Box.
                  </em>
                </p>
              </footer>
            </div>
          )}

          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            className="card-img-top my-3"
            alt={restaurant.name}
          />

          <div className="card-body row">
            <div className="col-8 mb-4">
              <p className="card-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
                deleniti veniam laborum soluta veritatis mollitia fugit,
                doloribus suscipit reprehenderit. Tempore id aspernatur rem,
                illum repudiandae nisi beatae aliquam odit nihil. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Iste deleniti
                veniam laborum soluta veritatis mollitia fugit, doloribus
                suscipit reprehenderit. Tempore id aspernatur rem, illum
                repudiandae nisi beatae aliquam odit nihil.
              </p>
              <p className="card-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
                deleniti veniam laborum soluta veritatis mollitia fugit,
                doloribus suscipit reprehenderit. Tempore id aspernatur rem,
                illum repudiandae nisi beatae aliquam odit nihil. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Iste deleniti
                veniam laborum soluta veritatis mollitia fugit, doloribus
                suscipit reprehenderit. Tempore id aspernatur rem, illum
                repudiandae nisi beatae aliquam odit nihil. Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Iste deleniti veniam
                laborum soluta veritatis mollitia fugit, doloribus suscipit
                reprehenderit. Tempore id aspernatur rem, illum repudiandae nisi
                beatae aliquam odit nihil.
              </p>
            </div>
            <div className="col">
              <ul className="list-group mb-4">
                <h6 className="mb-2">
                  <strong> More Defails about {restaurant.name} </strong>
                </h6>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Contact Number
                  <span className="badge bg-primary rounded-pill">
                    {restaurant.phone}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Email
                  <span className="badge bg-primary rounded-pill">
                    {restaurant.email}
                  </span>
                </li>
              </ul>

              <ul className="list-group mb-4">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Available Table
                  <span className="badge bg-primary rounded-pill">
                    {restaurant.tables}
                  </span>
                </li>
              </ul>

              {restaurant.cuisines.length > 0 && (
                <ul className="list-group">
                  <h6 className="mb-2">
                    <strong> Cuisines </strong>
                  </h6>
                  {restaurant.cuisines.map((cuisine) => (
                    <li
                      key={cuisine.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {cuisine.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetails;
