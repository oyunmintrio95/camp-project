import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";

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
        <div>
            This is a home.
        </div>
    );
}