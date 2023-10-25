import { useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";

export default function ReviewDetail(){
    const location = useLocation();
    const campsite = location.state;
    const [review, setReview] = useState(null);
    const { reviewId } = useParams();


    const button1 = {border: '1px solid rgb(95, 158, 160)', backgroundColor: 'white', color: 'rgb(95, 158, 160)'};
    const button2 = {backgroundColor: 'rgb(95, 158, 160)', color: 'white'};


    return(
        <>
            <div className="row d-flex justify-content-end">
                <div className="col">
                    <Link className="btn" style={button1}  to={`/review/edit/${reviewId}`} state={campsite}>Edit</Link>
                </div>
                <div className="col">
                    <Link className="btn" style={button2}  to={`/review/delete/${reviewId}`} >Delete</Link>
                </div>
            </div>
        </>
    );
    
}