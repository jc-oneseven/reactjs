import { useState } from "react";
import { signIn } from "../../Service/Auth.service";
import { SetUserInStore } from "../../Service/Storage";
import { useForm } from "react-hook-form";

const Login = (props) => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function handleChange(event) {
    const { name, value } = event.target;

    setLoginData((prevLoginData) => {
      return {
        ...prevLoginData,
        [name]: value,
      };
    });
  }

  function handleLogin(data, event) {
    // debugger;
    event.preventDefault();

    signIn(loginData)
      .then((res) => res.json())
      .then((data) => {
        const { username } = loginData;

        // Store loggedIn User info
        SetUserInStore(JSON.stringify({ ...data, username }));

        props.closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="needs-validation"
      noValidate
    >
      <h3 className="mt-3"> Login </h3>
      <p> Login into your account to reserve your favorite restaurant </p>
      <div className="form-floating mb-3">
        <input
          type="email"
          className={`form-control ${errors.username ? "is-invalid" : ""} `}
          id="username"
          placeholder="Email Address"
          name="username"
          value={loginData.username}
          {...register("username", { required: true })}
          onChange={handleChange}
        />
        <label htmlFor="username">Email address</label>
        {errors.username && (
          <p className="invalid-feedback">Please check the Email address</p>
        )}
      </div>
      <div className="form-floating mb-3">
        <input
          type="password"
          className={`form-control ${errors.password ? "is-invalid" : ""} `}
          id="password"
          placeholder="Password"
          name="password"
          value={loginData.password}
          {...register("password", { required: true })}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        {errors.password && (
          <p className="invalid-feedback">Please check the Password</p>
        )}
      </div>

      <button type="submit" className="btn btn-secondary">
        Login
      </button>
    </form>
  );
};
export default Login;
