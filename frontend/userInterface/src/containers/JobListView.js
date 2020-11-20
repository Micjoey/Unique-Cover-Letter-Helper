import React, {useState, useEffect} from 'react'
import Jobs from '../components/Job'
import axios from 'axios'


const JobList = () => {
    const [allJobs, setAllJobs] = useState([])
    const [loaded, setLoaded] = useState({isLoaded: false})

    useEffect(() => {
        axios.get('http://127.0.0.1:3000/api/jobs/')
        .then( res => {
            setAllJobs(res.data)
        }).then(() => {
            setLoaded({isLoaded: true})
        })
    }, [])

    if (loaded.isLoaded) {
        return (
            <div>
                <h1>It is Working!</h1>
                <div>
                    <Jobs jobs={allJobs}/>
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