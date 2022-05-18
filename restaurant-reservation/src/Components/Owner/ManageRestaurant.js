import { useEffect, useState } from "react";
import { cities, seatingOptions } from "../../Constant/Constant";
import { GetCuisines } from "../../Service/GetCuisines";

const ManageRestaurant = (props) => {
  const [cuisines, setCuisines] = useState([]);
  const [seatings, setSeatings] = useState(seatingOptions);
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    description: "",
    email: "",
    phone: "",
    city: null,
    address: "",
    pincode: "",
    cuisines: [],
    seating: [],
    tables: 0,
    imageData: "",
    imageName: "",
  });

  const [editRestaurant, setEditRestaurant] = useState({
    name: "",
    description: "",
    email: "",
    phone: "",
    city: null,
    address: "",
    pincode: "",
    cuisines: [],
    seating: [],
    tables: 0,
    imageData: "",
    imageName: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  // GetCuisines
  // GetCuisines();
  useEffect(function () {
    GetCuisines()
      .then((res) => res.json())
      .then((data) => {
        setCuisines(() => {
          return data.map((newData) => {
            return {
              ...newData,
              isChecked: false,
            };
          });
        });
      });
  }, []);

  // Add Restaurant
  function handleChange(event) {
    const { name, value } = event.target;
    if (isEditMode) {
      setEditRestaurant((prevRestaurant) => {
        return {
          ...prevRestaurant,
          [name]: value,
        };
      });
    } else {
      setNewRestaurant((prevRestaurant) => {
        return {
          ...prevRestaurant,
          [name]: value,
        };
      });
    }
  }

  function handleCheckboxChange(event) {
    const { name, value, type, checked } = event.target;
    console.log(name, value, type, checked);

    if (isEditMode) {
      setEditRestaurant((prevRestaurant) => {
        if (checked) {
          prevRestaurant[name].push(parseInt(value));
        } else {
          prevRestaurant[name] = prevRestaurant[name].filter(
            (id) => id != value
          );
        }

        return {
          ...prevRestaurant,
        };
      });
    } else {
      setNewRestaurant((prevRestaurant) => {
        if (checked) {
          prevRestaurant[name].push(parseInt(value));
        } else {
          prevRestaurant[name] = prevRestaurant[name].filter(
            (id) => id != value
          );
        }

        return {
          ...prevRestaurant,
        };
      });
    }

    if (name == "cuisines") {
      setCuisines((prevCuisines) => {
        return prevCuisines.map((cuisines) => {
          // console.log(value);
          if (checked && cuisines.id == value) {
            console.log({ ...cuisines, isChecked: true });
            return {
              ...cuisines,
              isChecked: true,
            };
          } else if (!checked && cuisines.id == value) {
            return {
              ...cuisines,
              isChecked: false,
            };
          } else {
            return cuisines;
          }
        });
      });
    } else {
      setSeatings((prevSeatings) => {
        return prevSeatings.map((seating) => {
          // console.log(value);
          if (checked && seating.id == value) {
            console.log({ ...seating, isChecked: true });
            return {
              ...seating,
              isChecked: true,
            };
          } else if (!checked && seating.id == value) {
            return {
              ...seating,
              isChecked: false,
            };
          } else {
            return seating;
          }
        });
      });
    }
  }

  function handleAddRestaurant(event) {
    event.preventDefault();

    props.handleAddRestaurantForm(newRestaurant);

    // Reset Form
    setNewRestaurant({
      name: "",
      description: "",
      email: "",
      phone: "",
      city: null,
      address: "",
      pincode: "",
      cuisines: [],
      seating: [],
      tables: 0,
    });

    // Reset Cuisines as well
    setCuisines([]);
    setSeatings(seatings);
  }

  function handleEditRestaurant(event) {
    event.preventDefault();

    props.handleEditRestaurantForm(editRestaurant);

    setIsEditMode(false);
    // Reset Form
    setEditRestaurant({});

    // Reset Cuisines
    console.log(cuisines);
    debugger;
    setCuisines((prevCuisines) => {
      return prevCuisines.map((newData) => {
        return {
          ...newData,
          isChecked: false,
        };
      });
    });
    // Reset seating
    setSeatings((preSeatings) => {
      return preSeatings.map((newData) => {
        return {
          ...newData,
          isChecked: false,
        };
      });
    });
  }

  function handleEditClick(data, event) {
    event.preventDefault();
    console.log(data);
    console.log(data.seatings);

    const getCuisineIds = data.cuisines.map((item) => item.id);
    const getSeatingIds = data.seatings.map((item) => item.id);
    const getCityId = data.city.id;

    setIsEditMode(true);
    setEditRestaurant(() => {
      return {
        ...data,
        cuisines: [...getCuisineIds],
        seating: [...getSeatingIds],
        city: getCityId,
        imageData: "",
        imageName: "",
      };
    });
    setCuisines((prevCuisines) => {
      return prevCuisines.map((cuisines) => {
        return {
          ...cuisines,
          isChecked: data.cuisines.some((item) => item.id == cuisines.id),
        };
      });
    });

    setSeatings((prevSeatings) => {
      return prevSeatings.map((seating) => {
        return {
          ...seating,
          isChecked: data.seatings.some((item) => item.id == seating.id),
        };
      });
    });
  }

  console.log(editRestaurant);

  return (
    <div>
      <header className="border-bottom mb-3">
        <h4> Manage Restaurants </h4>
      </header>
      <div className="row">
        {/* Add Restaurant Form */}
        <div className="col-4 border-end pt-2 bg-gray form-restaurant">
          <form
            className="needs-validation"
            onSubmit={isEditMode ? handleEditRestaurant : handleAddRestaurant}
          >
            <header className="form-header px-4">
              <h3 className="mt-3">
                {isEditMode ? "Edit Restaurant" : "Add Restaurant"}
              </h3>
              <p>
                Register your restaurant to better rich and get more
                reservations
              </p>
            </header>
            <section className="form-controls px-4">
              <h6> General Details </h6>
              {/* Name */}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="name"
                  required
                  name="name"
                  autoComplete="off"
                  value={isEditMode ? editRestaurant.name : newRestaurant.name}
                  onChange={handleChange}
                />
                <label htmlFor="name">Name</label>
              </div>
              {/* description */}
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  id="description"
                  placeholder="description"
                  name="description"
                  required
                  autoComplete="off"
                  value={
                    isEditMode
                      ? editRestaurant.description
                      : newRestaurant.description
                  }
                  onChange={handleChange}
                />
                <label htmlFor="description">Description</label>
              </div>

              <h6> Contact Details </h6>
              {/* Email */}
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  required
                  placeholder="Email"
                  name="email"
                  autoComplete="off"
                  value={
                    isEditMode ? editRestaurant.email : newRestaurant.email
                  }
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
              </div>
              {/* phone */}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  required
                  placeholder="phone"
                  name="phone"
                  autoComplete="off"
                  value={
                    isEditMode ? editRestaurant.phone : newRestaurant.phone
                  }
                  onChange={handleChange}
                />
                <label htmlFor="phone">Phone</label>
              </div>
              {/* city */}
              <div className="form-floating mb-3">
                <select
                  className={`form-select`}
                  name="city"
                  required
                  onChange={handleChange}
                  value={isEditMode ? editRestaurant.city.id : "-0"}
                >
                  <option defaultValue={-0}> Select City </option>
                  {cities.map((city) => (
                    <option key={city.name} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="city">City</label>
              </div>
              {/* address */}
              <div className="form-floating mb-3">
                <textarea
                  className={`form-control`}
                  id="address"
                  placeholder="address"
                  required
                  name="address"
                  autoComplete="off"
                  value={
                    isEditMode ? editRestaurant.address : newRestaurant.address
                  }
                  onChange={handleChange}
                />
                <label htmlFor="address">Address</label>
              </div>
              {/* pincode */}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={`form-control`}
                  id="pincode"
                  placeholder="pincode"
                  required
                  name="pincode"
                  autoComplete="off"
                  value={
                    isEditMode ? editRestaurant.pincode : newRestaurant.pincode
                  }
                  onChange={handleChange}
                />
                <label htmlFor="pincode">Pincode</label>
              </div>
              <h6> Additional Details </h6>
              {/* tables */}
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className={`form-control`}
                  id="tables"
                  required
                  placeholder="tables"
                  name="tables"
                  autoComplete="off"
                  value={
                    isEditMode ? editRestaurant.tables : newRestaurant.tables
                  }
                  onChange={handleChange}
                />
                <label htmlFor="tables">No. of Tables</label>
              </div>
              {/* cuisines */}
              <div className="mb-3">
                <label className="form-label">Select Cuisines</label>
                <div className="d-flex flex-wrap gap-2">
                  {cuisines.length > 0 &&
                    cuisines.map((cuisine) => (
                      <div key={cuisine.name} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={cuisine.id}
                          id={`${cuisine.id}${cuisine.name}`}
                          name="cuisines"
                          checked={cuisine.isChecked}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`${cuisine.id}${cuisine.name}`}
                        >
                          {cuisine.name}
                        </label>
                      </div>
                    ))}
                </div>
              </div>
              {/* seating */}
              <div className="mb-3">
                <label className="form-label">Select Seating</label>
                <div className="d-flex flex-wrap gap-2">
                  {seatings.map((seating) => (
                    <div key={seating.name} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={seating.id}
                        id={`${seating.id}${seating.name}`}
                        name="seating"
                        checked={seating.isChecked}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`${seating.id}${seating.name}`}
                      >
                        {seating.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <footer className="form-footer p-4">
              <button type="submit" className="btn btn-secondary">
                {isEditMode ? "Save" : "Add"}
              </button>
            </footer>
          </form>
        </div>
        <div className="col-8">
          {props.restaurants.length > 0 &&
            props.restaurants.map((restaurant, index) => (
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

                        <button
                          onClick={handleEditClick.bind(this, restaurant)}
                          className="btn btn-primary ms-3"
                        >
                          Edit
                        </button>
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

          {props.restaurants.length === 0 && (
            <div className="alert alert-info">No Restaurants found.</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ManageRestaurant;
