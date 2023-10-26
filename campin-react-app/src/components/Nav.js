import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";


import '../css/nav.css';

function Nav() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light mt-2 mb-2 ps-4 pe-4">
        <NavLink className="navbar-brand" to="/">
          <img src='/campenjoy-logo.png' alt='CampenJoy Logo' width='200' />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/campsite">
                Explore Campsites
              </NavLink>
            </li>
            {user && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/category">
                  My Page
                </NavLink>
              </li>
            )}
          </ul>

          {!user && <div>
             <Link className="btn me-3" id="loginBtn" to="/login">Login</Link>
             <Link className="btn" id="signupBtn" to="/signup">Sign Up</Link>
            </div>}
          {user && (
            <div>
              <span className="badge rounded-pill text-bg-info">
                {user.username}
              </span>
              <button 
                onClick={logout} id="logoutBtn"
                className="btn ms-3"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Nav;
