import React, { useState, useEffect } from 'react'
import JobDetail from '../components/JobDetail'

import axios from 'axios'


const JobDetailView = (id) => {
    const [job, setjob] = useState([])
    const [loaded, setLoaded] = useState({ isLoaded: false })

    useEffect(() => {
        axios.get(`http://127.0.0.1:3000/api/jobs/1`)
            .then(res => {
                setjob(res.data)
            }).then(() => {
                setLoaded({ isLoaded: true })
            })
    }, [])

    if (loaded.isLoaded) {
        return (
            <div>
                <h1>heyya</h1>
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