import Header from "../Header/Header";

const Hero = (props) => {
  function handleChange(event) {
    console.log(event);
  }
  return (
    <section className="Hero">
      <Header
        isLoggedIn={props.isLoggedIn}
        logout={props.logout}
        showModal={props.showModal}
      />
      <div className="container flex-grow-1 d-flex justify-content-center flex-column">
        <div className="Hero--content">
          <header className="Hero--content--header mb-4">
            <h2 className="Hero--content--header--title">
              Find Your Favorite Restaurant for any occasion
            </h2>
            <p className="Hero--content--header--subline">
              Search more 1000+ Restaurants for any occasion and book your table
              with ease.
            </p>
          </header>

          <form className="Hero--form">
            <div className="d-flex justify-content-center gap-4">
              <div className="col-3 form-floating">
                <input
                  type="date"
                  className="form-control"
                  id="floatingInput"
                  name="date"
                  placeholder="Select Date"
                />
                <label htmlFor="floatingInput">Date</label>
              </div>
              <div className="col-3 form-floating">
                <input
                  type="Search"
                  className="form-control"
                  id="floatingInput"
                  name="Search"
                  placeholder="Search Restraurants"
                  value={"Crazy Eggs"}
                  onChange={handleChange}
                />
                <label htmlFor="floatingInput">Search Restraurants</label>
              </div>
              <button className="btn-secondary col-2 rounded-3">Search</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
