import Card from "../Card/Card";

const RestaurantList = (props) => {
  return (
    <section className="List">
      <header className="List--title">
        <h4> {props.title} </h4>
      </header>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <div className="col">
          <Card />
        </div>
        <div className="col">
          <Card />
        </div>
        <div className="col">
          <Card />
        </div>
        <div className="col">
          <Card />
        </div>
      </div>
    </section>
  );
};
export default RestaurantList;
