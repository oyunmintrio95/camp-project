import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";

import './css/home.css'

export default function Home(){
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(user){
            const jwtToken = localStorage.getItem('jwt_token');
            if (!jwtToken) {
                return Promise.reject('Unauthorized.')
            }
        
            const config = {
                method: "GET",
                headers:{
                    'Authorization': "Bearer " + jwtToken,
                },
            };
            fetch("http://localhost:8080/api/userprofile/user/"+user.userId, config)
            .then(res => {
              if(res.status === 200){
                   console.log("user profile already exists!")
                    navigate("/")
                   return res.json();
              }else if(res.status === 404) {
                   console.log("cannot find!")
                   navigate("/userprofile/add");
              }else{
                   console.log("unexpected error!")
                   navigate("/error");
              }
           });
           
        }
    },[])


    return(
        <>
            <div id="home1">
                <div className="d-flex justify-content-center">
                       <div className="homeText">
                            <div>Explore Information of </div>
                            <div>
                            National/State Park Campsites!
                            </div>
                        </div> 
                </div>
            </div>
            <div id="home2">
                <div className="d-flex justify-content-center">
                       <div className="homeText" id="homeText2">
                            <div>Find Out Campers'</div>
                            <div>
                                Live Experience of Campsites!
                            </div>
                        </div> 
                </div>
            </div>
            <div id="home3">
                <div >
                       <div className="homeText" id="homeText3">
                            Save your Favorite Campsites!
                        </div> 
                </div>
            </div>
            {/* <div id="home4">
                <div id="about" className="pt-3 ps-3">About the Developer</div>
                <div >

                </div>

            </div> */}
           
        </>
    );
}