import React from "react";
import {formattedJobData} from "./formattedData";
import {Link} from 'react-router-dom'
import {
    Form, Input, Message,
    Header, Button, Grid,
    Container, Segment, Menu,
    Table, Icon, Label, Tab
} from 'semantic-ui-react'

const Jobs = props => {
    
    const jobDetail = props.jobDetail
    const jobDetailKeys = Object.keys(jobDetail)

    return (
        <Container className="job-detail">
            <Header
                as='h1'
                inverted
                content='Job Detail'
                // inverted
                style={{
                    fontSize: '2em',
                    // fontWeight: 'normal',
                    // marginBottom: 0,
                    // marginTop: '.5em',
                }}
            />
            <Segment inverted>
                {jobDetailKeys.map(key => (
                    <div className="job-detail-container" key={`${key} - container`}>
                        {formattedJobData[key] !== 'Id' && formattedJobData[key] !== 'Job Link' ? <p key={`${key}`} className="job-info-field">{formattedJobData[key]}: </p> : null }
                        {formattedJobData[key] !== 'Id' && formattedJobData[key] !== 'Job Link' ? <p className="job-info-data" key={`key value - ${key}`} key={`${key} - ${key}`}>{jobDetail[key]}</p> : null }
                        {formattedJobData[key] === 'Job Link' ? <p key={`${key} + 1`} className="job-info-field">{formattedJobData[key]}: </p> : null }
                        {formattedJobData[key] === 'Job Link' ? <p><Link to={jobDetail[key]} className="job-info-data" key={`key value - ${key} + 1`} key={`${key} - ${key}`}>{jobDetail[key]}</Link></p> : null }
                    </div>
               ))}
            </Segment>
        </Container>
    );
};


export default Jobs;



