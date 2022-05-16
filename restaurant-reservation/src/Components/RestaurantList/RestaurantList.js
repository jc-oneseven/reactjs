import { useEffect, useState } from "react";
import { GetRestaurants } from "../../Service/GetRestaurants";
import Card from "../Card/Card";

const RestaurantList = (props) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(function () {
    GetRestaurants()
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data);
      });
  }, []);

  return (
    <section className="List">
      <header className="List--title">
        <h4> {props.title} </h4>
      </header>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {restaurants.length > 0 &&
          restaurants.map((item) => (
            <div key={item.id} className="col">
              <Card item={item} />
            </div>
          ))}
      </div>
      {restaurants.length === 0 && (
        <div className="alert alert-info"> No restaurants found. </div>
      )}
    </section>
  );
};
export default RestaurantList;
