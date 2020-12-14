import React, { useState, useEffect } from 'react'
import JobDetail from '../../components/jobInfo/JobDetail'
import axios from 'axios'

import { useHistory, useParams } from 'react-router'

import { alert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import CoverLetterChoiceContainer from '../cover_letters/CoverLetterDisplayContainer'
import { UpdateJobForm } from '../../components/cover_letter/UpdateCoverLetter'
import { Button, Container, Segment, SegmentGroup } from 'semantic-ui-react'
import { loadingPageInverted } from '../../components/LoadingPage';



const JobDetailView = () => {
    const [job, setJob] = useState([])
    const [userId, setUserId] = useState([])
    const [loaded, setLoaded] = useState({ isLoaded: false })
    const [accessToken] = useState(localStorage.getItem('access_token'))
    const paramsJobId = useParams().jobID
    const history = useHistory()
    useEffect(() => {
        axios.defaults.headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        axios.get(`/api/jobs/${paramsJobId}/`)
            .then(res => {
                setJob(res.data)
                setUserId(res.data.belongs_to_user)
            }).then(() => {
                setLoaded({ isLoaded: true })
            })
            .catch(error => {
                setLoaded({isLoaded: false})
                alert(error)
                history.push('/login')
            })
    }, [])

    

    if (loaded.isLoaded) {
        return (
            <Container>
                <Segment className="hide-buttons" inverted>
                    <Button 
                        id="job-update-button" 
                        onClick={() => reveal("update-job-container","job-update-button")}
                        >Show Update Job Form</Button>
                    <Button 
                        id="cover-letter-button" 
                        onClick={() => reveal('cover-letter-container', "cover-letter-button")}
                        >Hide Cover Letter</Button>
                    <Button 
                        id="job-details-button" 
                        onClick={() => reveal('job-and-cover-letter-container', "job-details-button")}
                        >Show Job Details</Button>
                </Segment>
                <Container className="job-container">
                    <SegmentGroup>
                        <Segment className="job-and-cover-letter-container" inverted>
                            <JobDetail jobDetail={job} userId={userId} accessToken={accessToken} history={history}/>
                        </Segment>
                        <Segment className="cover-letter-container" id="cover-letter-choice" inverted>
                            <CoverLetterChoiceContainer job={job} userId={userId} inverted/>
                        </Segment>
                        <Segment className="update-job-container" inverted>
                            <UpdateJobForm job={job} userId={userId} setJob={setJob} />
                        </Segment>
                    </SegmentGroup>
                </Container>
            </Container>

        )
    } else {
        return (
            loadingPageInverted()
        )
    }

}

export default JobDetailView


const reveal = (divToHide, button) => {
    const div = document.getElementsByClassName(divToHide)[0]
    const buttonToChange = document.getElementById(button)
    const coverLetter = document.getElementsByClassName("cover-letter-container")[0]
    const jobDetail = document.getElementsByClassName("job-and-cover-letter-container")[0]
    const jobDetailButton = document.getElementById("job-details-button")
    const coverLetterButton = document.getElementById("cover-letter-button")

    div.style.display === '' || div.style.display === 'none' ? div.style.display = 'block' : div.style.display = 'none'
    
    // if (coverLetter.style.display === 'none' && jobDetail.style.display === 'none' && div.style.display === 'none') {
    //     coverLetter.style.display = 'block'
    // } else if (coverLetter.style.display === '' && jobDetail.style.display === '' && div.style.display === '') {
    //     coverLetter.style.display = 'block'
    // } 
    
    
    if (div.style.display !== 'block') {
        buttonToChange.innerText = buttonToChange.innerText.replace("Show", "Hide")
    } else {
        buttonToChange.innerText = buttonToChange.innerText.replace("Hide", "Show")
    }

    let buttonTxt = document.getElementById(button)
    if (buttonTxt.innerText.includes("Hide")) {
        buttonTxt.innerText = buttonTxt.innerText.replace("Hide", "Show")
        buttonTxt.style.backgroundColor = "#e0e1e2"
    } else {
        buttonTxt.innerText = buttonTxt.innerText.replace("Show", "Hide")
        buttonTxt.style.backgroundColor = "grey"
        
    }
    if (jobDetailButton.innerText.includes('Show') && coverLetterButton.innerText.includes('Show') && buttonToChange.innerText.includes('Show')) {
        coverLetter.style.display = 'block'
        if (coverLetterButton.innerText.includes("Hide")) {
            coverLetterButton.innerText = coverLetterButton.innerText.replace("Hide", "Show")
            coverLetterButton.style.backgroundColor = "#e0e1e2"
        } else {
            coverLetterButton.innerText = coverLetterButton.innerText.replace("Show", "Hide")
            coverLetterButton.style.backgroundColor = "grey"

        }
    }
}
