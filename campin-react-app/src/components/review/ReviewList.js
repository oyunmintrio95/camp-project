import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReviewCard from "./ReviewCard";

export default function ReviewList({locationId}){
    const [reviews, setReview] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/api/review/location/${locationId}`)
        .then(res => res.json())
        .then(data => setReview(data));
    },[]);

    

    return(
        <>
            {reviews.length > 0 ? (
                <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
                {reviews.map(review => {
                    return <ReviewCard review={review} key={review.reviewId}/>
                })}
            </div>
            ): (
                <div>No reviews yet. Add your Experience!</div>
            )}
        </>
    );
}