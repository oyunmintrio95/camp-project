import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import ValidationSummary from "../ValidationSummary";

export default function UserProfileForm(){

    const {user} = useContext(AuthContext);

    const {userProfileId} = useParams();

    const DEFAULT_PROFILE = {
        appUserId: user.userId,
        firstName: "",
        lastName: "",
        description: "",
        dob:"",
        gender:"",
    }

    const [userProfile, setUserProfile] = useState(DEFAULT_PROFILE);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwt_token');
        if (!jwtToken) {
            return Promise.reject('Unauthorized.')
          }
        const init = {
            headers: {
                "Authorization": "Bearer " + jwtToken
            }
        }

        if(userProfileId){
            fetch(`http://localhost:8080/api/userprofile/${userProfileId}`,init)
                .then(res => res.json())
                .then(setUserProfile)
                .catch(error => {
                    setErrors(error);
                    navigate=("/error");
                })
        }

    }, [userProfileId])

    function handleChange(evt){
        setUserProfile({
            ...userProfile,
            [evt.target.name]:
                evt.target.type === 'checkbox'
                    ? evt.target.checked
                    : evt.target.value,
        });

    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if(userProfileId > 0){
            updateUserProfile();
        }else{
            addUserProfile();
        }

    }

    function addUserProfile(){
        const jwtToken = localStorage.getItem('jwt_token');
        if (!jwtToken) {
            return Promise.reject('Unauthorized.')
        }
    
        const config = {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + jwtToken,
            },
            body: JSON.stringify(userProfile)
        };

        fetch("http://localhost:8080/api/userprofile", config)
        .then(res => {
            if(res.ok){
                navigate("/");
            }else{
                return res.json();
            }
        })
        .then(err => {
            if(err){
                return Promise.reject(err);
            }
        })
        .catch(errs => {
            if(errs.length){
                setErrors(errs);
            }else{
                setErrors([errs]);
            }
        });
    }

    function updateUserProfile(){
        const jwtToken = localStorage.getItem('jwt_token');
        if (!jwtToken) {
            return Promise.reject('Unauthorized.')
        }
    
        const config = {
            method: "PUT",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + jwtToken,
            },
            body: JSON.stringify(userProfile)
        };

        fetch("http://localhost:8080/api/userprofile/" + userProfile.userProfileId, config)
        .then(res => {
            if (res.ok) {
                navigate('/');
            } else if (res.status === 400) {
                return res.json();
            }
        })
        .then(errors => {
            setErrors(errors);
        })
        .catch(console.error);

    }

    return (
        <div>
          <ValidationSummary errors={errors} />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
            <input
                type="text"
                className="form-control"
                id="appUserId"
                name="appUserId"
                value={user.userId}
            />
            </div>
           
            <div>
                <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={userProfile.firstName}
                  onChange={handleChange}
                  required
                />
                </div>
                 <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={userProfile.lastName}
                  onChange={handleChange}
                  required
                />
                </div>
                <div className="form-group">
                <label htmlFor="description">Tell us about your self!</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={userProfile.description}
                  placeholder="ex) your camping style, your hobby"
                  onChange={handleChange}
                  required
                />
                </div>
                <div className="form-group row mb-3">
                    <div className="col">
                    <label htmlFor="dob">Date of birth [optional]</label>
                    <input
                        type="date"
                        className="form-control"
                        id="dob"
                        name="dob"
                        value={userProfile.dob}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    <div className="col">
                        <label htmlFor='gender'>Gender[optional]</label>
						<select
							id='gender'
							name='gender'
							className='form-select'
							value={userProfile.gender}
							onChange={handleChange}>
							<option>Prefer not to disclose</option>
							<option>Man</option>
							<option>Woman</option>
							<option>Non-Binary</option>
						</select>
                    </div>
                
                </div>
              <div className="d-flex justify-content-end">
                <div>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
                </div>
                <div className="ms-2">
                <Link to="/" className="btn btn-outline-success">
                  Cancel
                </Link>
                </div>
                
              </div>
            </div>
          </form>
        </div>
      );
}