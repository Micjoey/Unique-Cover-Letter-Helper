import React from 'react'
import { JobForm } from '../../components/cover_letter/CoverLetterForm'


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