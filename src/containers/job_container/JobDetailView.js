import React, { useState, useEffect } from 'react'
import JobDetail from '../../components/jobInfo/JobDetail'
import axios from 'axios'

import { useHistory, useParams } from 'react-router'

import { alert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import CoverLetterChoiceContainer from '../cover_letters/CoverLetterDisplayContainer'
import { UpdateJobForm } from '../../components/cover_letter/UpdateCoverLetter'
import { Button, Container, Segment, SegmentGroup } from 'semantic-ui-react'



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
                        id="show-job-update-button" 
                        onClick={() => reveal("update-job-container","show-job-update-button")}
                        >Show Update Job Form</Button>
                    <Button 
                        id="show-cover-letter-button" 
                        onClick={() => reveal('cover-letter-container', "show-cover-letter-button")}
                        >Show Cover Letter</Button>
                    <Button 
                        id="hide-job-details-button" 
                        onClick={() => reveal('job-detail', "hide-job-details-button")}
                        >Hide Job Details</Button>
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
            <div>
                <h1>Loading</h1>
            </div>
        )
    }

}

export default JobDetailView


const reveal = (divToHide, button) => {
    const div = document.getElementsByClassName(divToHide)[0]
    const coverLetter = document.getElementsByClassName("cover-letter-container")[0]
    const coverLetterButton = document.getElementById("show-cover-letter-button")
    if (divToHide !== "job-detail") {
        div.style.display === '' ? div.style.display = 'block' : div.style.display = ''
        
    } else {
        div.style.display === 'none' ? div.style.display = 'block' : div.style.display = 'none'
        if (coverLetter.style.display === 'none' || coverLetter.style.display === '')  {
            coverLetter.style.display = 'block'
            coverLetterButton.innerText = coverLetterButton.innerText.replace("Show", "Hide")
        } else {
            coverLetter.style.display = ''
        }
    } 


    let buttonTxt = document.getElementById(button)
    if (buttonTxt.innerText.includes("Hide")) {
        buttonTxt.innerText = buttonTxt.innerText.replace("Hide", "Show")
        buttonTxt.style.backgroundColor = "#e0e1e2"
    } else {
        buttonTxt.innerText = buttonTxt.innerText.replace("Show", "Hide")
        buttonTxt.style.backgroundColor = "grey"
        
    }
}
