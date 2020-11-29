import React, { useState } from "react";
import { useForm } from "react-hook-form";
import jwt_decode from "jwt-decode";
import axios from 'axios';


export const JobForm = (props) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'))
    let job = null
    const requestType = props.requestType
    const userId = jwt_decode(accessToken).user_id
    console.log(userId)
    let jobID = null
    let jobStage = "Initial"
    let templateChoices = "non-technical-cover-letter"
    if (props.job) {
        job = props.job
        jobID = job.id
        jobStage = job.job_stage
        templateChoices = job.template_choices
    }
    const buttonTxt = props.buttonTxt
    const { register, errors, handleSubmit } = useForm({
        defaultValues: {
            job_posting_website: "LinkedIn",
            top_skills: "Dynamic and accomplished Software Engineer with experience and expertise in ",
            choice_of_user: 6,
            job_stage: jobStage,
            template_choices: templateChoices,
        }
    })

    const onSubmit = (data) => {
        console.log(data, accessToken)
        axios.defaults.headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        switch (requestType) {
            case 'post':
                axios.post('http://127.0.0.1:3000/api/userdetail/', data)
                    .then(res => window.location.href = `http://127.0.0.1:3001/userdetail/${res.data.id}`)
                    .catch(errors => console.log(errors))
                break
            case 'put':
                axios.put(`http://127.0.0.1:3000/api/userdetail/${jobID}/`, data)
                    .then(() => window.location.reload())
                    .catch(errors => console.log(errors))
                break
            default:
                break
        }

    };

    const template_choices = {
        'non-technical-cover-letter': 'Non-technical Cover Letter',
        'Standard Job Template': 'Standard Job Template',
        'Triplebyte (message-version)': 'Triplebyte (message-version)',
        'cover-letter-4': 'Template 4',
        'cover-letter-5': 'Template 5',
    }

    const job_stages = {
        'Initial': 'Initial',
        'Active': 'Active',
        'Accepted': 'Accepted',
        'Rejected': 'Rejected',
        'No Response': 'No Response',
    }

    if (job) {
        return (
            <div className="update-job-form">
                <h1 className="form-title">Update Job Info</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-label-div">
                        <p className="form-label-title">Job Posting Website: </p>
                        <textarea
                            className="form-label-textarea"
                            placeholder={"Job Posting Website"}
                            defaultValue={job.job_posting_website}
                            name={"job_posting_website"}
                            ref={register({ required: true })}
                            style={{ display: 'flex', margin: '0em 1em' }}
                        />
                        {errors.job_posting_website && "Your input is required"}
                    </div>
                    
                    <input style={{ color: 'Black' }} type="submit" value={buttonTxt} className="form-button" />
                </form>
            </div>
        );
    } else {
        return (
            <div className="create-job-form">
                <h1 className="form-title">Create Cover Letter</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <input style={{ color: 'Black' }} type="submit" value={buttonTxt} className="form-button" />
                </form>

            </div>
        )
    }
}
