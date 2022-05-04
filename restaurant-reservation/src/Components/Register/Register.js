import { useEffect, useState } from "react";
import { signUp } from "../../Service/Auth.service";

const Register = (props) => {
  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [isRegistered, setisRegistered] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setRegister((prevRegister) => {
      return {
        ...prevRegister,
        [name]: value,
      };
    });
  }
  function handleRegister(event) {
    event.preventDefault();
    signUp(register)
      .then((res) => res.json())
      .then((data) => {
        setisRegistered(true);
        props.formSubmit(data);
        setRegister({
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          password: "",
        });
      })
      .catch((err) => alert("something went wrong"));
  }

  // useEffect(function(){
  //   handleRegister;
  // })

  return (
    <form onSubmit={handleRegister}>
      {isRegistered && (
        <div className="alert alert-success"> Record Added successfully </div>
      )}

      <h3 className="mt-3"> {props.title} </h3>
      <p> {props.tagLine} </p>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="firstName"
          placeholder="First Name"
          name="firstName"
          required
          onChange={handleChange}
          autoComplete="off"
          value={register.firstName}
        />
        <label htmlFor="firstName">First Name</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="lastName"
          placeholder="Last Name"
          name="lastName"
          required
          onChange={handleChange}
          autoComplete="off"
          value={register.lastName}
        />
        <label htmlFor="lastName">Last Name</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Email Address"
          name="email"
          required
          onChange={handleChange}
          autoComplete="off"
          value={register.email}
        />
        <label htmlFor="usernam">Email address</label>
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>

      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="mobile"
          placeholder="Mobile Number"
          name="mobile"
          required
          onChange={handleChange}
          autoComplete="off"
          value={register.mobile}
        />
        <label htmlFor="mobile">Mobile Number</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Password"
          name="password"
          required
          onChange={handleChange}
          autoComplete="off"
          value={register.password}
        />
        <label htmlFor="password">Password</label>
      </div>

      <button className="btn btn-secondary">Register</button>
    </form>
  );
};

export default Register;
