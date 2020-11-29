import React from "react";
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap'


const Jobs = props => {
    const allJobs = Object.values(props.jobs)
    
    return (
        <ListGroup>
           {allJobs.map(job => (
               <a href={`/job/${job.id}`} key={job.id}>
                   <ListGroup.Item>
                       {job.position_title} - {job.company}
                   </ListGroup.Item>
               </a>  
           ))}
        </ListGroup>
    );
};


export default Jobs;