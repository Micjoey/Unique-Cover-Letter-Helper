import React from "react";
import { Link } from 'react-router-dom';



const Jobs = props => {
    const allJobs = Object.values(props.jobs)
    return (
       <div>
           <h1>Should be listed below: </h1>
           {allJobs.map((job, idx) => (
               <a href={`/${job.id}`} >
                   <ul>
                       {job.position_title} - {job.company}
                   </ul>
               </a>
                   
           ))}
           {/* <h2>{props.jobs[0].id}</h2> */}
       </div>
    );
};


export default Jobs;