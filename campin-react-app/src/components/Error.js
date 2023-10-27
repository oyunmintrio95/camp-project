import { useLocation, Link } from "react-router-dom";

import  '../css/error.css';

function Error() {

  const location = useLocation();

  return <div>
    {location.state && location.state.message}
    {!location.state &&
      <div className="errorContainer">
        <div className="errorMessage">
          <div id="oops">
            <i class="bi bi-emoji-frown"></i><i class="bi bi-emoji-smile-upside-down"></i>ps! Sorry
          </div>
          <div>
            There's something wrong! Please try again!
          </div>
          <div>
            <Link className="btn" id="homeBtn" to="/">Home</Link>
          </div>
        </div>
        
      </div>}
  </div>

}

export default Error;