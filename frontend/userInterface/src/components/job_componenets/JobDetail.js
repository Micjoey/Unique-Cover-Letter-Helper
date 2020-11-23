import React from "react";
import { Link } from 'react-router-dom';



const Jobs = props => {
    
    const jobDetail = props.jobDetail
    const jobDetailKeys = Object.keys(jobDetail)

    return (
        <div>
            <h1>Job Detail: </h1>
            <div className="job-details">
                {jobDetailKeys.map(key => (
                   <h1 key={key}>{key} - {jobDetail[key]}</h1> 
               ))}
            </div>
        </div>
    );
};


export default Jobs;