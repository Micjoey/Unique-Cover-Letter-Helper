import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Jobs from '../../components/job_componenets/AllJobs'
import Pagination from '../../components/pagination/Pagination'


const JobList = () => {
    const [data, setData] = useState({})
    const [jobProps, setJobProps] = useState([])
    const [allJobs, setAllJobs] = useState([])
    const [next, setNext] = useState([])
    const [loaded, setLoaded] = useState({isLoaded: false})
    const [pageIndex, setPageIndex] = useState(1)
    const [count, setCount] = useState(0)

    useEffect(() => {
        axios.get('http://127.0.0.1:3000/api/jobs/')
        .then( res => {
            setAllJobs(res.data.results)
            setJobProps(res.data)
            setNext(res.data.next)
            setCount(res.data.count)
        })
        .then(() => {
            setLoaded({isLoaded: true})
        })
    }, [])

    if (loaded.isLoaded) {
        console.log(next, pageIndex, count)
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