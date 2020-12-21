import React, {useState, useEffect} from 'react'
import axios from 'axios'


import Jobs from '../../components/jobInfo/AllJobs'
import Pagination from '../../components/pagination/Pagination'
import * as actions from '../../store/actions/Auth'
import {
    Container,
    Form,
    Grid,
    Header,
    Input,
    Label,
    Segment,
} from 'semantic-ui-react'
import { useSelector } from 'react-redux';
import CoverLetterView from '../forms/CoverLetterView';
import { loadingPageInverted } from '../../components/LoadingPage';
import { searchBar } from './searchBar'
import { useForm } from 'react-hook-form'


const JobList = () => {
    
    const [accessToken] = useState(localStorage.getItem('access_token'))
    const [allJobs, setAllJobs] = useState([])
    const [next, setNext] = useState([])
    const [searchString, setString] = useState("")
    const [onPrevious, setOnPrevious] = useState([])
    const [loaded, setLoaded] = useState({isLoaded: false})
    const [pageIndex, setPageIndex] = useState(1)
    const [count, setCount] = useState(0)
    const { handleSubmit } = useForm({
        reValidateMode: 'onChange'
    })

    const handleChange =( e, { name, value }) => {
        searchBar(value, allJobs, setAllJobs)
    }
    const props = useSelector(state => (
        {
            ...state,
            isAuthenticated: localStorage.getItem('access_token') !== null,
            loading: state.loading,
            error: state.error
        }))

    useEffect(() => {

        axios.defaults.headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        axios.get("/api/jobs/")
        .then( res => {
            setAllJobs(res.data.results)
            return res
        })
        .then(response => {
            setAllJobs(response.data.results)
            setNext(response.data.next)
            setCount(response.data.count)
            setOnPrevious(response.data.previous)
        })
        .then(() => {
            setLoaded({isLoaded: true})
        })
        .catch(err => {
            actions.authCheckState()
        })
    }, [accessToken])
    if (loaded.isLoaded && !props.loading && allJobs) {
        if (allJobs.length) {
            return (
                <Container>
                    <Segment>
                        <Segment raised primary={true}>
                            <Form className="search-bar-form">
                                <Label as='h1' color='blue'>
                                    Search Bar
                                </Label>
                                <Form.Input 
                                    type="text"
                                    placeholder="Search by Company, Name, Status"
                                    onChange={handleChange}
                                    className="search-bar-input"
                                >
                                </Form.Input>
                            </Form>
                        </Segment>
                        <Segment className="standard-header" secondary>
                            <Header
                                as='h1'
                                content='All Jobs'
                                className="all-jobs-header"
                            />
                            <Jobs jobs={allJobs} />
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
                <Container>
                    <Segment>
                        <Header
                            as="h1"
                            content="You haven't applied to any jobs yet!"
                        />
                    </Segment>
                    <CoverLetterView/>
                </Container>
            )
        }
    } else {
        return (
            loadingPageInverted()
        )
    }

}

export default JobList