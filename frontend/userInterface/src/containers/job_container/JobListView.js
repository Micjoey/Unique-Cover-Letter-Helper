import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Jobs from '../../components/jobInfo/AllJobs'
import Pagination from '../../components/pagination/Pagination'



const JobList = () => {
    let history = useHistory()
    const props = useSelector(state => (
        {
            ...state,
            isAuthenticated: state.token !== null,
            loading: state.loading,
            error: state.error,
            token: state.token,
        }))
    const [response, setResponse] = useState({})
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'))
    const [jobProps, setJobProps] = useState([])
    const [allJobs, setAllJobs] = useState([])
    const [next, setNext] = useState([])
    const [onPrevious, setOnPrevious] = useState([])
    const [loaded, setLoaded] = useState({isLoaded: false})
    const [pageIndex, setPageIndex] = useState(1)
    const [count, setCount] = useState(0)



    useEffect(() => {
        axios.defaults.headers = {
            "Content-type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem('access_token')}`
            Authorization: `Bearer ${accessToken}`
        }
        axios.get(`http://127.0.0.1:3000/api/jobs/`, )
        .then( res => {
            console.log(res)
            return res
        })
        .then(response => {
            setAllJobs(response.data.results)
            setJobProps(response.data)
            setNext(response.data.next)
            setCount(response.data.count)
            setOnPrevious(response.data.previous)
        })
        .then(() => {
            setLoaded({isLoaded: true})
        })
    }, [])
    

    if (loaded.isLoaded) {

        return (
            <div>
                <h1>All Jobs:</h1>
                <div>
                    <Jobs jobs={allJobs} jobProps={jobProps}/>
                </div>
                <footer>
                    <Pagination 
                        pageIndex={pageIndex} 
                        total={count} 
                        perPage={20} 
                        onNext={next}
                        onPrevious={onPrevious}
                        setAllJobs={setAllJobs}
                        setNext = {setNext}
                        setOnPrevious={setOnPrevious}
                        setPageIndex={setPageIndex}
                    />
                </footer>
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