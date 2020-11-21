import React from "react";
import { Link } from 'react-router-dom';



const Jobs = props => {
    const jobDetail = props.jobDetail
    const jobDetailKeys = Object.keys(jobDetail)

    return (
        <div>
            <h1>Job Detail: </h1>
            <div class="job-details">
                <p>Id - </p>
                <p>{jobDetail.id}</p>
            </div>
        </div>
    );
};


export default Jobs;