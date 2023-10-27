import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

import MyFavorites from "./MyFavorites";

import '../../css/mypage.css';

export default function MypageMain(){
    const {user} = useContext(AuthContext);

    return(
        <>
            {user&&
                <div className="container">
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
                     <MyFavorites />
                 </div>
                 
             </div>
            }
        </>
        
        
    );
}