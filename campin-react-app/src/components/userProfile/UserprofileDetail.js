import {useState, useContext, useEffect} from "react";
import {useParams, Link, useNavigate, Navigate} from "react-router-dom";

import AuthContext from "../../context/AuthContext";

import '../../css/userprofileDetail.css';

export default function UserprofileDetail(){
    const {user} = useContext(AuthContext);
    const [userProfile, setUserProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwt_token');
        if (!jwtToken) {
            return Promise.reject('Unauthorized.')
        }
    
        const config = {
            headers:{
                'Authorization': "Bearer " + jwtToken,
            },
        };

        if(user){
            fetch("http://localhost:8080/api/userprofile/user/"+user.userId, config)
            .then(res => res.json())
            .then(setUserProfile)
            .catch(error => {
                navigate('/error');
            })
        }
        
    },[])

    return(
        <>
             {user&&userProfile&&(
                <div className="container pb-3" id="userDetailBox">
                <div id="myPageMainNav mb-3">
                     <ul className="nav nav-underline">
                             <li className="nav-item">
                                 <Link className="nav-link" style={{color:'rgb(69, 119, 98)'}} aria-current="page" to="/mypage">My Favorites</Link>
                             </li>
                             <li className="nav-item">
                                 <Link className="nav-link" style={{color:'rgb(69, 119, 98)'}} to={`/userprofile/${user.userId}`}>User Profile</Link>
                             </li>
                         </ul>
                </div>
                 <div className="mt-2">
                    <div className="d-flex justify-content-between ">
                        <div>
                            <h2>User Profile</h2>
                        </div>
                        {
                            user.userId === userProfile.appUserId&&
                            <div className="d-flex justify-content-end mt-3">
                                        <div className="me-3">
                                            <Link className="btn" id="profileEditBtn" to={`/userprofile/edit/${userProfile.userProfileId}`}>Edit</Link>
                                        </div>
                                    </div>
                        }
                    </div>
                    
                    <div>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        readOnly
                        value={userProfile.firstName}
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
                  readOnly
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
                  rows="5"
                  readOnly
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
                        readOnly
                        value={userProfile.dob}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor='gender'>Gender[optional]</label>
                        <input
                            type="text"
                            className="form-control"
                            id='gender'
							name='gender'
                            readOnly
                            value={userProfile.gender}
                        />

                    </div>
                
                </div>
                    </div>
                 </div>
                 
             </div>
             )
                
            }
           
        </>
    );

}