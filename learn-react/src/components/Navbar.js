import logo from "../images/logo.svg";

const Navbar = () => {
  return (
    <header className="header">
      <img src={logo} alt="React Logo" />
      <h3 className="header--project-title"> React Course - Project 1 </h3>
    </header>
  );
};

export default Navbar;
