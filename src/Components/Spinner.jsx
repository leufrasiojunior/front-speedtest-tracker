import Spinner from "react-bootstrap/Spinner";

function Loader() {
  return (
    <div className="d-flex justify-content-center ">
      <Spinner animation="border" role="status" className="spinner-border">
        <span className="visually-hidden z-3 position-absolute p-5 rounded-3">
          Loading...
        </span>
      </Spinner>
    </div>
  );
}

export default Loader;
