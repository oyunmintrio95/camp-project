import { useState, useContext, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";


export default function ReviewDetail(){
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const campsite = location.state;
    const [review, setReview] = useState(null);
    const { reviewId } = useParams();
    const navigate = useNavigate();


    const button1 = {border: '1px solid rgb(95, 158, 160)', backgroundColor: 'white', color: 'rgb(95, 158, 160)'};
    const button2 = {backgroundColor: 'rgb(95, 158, 160)', color: 'white'};

    useEffect(() => {
        fetch("http://localhost:8080/api/review/"+reviewId)
        .then(res => res.json())
        .then(setReview)
        .catch(error => {
            //navigate to camp detail page
            navigate("/campsite")
        })

    },[]);

    return(
        <>
             {
                 user && (
                    review &&(
                        user.userId === review.appUserId&&
                    <div className="d-flex justify-content-end">
                        <div className="me-3">
                            <Link className="btn" style={button1}  to={`/review/edit/${reviewId}`} state={campsite}>Edit</Link>
                        </div>
                        <div>
                            <Link className="btn" style={button2}  to={`/review/delete/${reviewId}`} >Delete</Link>
                        </div>
                </div>
                    )
                )
            }
            
        </>
    );
    
}