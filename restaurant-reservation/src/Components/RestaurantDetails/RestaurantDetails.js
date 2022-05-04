import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetRestaurant } from "../../Service/GetRestaurants";

const RestaurantDetails = () => {
  const params = useParams();

  const [restaurant, setRestaurant] = useState({});

  useEffect(function () {
    GetRestaurant(params.id)
      .then((res) => res.json())
      .then((data) => {
        setRestaurant(data);
      });
  }, []);

  return (
    <div>
      {Object.keys(restaurant).length && (
        <div className="card my-3 border-0">
          <div className="d-flex align-items-center justify-content-between">
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
                className="ms-1 small text-secondary text-decoration-none"
                href={`mailto${restaurant.email}`}
              >
                <small>{restaurant.email}</small>
              </a>

              <button className="btn btn-primary ms-3"> Book Now </button>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            className="card-img-top my-3"
            alt={restaurant.name}
          />

          <div className="card-body row">
            <div className="col-8">
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
