import React from "react";
import formattedData from "./formattedData";


const Jobs = props => {
    
    const jobDetail = props.jobDetail
    const jobDetailKeys = Object.keys(jobDetail)

    return (
        <div className="job-detail">
            <h1>Job Detail: </h1>
            <div>
                {jobDetailKeys.map(key => (
                    <div className="job-detail-container" key={`${key} - container`}>
                        <p key={key} className="job-info-field">{formattedData[key]}: </p>
                        <p className="job-info-data" key={`key value - ${key}`} key={`${key} - ${key}`}>{jobDetail[key]}</p> 
                    </div>
               ))}
            </div>
        </div>
    );
};


export default Jobs;



