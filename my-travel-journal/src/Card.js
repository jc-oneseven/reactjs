import "./Card.css";
const Card = (props) => {
  const item = props.travelData;
  return (
    <div className="card">
      <figure className="card--img">
        <img src={item.imageURL} alt={item.title} />
      </figure>
      <div className="card--body">
        <header className="card--body--header">
          <div>
            <span className="card--body--header--location">
              {item.location}
            </span>
            <a rel="noreferrer" href={item.googleMapLink} target="_blank">
              View on Google Maps
            </a>
          </div>
          <h3> {item.title} </h3>
          <div className="dates">
            {item.startDate} -{item.endDate}
          </div>
        </header>
        <p className="card--body--content">{item.description}</p>
      </div>
    </div>
  );
};

export default Card;
