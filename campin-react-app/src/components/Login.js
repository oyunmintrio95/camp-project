import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authAPI";

import AuthContext from "../context/AuthContext";
import ValidationSummary from "./ValidationSummary";


import '../css/buttonStyle.css';
import '../css/login.css';

export default function Login(){
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
      });
      const [errors, setErrors] = useState([]);
    
      const { handleLoggedIn } = useContext(AuthContext);
    
      const navigate = useNavigate();

    
      const handleSubmit = (evt) => {
        evt.preventDefault();
        setErrors([]);
        login(credentials)
          .then(user => {
            handleLoggedIn(user);
            navigate("/");
          })
          .catch(err => {
            setErrors(['Invalid username/password.']);
          });
      };

      
    
      const handleChange = (evt) => {
        const nextCredentials = {...credentials};
        nextCredentials[evt.target.name] = evt.target.value;
        setCredentials(nextCredentials);
      };

    return (
      <div id="loginBox" style={{marginTop: '10%'}}>
        <div className="container col-lg-6 col-sm-8 p-4 rounded-4 shadow" >
          <div className="d-flex justify-content-center">
            <img className="img-fluid" src="https://campen-joy-bucket.s3.amazonaws.com/campenjoy-logo.png" alt="campenjoy logo"/>
          </div>
          <div className="pt-3 pb-3">
          <ValidationSummary errors={errors} />
          <form onSubmit={handleSubmit} className>
            <div>
              <div className="form-group">
                <label htmlFor="label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn buttonFill me-2" id="loginBtn2">
                  Log in
                </button>
              </div>
            </div>
          </form>
          </div>
        </div>

      </div>
      );
}