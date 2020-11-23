import React, { useState, useEffect } from 'react'
import { JobForm } from '../../components/job_componenets/JobForm'


const CreateCoverLetter = () => {
        return (
            <div>
                <h2>Create Job:</h2>
                <JobForm requestType="post" jobID={null} buttonTxt="Create"/>
            </div>
        )

}

export default CreateCoverLetter