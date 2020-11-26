import React, { useState, useEffect } from 'react'
import JobDetail from '../../components/jobInfo/JobDetail'
import axios from 'axios'
import { useParams } from 'react-router'
import { useForm } from 'react-hook-form'
import { JobForm } from '../../components/cover_letter/CoverLetterForm'
import CoverLetterContainer from '../cover_letters/CoverLetterContainer'


const JobDetailView = (props) => {
    
    const [job, setjob] = useState([])
    const [loaded, setLoaded] = useState({ isLoaded: false })
    const { handleSubmit } = useForm()
    const paramsJobId = useParams().jobID
    useEffect(() => {
        axios.get(`http://127.0.0.1:3000/api/jobs/${paramsJobId}`)
            .then(res => {
                setjob(res.data)
            }).then(() => {
                setLoaded({ isLoaded: true })
            })
    }, [])

    const onSubmit = () => {
        axios.delete(`http://127.0.0.1:3000/api/jobs/${paramsJobId}/`)
            .then(() => window.location.href = 'http://127.0.0.1:3001/api/jobs/')
            .catch(error => console.log(error))
    }

    if (loaded.isLoaded) {
        return (
            <div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <button className="btn-warning" type="submit">Delete</button>
                    </form>
                    <button id="show-job-update-button" onClick={() => reveal('update-job-container')}>Show Update Details Form</button>
                    <button id="show-cover-letter-button" onClick={() => reveal('cover-letter-container')}>Show Cover Letter</button>
                    <button id="hide-job-details-button" onClick={() => reveal('job-detail')}>Hide Job Details</button>
                </div>
                <div className="job-container">
                    <div>
                        <JobDetail jobDetail={job} />
                    </div>
                    <div>
                        <div className="update-job-container">
                            <JobForm requestType="put" job={job} buttonTxt="Update" />
                        </div>
                        <div className="cover-letter-container">
                            <CoverLetterContainer job={job}/>
                        </div>
                    </div>
                </div>
                
                
            </div>
        )
    } else {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        )
    }

}

export default JobDetailView


const reveal = (buttonType) => {
    let currentButton = document.getElementsByClassName(buttonType)[0]
    if (buttonType !== "job-detail") {
        currentButton.style.display === '' ? currentButton.style.display = 'block' : currentButton.style.display = ''
    } else {
        currentButton.style.display === 'none' ? currentButton.style.display = 'block' : currentButton.style.display = 'none'
    }
}