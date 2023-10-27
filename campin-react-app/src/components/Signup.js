import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../services/authAPI";

import ValidationSummary from "./ValidationSummary";

import '../css/signup.css';
import '../css/buttonStyle.css';

function SignUp() {
  const [errors, setErrors] = useState([]);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (evt) => {
    const nextCredentials = { ...credentials };
    nextCredentials[evt.target.name] = evt.target.value;
    setCredentials(nextCredentials);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setErrors([]);
    if (!validateForm()) {
      setErrors(["Passwords do not match!"]);
      return;
    }

    register(credentials)
      .then(data => {
        console.log("success");
        console.log(data);
        setSuccess(true);
      })
      .catch(error => {
        console.log(error)
        setErrors(error);
      })

    // register(credentials).then((data) => {
    //   if (data && data.errors) {
    //     setErrors(data.errors);
    //   } else {
    //     setSuccess(true);
  
    //   }
    // });
  };

  const validateForm = () => {
    return credentials.password === credentials.confirmPassword;
  };

  return (
    <div id="signupBox" style={{marginTop: '10%'}} className="d-flex justify-content-center">
      <div className="container row col-lg-8 col-sm-10 p-4 rounded-4 shadow">
        <div id='introText' className="col-4 text-center row justify-content-center align-items-center mt-4">
          <div>
            <img className="d-block img-fluid mb-4" src="https://campen-joy-bucket.s3.amazonaws.com/for-favicon.png"></img>
            Welcome to CampenJoy!<br></br>
            Sign up to become our member :)
          </div>
         
        </div>
      <div className="col">
      <ValidationSummary errors={errors} />
      {success ? (
        <div className="d-flex align-items-center flex-column" id="successBox">
          Congratulations {credentials.username}! <br></br>
          You have been registered.
          Login and let's make a profile!
          <div className="d-flex jusify-content-end mt-3">
          <Link className="btn btn-success" to="/login">Login</Link>
          </div>
          
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
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
            <div className="form-group">
              <label htmlFor="label">Confirm password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={credentials.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex justify-content-end">
            <button type="submit" id="signupFormBtn" className="btn buttonFill me-3">
                Sign up
              </button>
              <Link to="/" className="btn btn-secondary" id="signupCancelBtn">
                Cancel
              </Link>
              
            </div>
          </div>
        </form>
      )}
    </div>

      </div>
    </div>
  );
}

export default SignUp;
