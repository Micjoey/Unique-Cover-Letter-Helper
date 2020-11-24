import React, { useState, useEffect } from 'react'
import JobDetail from '../../components/job_componenets/JobDetail'

import axios from 'axios'
import { useParams } from 'react-router'
import { useForm } from 'react-hook-form'
import { JobForm } from '../../components/cover_letter/CoverLetterForm'


const JobDetailView = () => {
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
                </div>
                <div>
                    <JobDetail jobDetail={job} />
                </div>
                <h2>Update Job:</h2>
                <JobForm requestType="put" job={job} buttonTxt="Update"/>
                
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