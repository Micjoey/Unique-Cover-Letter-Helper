import React, {useState, useEffect} from 'react'
import Jobs from '../components/Job'
import axios from 'axios'


const JobList = () => {
    const [allJobs, setAllJobs] = useState([])
    const [loaded, setLoaded] = useState({isLoaded: false})

    useEffect(() => {
        axios.get('http://127.0.0.1:3000/api/jobs/')
        .then( res => {
            setAllJobs(res.data.results)
        }).then(() => {
            setLoaded({isLoaded: true})
        })
        // const fetchJobs = async () => {
        //     const result = await fetch('http://127.0.0.1:3000/api/jobs/')
        //     console.log(result)
        //     const body = await result.json();
        //     setAllJobs(body)
        //     setLoaded({isLoaded: true})
        // }
        // fetchJobs()
    }, [])

    if (loaded.isLoaded) {
        let jobKeys = Object.keys(allJobs)
        console.log(allJobs, jobKeys)
        return (
            <div>
                <h1>It is Working!</h1>
                <div>
                    {jobKeys.map(key => {
                        <li>
                            <h1>{allJobs[key]}</h1>
                        </li>
                    })}
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