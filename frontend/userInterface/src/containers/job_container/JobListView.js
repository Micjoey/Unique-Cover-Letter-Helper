import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Jobs from '../../components/job_componenets/AllJobs'


const JobList = () => {
    const [jobProps, setJobProps] = useState([])
    const [allJobs, setAllJobs] = useState([])
    const [next, setNext] = useState([])
    const [loaded, setLoaded] = useState({isLoaded: false})

    useEffect(() => {
        axios.get('http://127.0.0.1:3000/api/jobs/')
        .then( res => {
            if (res.data.results) {
                setAllJobs(res.data.results)
                setJobProps(res.data)
            } else {
                setAllJobs(res.data)
            }
            
        })
        .then(() => {
            setLoaded({isLoaded: true})
        })
    }, [])

    // nextPage = (pageNumber) => {
    // "http://127.0.0.1:3000/api/jobs/?limit=20&offset=20"
    // }

    if (loaded.isLoaded) {
        return (
            <div>
                <h1>All Jobs:</h1>
                <div>
                    <Jobs jobs={allJobs} jobProps={jobProps}/>
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

export default JobList