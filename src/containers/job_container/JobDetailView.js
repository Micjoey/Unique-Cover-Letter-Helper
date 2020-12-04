import React, { useState, useEffect } from 'react'
import JobDetail from '../../components/jobInfo/JobDetail'
import axios from 'axios'
import { useParams } from 'react-router'
import { useForm } from 'react-hook-form'
import { JobForm } from '../../components/cover_letter/CoverLetterForm'
import { confirmAlert, alert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import CoverLetterChoiceContainer from '../cover_letters/CoverLetterDisplayContainer'


const JobDetailView = () => {
    const [job, setjob] = useState([])
    const [userId, setUserId] = useState([])
    const [loaded, setLoaded] = useState({ isLoaded: false })
    const [accessToken] = useState(localStorage.getItem('access_token'))
    const { handleSubmit } = useForm()
    const paramsJobId = useParams().jobID

    useEffect(() => {
        axios.defaults.headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        axios.get(`http://127.0.0.1:3000/api/jobs/${paramsJobId}`)
            .then(res => {
                setjob(res.data)
                setUserId(res.data.belongs_to_user)
            }).then(() => {
                setLoaded({ isLoaded: true })
            })
            .catch(error => {
                // history().push(window.location.href)
                setLoaded({isLoaded: false})
                alert(error)
                window.location.href = ('/login')
            })
    }, [])

    const onSubmit = () => {
        confirmAlert({
            title: `Confirm Delete `,
            message: 'Are you sure you want to delete ${job.position_title} at ${job.company}?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.defaults.headers = {
                            "Content-type": "application/json",
                            Authorization: `Bearer ${accessToken}`
                        }
                        axios.delete(`http://127.0.0.1:3000/api/jobs/${paramsJobId}/`)
                            .then(() => window.location.href = 'http://127.0.0.1:3001/all-jobs/')
                            .catch(error => console.log(error))
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    if (loaded.isLoaded) {
        return (
            <div>
                <div className="hide-buttons">
                    <button id="show-job-update-button" onClick={() => reveal('update-job-container', 'show-job-update-button')}>Show Update Form</button>
                    <button id="show-cover-letter-button" onClick={() => reveal('cover-letter-container', "show-cover-letter-button")}>Show Cover Letter</button>
                    <button id="hide-job-details-button" onClick={() => reveal('job-detail', "hide-job-details-button")}>Hide Job Details</button>
                </div>
                <div className="job-container">
                    <div className="job-and-cover-letter-container">
                        <div>
                            <JobDetail jobDetail={job} />
                            <form onSubmit={handleSubmit(onSubmit)} className="delete-button">
                                <button className="btn-warning" type="submit">Delete</button>
                            </form>

                        </div>
                        <div className="update-job-container">
                            <JobForm requestType="put" job={job} buttonTxt="Update" />
                        </div>
                    </div>
                    <div className="cover-letter-container" id="cover-letter-choice">
                        <CoverLetterChoiceContainer job={job} userId={userId} />
                    </div>
                    
                </div>
                {/* <div className="job-container">
                    
                </div> */}
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


const reveal = (divToHide, button) => {
    const div = document.getElementsByClassName(divToHide)[0]
    if (divToHide !== "job-detail") {
        div.style.display === '' ? div.style.display = 'block' : div.style.display = ''
    } else {
        div.style.display === 'none' ? div.style.display = 'block' : div.style.display = 'none'
    } 


    let buttonTxt = document.getElementById(button)
    if (buttonTxt.innerText.includes("Hide")) {
        buttonTxt.innerText = buttonTxt.innerText.replace("Hide", "Show")
    } else {
        buttonTxt.innerText = buttonTxt.innerText.replace("Show", "Hide")
    }
}