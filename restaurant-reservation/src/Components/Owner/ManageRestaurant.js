import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { cities, seatingOptions } from "../../Constant/Constant";
import { GetCuisines } from "../../Service/GetCuisines";
import { GetRestaurantsByOwner } from "../../Service/GetRestaurants";

const ManageRestaurant = (props) => {
  const [cuisines, setCuisines] = useState([]);
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
  });

  // GetCuisines
  GetCuisines();
  useEffect(function () {
    GetCuisines()
      .then((res) => res.json())
      .then((data) => {
        setCuisines(data);
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Add Restaurant
  function handleChange(event) {
    const { name, value } = event.target;
    setNewRestaurant((prevRestaurant) => {
      return {
        ...prevRestaurant,
        [name]: value,
      };
    });
  }

  function handleCheckboxChange(event) {
    const { name, value, type, checked } = event.target;
    console.log(name, value, type, checked);

    setNewRestaurant((prevRestaurant) => {
      if (checked) {
        prevRestaurant[name].push(value);
      } else {
        prevRestaurant[name] = prevRestaurant[name].filter((id) => id != value);
      }

      return {
        ...prevRestaurant,
      };
    });
  }
  function handleAddRestaurant(data, event) {
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
  }

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
            noValidate
            onSubmit={handleSubmit(handleAddRestaurant)}
          >
            <header className="form-header px-4">
              <h3 className="mt-3"> Add Restaurant </h3>
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
                  className={`form-control ${errors.name ? "is-invalid" : ""} `}
                  id="name"
                  placeholder="name"
                  name="name"
                  autoComplete="off"
                  value={newRestaurant.name}
                  {...register("name", { required: true })}
                  onChange={handleChange}
                />
                <label htmlFor="name">Name</label>
                {errors.name && (
                  <p className="invalid-feedback">Please check the Name</p>
                )}
              </div>
              {/* description */}
              <div className="form-floating mb-3">
                <textarea
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  } `}
                  id="description"
                  placeholder="description"
                  name="description"
                  autoComplete="off"
                  value={newRestaurant.description}
                  {...register("description", { required: true })}
                  onChange={handleChange}
                />
                <label htmlFor="description">Description</label>
                {errors.description && (
                  <p className="invalid-feedback">
                    Please check the Description
                  </p>
                )}
              </div>

              <h6> Contact Details </h6>
              {/* Email */}
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className={`form-control ${
                    errors.email ? "is-invalid" : ""
                  } `}
                  id="email"
                  placeholder="Email"
                  name="email"
                  autoComplete="off"
                  value={newRestaurant.email}
                  {...register("email", {
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
                {errors.email && (
                  <p className="invalid-feedback">Please check the Email</p>
                )}
              </div>
              {/* phone */}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={`form-control ${
                    errors.phone ? "is-invalid" : ""
                  } `}
                  id="phone"
                  placeholder="phone"
                  name="phone"
                  autoComplete="off"
                  value={newRestaurant.phone}
                  {...register("phone", { required: true })}
                  onChange={handleChange}
                />
                <label htmlFor="phone">Phone</label>
                {errors.phone && (
                  <p className="invalid-feedback">Please check the Phone</p>
                )}
              </div>
              {/* city */}
              <div className="form-floating mb-3">
                <select
                  className={`form-select ${errors.city ? "is-invalid" : ""} `}
                  name="city"
                  {...register("city", { required: true })}
                  onChange={handleChange}
                >
                  <option defaultValue={-0}> Select City </option>
                  {cities.map((city) => (
                    <option key={city.name} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="city">City</label>
                {errors.city && (
                  <p className="invalid-feedback">Please check the city</p>
                )}
              </div>
              {/* address */}
              <div className="form-floating mb-3">
                <textarea
                  className={`form-control ${
                    errors.address ? "is-invalid" : ""
                  } `}
                  id="address"
                  placeholder="address"
                  name="address"
                  autoComplete="off"
                  value={newRestaurant.address}
                  {...register("address", { required: true })}
                  onChange={handleChange}
                />
                <label htmlFor="address">Address</label>
                {errors.address && (
                  <p className="invalid-feedback">Please check the address</p>
                )}
              </div>
              {/* pincode */}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={`form-control ${
                    errors.pincode ? "is-invalid" : ""
                  } `}
                  id="pincode"
                  placeholder="pincode"
                  name="pincode"
                  autoComplete="off"
                  value={newRestaurant.pincode}
                  {...register("pincode", { required: true })}
                  onChange={handleChange}
                />
                <label htmlFor="pincode">Pincode</label>
                {errors.pincode && (
                  <p className="invalid-feedback">Please check the pincode</p>
                )}
              </div>
              <h6> Additional Details </h6>
              {/* tables */}
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className={`form-control ${
                    errors.tables ? "is-invalid" : ""
                  } `}
                  id="tables"
                  placeholder="tables"
                  name="tables"
                  autoComplete="off"
                  value={newRestaurant.tables}
                  {...register("tables", { required: true })}
                  onChange={handleChange}
                />
                <label htmlFor="tables">No. of Tables</label>
                {errors.tables && (
                  <p className="invalid-feedback">Please check the tables</p>
                )}
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
                  {seatingOptions.map((seating) => (
                    <div key={seating.name} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={seating.id}
                        id={`${seating.id}${seating.name}`}
                        name="seating"
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
                Add
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
