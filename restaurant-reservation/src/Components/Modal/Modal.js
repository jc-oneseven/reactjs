import Login from "../Login/Login";
import Register from "../Register/Register";

const Modal = (props) => {
  function handleRegisterFormSubmit() {
    props.closeModal();
  }
  return (
    <div className="modal">
      <div className="modal-dialog">
        <button
          onClick={props.closeModal}
          className="btn btn-modal-closer p-2"
          title="Close"
        >
          <span className="btn-close me-2"></span> Close
        </button>
        {props.component === "login" ? (
          <Login closeModal={props.closeModal} />
        ) : (
          <Register
            formSubmit={handleRegisterFormSubmit}
            title="Sign Up"
            tagLine="Create your account to reserve your favorite restaurant"
          />
        )}
      </div>
    </div>
  );
};

export default Modal;
