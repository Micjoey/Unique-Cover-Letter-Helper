import React from "react";
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap'


const Jobs = props => {
    console.log(props)
    const allJobs = Object.values(props.jobs)

    return (
        <ListGroup>
           {allJobs.map(job => (
               <a href={`/jobs/${job.id}`} key={job.id}>
                   <ListGroup.Item>
                       {job.position_title} - {job.company}
                   </ListGroup.Item>
               </a>
                   
           ))}
        </ListGroup>
    );
};


export default Jobs;