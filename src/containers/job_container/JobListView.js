import React, {useState, useEffect} from 'react'
import axios from 'axios'

import { useHistory } from 'react-router-dom';

import Jobs from '../../components/jobInfo/AllJobs'
import Pagination from '../../components/pagination/Pagination'
import { JobForm } from '../../components/cover_letter/CoverLetterForm';

import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Segment,
    Sidebar,
    Visibility,
} from 'semantic-ui-react'


const JobList = () => {
    let history = useHistory()

    const [accessToken] = useState(localStorage.getItem('access_token'))
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
            Authorization: `Bearer ${accessToken}`
        }
        axios.get(`http://127.0.0.1:3000/api/jobs/`, )
        .then( res => {
            console.log(res)
            setAllJobs(res.data.results)
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
        .catch(err => {
            history.push('/login')
            alert(err)
        })
    }, [])
    
    if (loaded.isLoaded) {
        if (allJobs.length) {
            return (
                <Container>
                    <Segment>
                        <Header
                            as='h1'
                            content='All Jobs'
                            // inverted
                            style={{
                                fontSize: '2em',
                                // fontWeight: 'normal',
                                // marginBottom: 0,
                                // marginTop: '.5em',
                            }}
                        />
                        <Segment style={{fontSize: '2em'}}>
                            <Jobs jobs={allJobs} jobProps={jobProps} />
                        </Segment>
                        <Segment style={{ fontSize: '1em' }}>
                            <Pagination
                                pageIndex={pageIndex}
                                total={count}
                                perPage={20}
                                onNext={next}
                                onPrevious={onPrevious}
                                setAllJobs={setAllJobs}
                                setNext={setNext}
                                setOnPrevious={setOnPrevious}
                                setPageIndex={setPageIndex}
                            />
                        </Segment>
                    </Segment>
                </Container>
            )
        } else {
            return (
                <div>
                    <Container>
                        <Header 
                            as='h1'
                            content='No Cover Letters Exist'
                            // inverted
                            style={{
                                fontSize: '2em',
                                // fontWeight: 'normal',
                                // marginBottom: 0,
                                // marginTop: '.5em',
                            }}
                        />
                        <Header 
                            as='h3'
                            content='Please create one below:'
                            // inverted
                            style={{
                                fontSize: '2em',
                                // fontWeight: 'normal',
                                // marginBottom: 0,
                                // marginTop: '.5em',
                            }}
                        />
                        <Segment>
                            <JobForm requestType="post" jobID={null} buttonTxt="Create Cover Letter" />
                        </Segment>

                    </Container>


                </div>
            )
        }
    } else {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        )
    }

}

export default JobList