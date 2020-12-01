import React from "react";
import {formattedJobData} from "./formattedData";
import {Link} from 'react-router-dom'

const Jobs = props => {
    
    const jobDetail = props.jobDetail
    const jobDetailKeys = Object.keys(jobDetail)

    return (
        <div className="job-detail">
            <h1>Job Detail: </h1>
            <div>
                {jobDetailKeys.map(key => (
                    <div className="job-detail-container" key={`${key} - container`}>
                        {formattedJobData[key] !== 'Id' && formattedJobData[key] !== 'Job Link' ? <p key={`${key}`} className="job-info-field">{formattedJobData[key]}: </p> : null }
                        {formattedJobData[key] !== 'Id' && formattedJobData[key] !== 'Job Link' ? <p className="job-info-data" key={`key value - ${key}`} key={`${key} - ${key}`}>{jobDetail[key]}</p> : null }
                        {formattedJobData[key] === 'Job Link' ? <p key={`${key} + 1`} className="job-info-field">{formattedJobData[key]}: </p> : null }
                        {formattedJobData[key] === 'Job Link' ? <Link to={jobDetail[key]} className="job-info-data" key={`key value - ${key} + 1`} key={`${key} - ${key}`}>{jobDetail[key]}</Link> : null }
                    </div>
               ))}
            </div>
        </div>
    );
};


export default Jobs;



