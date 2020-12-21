import React from "react";
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap'


const Jobs = props => {
    const allJobs = Object.values(props.jobs)
    
    return (
        <ListGroup className="standard-header">
           {allJobs.map(job => (
               <a href={`/job/${job.id}`} key={job.id}>
                   <ListGroup.Item style={{minHeight: "fit-content"}}>
                       {job.position_title} - {job.company}
                   </ListGroup.Item>
               </a>  
           ))}
        </ListGroup>
    );
};


export default Jobs;