import React, { useState, useEffect } from 'react'
import JobDetail from '../components/JobDetail'
import JobForm from '../components/JobForm'
import axios from 'axios'
import { useParams } from 'react-router'


const JobDetailView = (id) => {
    const [job, setjob] = useState([])
    const [loaded, setLoaded] = useState({ isLoaded: false })
    const paramsJobId = useParams().jobID
    useEffect(() => {
        axios.get(`http://127.0.0.1:3000/api/jobs/${paramsJobId}`)
            .then(res => {
                setjob(res.data)
            }).then(() => {
                setLoaded({ isLoaded: true })
            })
    }, [])

    if (loaded.isLoaded) {
        return (
            <div>
                <div>
                    <JobDetail jobDetail={job} />
                </div>
                <JobForm/>
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