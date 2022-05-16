import { useEffect, useState } from "react";
import { signUp } from "../../Service/Auth.service";
import { useForm } from "react-hook-form";

const Register = (props) => {
  const [registration, setRegistration] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isRegistered, setisRegistered] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setRegistration((prevRegister) => {
      return {
        ...prevRegister,
        [name]: value,
      };
    });
  }
  function handleRegister(data, event) {
    event.preventDefault();
    signUp(registration)
      .then((res) => res.json())
      .then((data) => {
        setisRegistered(true);
        props.formSubmit(data);
        setRegistration({
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
    <form
      className="needs-validation"
      onSubmit={handleSubmit(handleRegister)}
      noValidate
    >
      {isRegistered && (
        <div className="alert alert-success"> Record Added successfully </div>
      )}

      <h3 className="mt-3"> {props.title} </h3>
      <p> {props.tagLine} </p>
      <div className="form-floating mb-3">
        <input
          type="text"
          className={`form-control ${errors.firstName ? "is-invalid" : ""} `}
          id="firstName"
          placeholder="First Name"
          name="firstName"
          autoComplete="off"
          value={registration.firstName}
          {...register("firstName", { required: true })}
          onChange={handleChange}
        />
        <label htmlFor="firstName">First Name</label>
        {errors.firstName && (
          <p className="invalid-feedback">Please check the First Name</p>
        )}
      </div>

      <div className="form-floating mb-3">
        <input
          type="text"
          className={`form-control ${errors.lastName ? "is-invalid" : ""} `}
          id="lastName"
          placeholder="Last Name"
          name="lastName"
          autoComplete="off"
          value={registration.lastName}
          {...register("lastName", { required: true })}
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last Name</label>
        {errors.lastName && (
          <p className="invalid-feedback">Please check the Last Name</p>
        )}
      </div>

      <div className="form-floating mb-3">
        <input
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""} `}
          id="email"
          placeholder="Email Address"
          name="email"
          autoComplete="off"
          value={registration.email}
          {...register("email", {
            required: true,
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          onChange={handleChange}
        />
        <label htmlFor="usernam">Email address</label>
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
        {errors.email && (
          <p className="invalid-feedback">Please check the Email address</p>
        )}
      </div>

      <div className="form-floating mb-3">
        <input
          type="text"
          className={`form-control ${errors.mobile ? "is-invalid" : ""} `}
          id="mobile"
          placeholder="Mobile Number"
          name="mobile"
          autoComplete="off"
          value={registration.mobile}
          {...register("mobile", { required: true })}
          onChange={handleChange}
        />
        <label htmlFor="mobile">Mobile Number</label>
        {errors.mobile && (
          <p className="invalid-feedback">Please check the Mobile Number</p>
        )}
      </div>

      <div className="form-floating mb-3">
        <input
          type="password"
          className={`form-control ${errors.password ? "is-invalid" : ""} `}
          id="password"
          placeholder="Password"
          name="password"
          autoComplete="off"
          value={registration.password}
          {...register("password", { required: true })}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        {errors.password && (
          <p className="invalid-feedback">Please check the Password</p>
        )}
      </div>

      <button type="submit" className="btn btn-secondary">
        Register
      </button>
    </form>
  );
};

export default Register;
