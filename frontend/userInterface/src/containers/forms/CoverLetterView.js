import React from 'react'
import { JobForm } from '../../components/cover_letter/CoverLetterForm'


const CoverLetterView = () => {
    const paramsJobId = null
    return (
        <div>
            <JobForm requestType="post" jobID={paramsJobId} buttonTxt="Create Cover Letter"/>
        </div>
    )
}

export default CoverLetterView