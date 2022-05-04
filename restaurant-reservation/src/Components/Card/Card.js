import { Link } from "react-router-dom";

const Card = (props) => {
  const { id, name, email, city } = props.item;

  return (
    <div className="card">
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        className="card-img-top"
        alt={name}
      />
      <div className="card-body">
        <h5 className="card-title d-flex flex-column">
          <Link
            className="text-primary text-decoration-none"
            to={`/restautants/${id}`}
          >
            {name}
          </Link>
          <a
            className="small text-secondary text-decoration-none"
            href={`mailto${email}`}
          >
            <small>{email}</small>
          </a>
        </h5>
        <p className="card-text">
          This is a longer card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </p>
      </div>
      <div className="card-footer text-muted"> City: {city.name}</div>
    </div>
  );
};

export default Card;
