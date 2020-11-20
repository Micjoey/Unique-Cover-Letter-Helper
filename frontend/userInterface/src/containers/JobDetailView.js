import React, { useState, useEffect } from 'react'
import Jobs from '../components/Jobs'
import axios from 'axios'


const JobDetailView = (id) => {
    const [job, setjob] = useState([])
    const [loaded, setLoaded] = useState({ isLoaded: false })

    useEffect(() => {
        const jobId = this.props.match.params.jobID
        axios.get(`http://127.0.0.1:3000/api/jobs/${jobId}`)
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