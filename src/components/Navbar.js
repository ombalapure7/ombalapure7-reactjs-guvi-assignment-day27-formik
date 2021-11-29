import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fs-3">
          EKart
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="navbar-brand nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products/add" className="navbar-brand nav-link">
                Add Product
              </Link>
            </li>
            <li className="position-relative nav-item">
              <Link to="/products/add/formik" className="navbar-brand nav-link">
                Add Product Formik
                <span 
                  style={{color: "#fff"}}
                  className="position-absolute top-0 start-90">*</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
