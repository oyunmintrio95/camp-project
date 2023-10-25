import { useState } from "react";
import { Link } from "react-router-dom";

export default function ReviewCard({review, index, campsite}){
    const buttonStyle = {border: '1px solid rgb(95, 158, 160)', backgroundColor: 'white', color: 'rgb(95, 158, 160)'};

    return(
        <>
                <tr>
                        <td scope="row">{index}</td>
                        <td>{review.title}</td>
                        <td>{review.author}</td>
                        <td>{review.postDate}</td>
                        <td><Link className="btn" style={buttonStyle}  to={`/review/detail/${review.reviewId}`} state={campsite}>Detail</Link></td>
                </tr>
           
            
        </>
    );

}