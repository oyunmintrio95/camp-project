import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReviewCard from "./ReviewCard";

import AuthContext from "../../context/AuthContext";

export default function ReviewList({locationId, campsite}){
    const [reviews, setReview] = useState([]);
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:8080/api/review/location/${locationId}`)
        .then(res => res.json())
        .then(data => setReview(data));
    },[]);

    let index = 0;

    return(
        <>

            {reviews.length > 0 ? (
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Username</th>
                            <th scope="col">Post Date</th>
                            <th scope="col">Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map(review => {
                            index += 1;
                            return <ReviewCard review={review} index={index} campsite={campsite} key={review.reviewId}/>
                })}
                    </tbody>
                </table>
                
            ): (
                <div>No reviews yet. Add your Experience!</div>
            )}
        </>
    );
}