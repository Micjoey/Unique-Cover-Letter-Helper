import React from "react";
import {formattedJobData} from "./formattedData";
import {Link} from 'react-router-dom'
import {
    Header, Container, Segment, 
} from 'semantic-ui-react'

import axios from 'axios'
import { confirmAlert, alert } from 'react-confirm-alert'; 
import { useForm } from "react-hook-form";



const Jobs = props => {
    const accessToken = props.accessToken
    const history = props.history
    const jobDetail = props.jobDetail
    const paramsJobId = jobDetail.id
    const jobDetailKeys = Object.keys(jobDetail)
    const { handleSubmit } = useForm()
    
    const onSubmit = () => {
        confirmAlert({
            title: `Confirm Delete `,
            message: `Are you sure you want to delete ${jobDetail.position_title} at ${jobDetail.company}?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.defaults.headers = {
                            "Content-type": "application/json",
                            Authorization: `Bearer ${accessToken}`
                        }
                        axios.delete(`/api/jobs/${paramsJobId}/`, { ...paramsJobId })
                            .then(() => history.push('/all-jobs'))
                            .catch(error => {
                                // console.log(error)
                            })
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    }
    return (
        <Container className="job-detail">
            <Segment>

                <Header
                    as='h1'
                    // inverted
                    content='Job Detail'
                    // inverted
                    style={{
                        fontSize: '2em',
                        // fontWeight: 'normal',
                        // marginBottom: 0,
                        // marginTop: '.5em',
                    }}
                    textAlign="center"
                />
            </Segment>
            <Segment>
                {dataFields(jobDetail, jobDetailKeys)}
                {/* {jobDetailKeys.map(key => (
                    <div className="job-detail-container" key={`${key} - container`}>
                        {formattedJobData[key] !== 'Id' && formattedJobData[key] !== 'Job Link' ? <p key={`${key}`} className="job-info-field">{formattedJobData[key]}: </p> : null }
                        {formattedJobData[key] !== 'Id' && formattedJobData[key] !== 'Job Link' ? <p className="job-info-data" key={`key value - ${key}`} key={`${key} - ${key}`}>{jobDetail[key]}</p> : null }
                        {formattedJobData[key] === 'Job Link' ? <p key={`${key} + 1`} className="job-info-field">{formattedJobData[key]}: </p> : null }
                        {formattedJobData[key] === 'Job Link' ? <p><Link to={jobDetail[key]} className="job-info-data" key={`key value - ${key} + 1`} key={`${key} - ${key}`}>{jobDetail[key]}</Link></p> : null }
                    </div>
               ))} */}
            </Segment>
            <form onSubmit={handleSubmit(onSubmit)} className="delete-button">
                <button className="btn-warning" type="submit">Delete</button>
            </form>
        </Container>
    );
};


export default Jobs;



const dataFields = (jobDetail, jobDetailKeys) => {
    console.log(jobDetail, jobDetailKeys)
   const jobDetailMap = jobDetailKeys.map(key => {
        if (jobDetail[key] !== '') {
            if (key !== 'id' && formattedJobData[key] !== 'Job Link' && key !== 'belongs_to_user') {
                console.log("hit in here")
                return (
                    <div className="job-detail-container" key={`${key} - container`}>
                        <p key={`${key}`} className="job-info-field">{formattedJobData[key]}: </p>
                        <p className="job-info-data" key={`key value - ${key}`} key={`${key} - ${key}`}>{jobDetail[key]}</p>
                    </div>
                )
            } else if (formattedJobData[key] === 'Job Link') {
                return (
                    <div className="job-detail-container" key={`${key} - container`}>
                        <p key={`${key} + 1`} className="job-info-field">{formattedJobData[key]}: </p>
                        <p><Link to={jobDetail[key]} className="job-info-data" key={`key value - ${key} + 1`} key={`${key} - ${key}`}>{jobDetail[key]}</Link></p>
                    </div>
                )
            }
        }
    })
    return (
        jobDetailMap
    )
}