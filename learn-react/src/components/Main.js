import bgImage from "../images/reactBg.svg";

export default function Main() {
  return (
    <main className="main-contant">
      <h1 className="main-contant--title"> Fun facts about React </h1>
      <ul className="main-content--data">
        <li> Was first releasted in 2013 </li>
        <li> Was originally created by Jordan Walke </li>
        <li> Has well over 100K starts on Github </li>
        <li> Is maintained by Facebook </li>
        <li> Power thousands of entireprise app, include mobile apps </li>
      </ul>
      <img
        className="main-contact--bg-img"
        src={bgImage}
        alt="React background"
      />
    </main>
  );
}
