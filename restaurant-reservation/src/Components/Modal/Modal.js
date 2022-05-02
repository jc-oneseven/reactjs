import Login from "../Login/Login";

const Modal = (props) => {
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

        <Login closeModal={props.closeModal} />
      </div>
    </div>
  );
};

export default Modal;
