import { useState } from "react";
import { signIn } from "../../Service/Auth.service";

const Login = (props) => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setLoginData((prevLoginData) => {
      return {
        ...prevLoginData,
        [name]: value,
      };
    });
  }

  function handleLogin(event) {
    event.preventDefault();

    signIn(loginData)
      .then((res) => res.json())
      .then((data) => {
        const { username } = loginData;

        // Store loggedIn User info
        localStorage.setItem("user", JSON.stringify({ ...data, username }));

        props.closeModal();
      });
  }

  return (
    <form onSubmit={handleLogin}>
      <h3 className="mt-3"> Login </h3>
      <p> Login into your account to reserve your favorite restaurant </p>
      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          id="username"
          placeholder="Email Address"
          name="username"
          required
          onChange={handleChange}
        />
        <label htmlFor="usernam">Email address</label>
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
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
        />
        <label htmlFor="password">Password</label>
      </div>

      <button className="btn btn-secondary">Login</button>
    </form>
  );
};
export default Login;
