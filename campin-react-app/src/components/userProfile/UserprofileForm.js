import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function UserProfileForm(){

    const [userId, setUserId] = useState(0);
    const location2 = useLocation();
    const username = location2.state;

    useEffect(() => {
        fetch('http://localhost:8080/api/user'+username)
        .then(res => {
            if(res.ok){
                return res.json()
            }else{
                return Promise.reject(
                    new Error(`Unexpected status code ${res.status}`)
                    );
            }
        })
        .then(data => setUserId(data.userId))
        .catch(error => {
            console.error(error)
            navigate("/userprofile/add")
            
        })

    }, []);


    return(
        <div>
        This is userProfile form.
        {userId}
        </div>
    );
}