import React from 'react'
import { JobForm } from '../../components/job_componenets/JobForm'


const CoverLetterView = () => {
    const paramsJobId = null
    return (
        <div>
            <h1>Cover Letter Form</h1>
            <JobForm requestType="post" jobID={paramsJobId} buttonTxt="Create Cover Letter"/>
        </div>
    )
}

export default CoverLetterView