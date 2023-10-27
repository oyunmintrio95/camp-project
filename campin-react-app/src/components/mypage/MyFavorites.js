import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import FavoriteCard from "./FavoriteCard";

export default function MyFavorites(){

    const {user} = useContext(AuthContext);
    const [myFavorites, setMyFavorites] = useState([]);

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

        if(user){
            fetch(`http://localhost:8080/api/favorite/user/${user.userId}`,init)
            .then(res => res.json())
            .then(setMyFavorites)
            .catch(error => {
                navigate("/error");
            })
        }

    },[])

    return(
        <>
            <h2 style={{fontWeight:500}}>My Favorites</h2>
            <div className ='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
                {myFavorites.length !==0 && (
                myFavorites.map(myFavorite => {
                    return <FavoriteCard myFavorite = {myFavorite} />
                })
                )}
            </div>
        </>
        
        
    );


}