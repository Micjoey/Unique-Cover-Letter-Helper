import React, { useState } from "react";
import { useForm } from "react-hook-form";
import jwt_decode from "jwt-decode";
import axios from 'axios'
;
import { useHistory } from "react-router-dom";
import { Container, Segment } from "semantic-ui-react";


export const JobForm = (props) => {
    const history = useHistory()
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'))
    let job = null
    const requestType = props.requestType
    const userId = jwt_decode(accessToken).user_id
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
    const { register, errors, handleSubmit} = useForm({
        // defaultValues: {
        //     job_posting_website: "LinkedIn",
        //     top_skills: "Dynamic and accomplished Software Engineer with experience and expertise in ",
        //     bullet_point_one: "Over the last five years, I have worked in multiple team-based, customer-oriented, professional roles.",
        //     bullet_point_two: "For sixteen years on competitive soccer teams, I practiced the art of communicating in a fast moving environment, including four years of college D3 soccer. ",
        //     bullet_point_three: "My passion for competitive soccer has taught me to learn from my mistakes using constructive feedback to improve future action.",
        //     bullet_point_four: "I continually strive for opportunities to improve my skills and have the opportunity to problem-solve.",
        //     bullet_point_five: "A passion for reading books on communication, relationship building, and leadership allow me to learn continually.",
        //     job_stage: jobStage,
        //     template_choices: templateChoices,
        // }
    })

    const onSubmit = (data) => {
        axios.defaults.headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        switch (requestType) {
            case 'post':
                axios.post('/api/jobs/', data)
                    .then(res => history.push(`/job/${res.data.id}`, {...res.data.id}))
                    .catch(errors => console.log(errors))
                break
            case 'put':
                axios.put(`/api/jobs/${jobID}`, {...data,jobID})
                    .then(() => window.location.reload())
                    .catch(errors => console.log(errors))
                break
            default:
                history.push('/login/')
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
            <Container>
                <Segment inverted>

                    <div className="update-job-form">
                        <h1 className="form-title">Update Job Info</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label className="list-form-field">
                                <p>Template Choices: </p>
                                <select style={{ color: 'Red' }} name="template_choices" ref={register} style={{ display: 'flex', margin: '0em 1em' }}>
                                    {Object.keys(template_choices).map((key, idx)=> (
                                        <option value={key} key={idx } name={template_choices[key]}> {template_choices[key]} </option>
                                    ))}
                                </select>
                            </label>
                            <label className="list-form-field">
                                <p>Job Stage: </p>
                                <select style={{ color: 'black' }} name="job_stage" ref={register} style={{ display: 'flex', margin: '0em 1em' }}>
                                    {Object.keys(job_stages).map((key, idx)=> (
                                        <option 
                                            defaultValue={job_stages[key]} 
                                            key={idx} 
                                            name={job_stages[key]}
                                        > {job_stages[key]} </option>
                                    ))}
                                </select>
                            </label>
                            <div className="list-form-field-with-margin">
                                <p className="required-field">*Job Posting Website: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Job Posting Website"}
                                    defaultValue={job.job_posting_website}
                                    name={"job_posting_website"}
                                    ref={register({ required: true })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.job_posting_website && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="required-field"> *Position Title: </p>
                                <input
                                    style={{ color: 'black' }}
                                    placeholder={"Position Title"}
                                    defaultValue={job.position_title}
                                    name={"position_title"}
                                    ref={register({ required: true })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.position_title && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="required-field">*Company: </p>
                                <input
                                    style={{ color: 'black' }}
                                    placeholder={"Company"}
                                    defaultValue={job.company}
                                    name={"company"}
                                    ref={register({ required: true })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.company && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">City: </p>
                                <input
                                    style={{ color: 'black' }}
                                    placeholder={"City"}
                                    defaultValue={job.city}
                                    name={"city"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.city && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="required-field">*Link: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Link"}
                                    defaultValue={job.link}
                                    name={"link"}
                                    ref={register({ required: true })}
                                    style={{ display: 'flex', margin: '0em 1em'}}
                                />
                                {errors.link && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Recruiter: </p>
                                <input
                                    style={{ color: 'black' }}
                                    placeholder={"Recruiter"}
                                    defaultValue={job.recruiter}
                                    name={"recruiter"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.recruiter && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Description: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Description"}
                                    defaultValue={job.description}
                                    name={"description"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.description && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Pre Bullet Point - Paragraph one: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Pre Bullet Point - Paragraph one"}
                                    defaultValue={job.pre_bullet_point_paragraph_one}
                                    name={"pre_bullet_point_paragraph_one"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.pre_bullet_point_paragraph_one && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Pre Bullet Point - Paragraph two: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Pre Bullet Point - Paragraph two"}
                                    name={"pre_bullet_point_paragraph_two"}
                                    defaultValue={job.pre_bullet_point_paragraph_two}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.pre_bullet_point_paragraph_two && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Top Skill: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Top Skill"}
                                    defaultValue={job.top_skills}
                                    name={"top_skills"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.top_skills && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Bullet Point One: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Bullet Point One"}
                                    defaultValue={job.bullet_point_one}
                                    name={"bullet_point_one"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.bullet_point_one && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Bullet Point Two: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Bullet Point Two"}
                                    defaultValue={job.bullet_point_two}
                                    name={"bullet_point_two"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.bullet_point_two && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Bullet Point Three: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Bullet Point Three"}
                                    defaultValue={job.bullet_point_three}
                                    name={"bullet_point_three"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.bullet_point_three && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Bullet Point Four: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Bullet Point Four"}
                                    defaultValue={job.bullet_point_four}
                                    name={"bullet_point_four"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.bullet_point_four && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Bullet Point Five: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Bullet Point Five"}
                                    defaultValue={job.bullet_point_five}
                                    name={"bullet_point_five"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.bullet_point_five && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Bullet Point Six: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Bullet Point Six"}
                                    defaultValue={job.bullet_point_six}
                                    name={"bullet_point_six"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.bullet_point_six && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Bullet Point Seven: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Bullet Point Seven"}
                                    defaultValue={job.bullet_point_seven}
                                    name={"bullet_point_seven"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.bullet_point_seven && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Bullet Point Eight: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Bullet Point Eight"}
                                    defaultValue={job.bullet_point_eight}
                                    name={"bullet_point_eight"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.bullet_point_eight && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Post Bullet Point - Paragraph one: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Post Bullet Point - Paragraph one"}
                                    defaultValue={job.post_bullet_point_paragraph_one}
                                    name={"post_bullet_point_paragraph_one"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.post_bullet_point_paragraph_one && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Post Bullet Point - Paragraph two: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Post Bullet Point - Paragraph two"}
                                    defaultValue={job.post_bullet_point_paragraph_two}
                                    name={"post_bullet_point_paragraph_two"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.post_bullet_point_paragraph_two && "Your input is required"}
                            </div>
                            <div>
                                <input
                                    type="hidden"
                                    style={{ color: 'black' }}
                                    placeholder={userId}
                                    name={"belongs_to_user"}
                                    defaultValue={userId}
                                    ref={register({ required: true })}
                                />
                            </div>
                            <input style={{ color: 'Black' }} type="submit" value={buttonTxt} className="form-button"/>
                        </form>
                    </div>
                </Segment>
            </Container>
        );
    } else {
        return (
            <Container>
                <Segment inverted>

                    <div className="create-job-form">
                        <h1 className="form-title">Create Cover Letter</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label className="list-form-field">
                                <p className="non-required-field">Template Choices: </p>
                                <select style={{ color: 'Red' }} name="template_choices" ref={register} style={{ display: 'flex', margin: '0em 1em' }}>
                                    {Object.keys(template_choices).map((key, idx) => (
                                        <option value={key} key={idx} name={template_choices[key]}> {template_choices[key]} </option>
                                    ))}
                                </select>
                            </label>
                            <label className="list-form-field">
                                <p className="non-required-field">Job Stage: </p>
                                <select style={{ color: 'black' }} name="job_stage" ref={register} style={{ display: 'flex', margin: '0em 1em' }}>
                                    {Object.keys(job_stages).map((key, idx) => (
                                        <option key={idx} name={job_stages[key]}> {job_stages[key]} </option>
                                    ))}
                                </select>
                            </label>
                            <div className="list-form-field-with-margin">
                                <p className="required-field">*Job Posting Website: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Job Posting Website"}
                                    name={"job_posting_website"}
                                    ref={register({ required: true })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.job_posting_website && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="required-field">*Position Title: </p>
                                <input
                                    style={{ color: 'black' }}
                                    placeholder={"Position Title"}
                                    name={"position_title"}
                                    ref={register({ required: true })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.position_title && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                {/* <p className="non-required-field">Choice of User: </p> */}
                                <input
                                    type="hidden"
                                    style={{ color: 'black' }}
                                    placeholder={userId}
                                    name={"belongs_to_user"}
                                    defaultValue={userId}
                                    ref={register({ required: true })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {/* {errors.choice_of_user && "Your input is required"} */}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="required-field">* Company: </p>
                                <input
                                    style={{ color: 'black' }}
                                    placeholder={"Company"}
                                    name={"company"}
                                    ref={register({ required: true })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.company && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">City: </p>
                                <input
                                    style={{ color: 'black' }}
                                    placeholder={"City"}
                                    name={"city"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.city && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="required-field">*Job Link: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Link"}
                                    name={"link"}
                                    ref={register({ required: true })}
                                    style={{ display: 'flex', margin: '0em 1em'}}
                                />
                                {errors.link && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Recruiter: </p>
                                <input
                                    style={{ color: 'black' }}
                                    placeholder={"Recruiter"}
                                    name={"recruiter"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.recruiter && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Description: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Description"}
                                    name={"description"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.description && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Pre Bullet Point - Paragraph one: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Pre Bullet Point - Paragraph one"}
                                    name={"pre_bullet_point_paragraph_one"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.pre_bullet_point_paragraph_one && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Pre Bullet Point - Paragraph two: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Pre Bullet Point - Paragraph two"}
                                    name={"pre_bullet_point_paragraph_two"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.pre_bullet_point_paragraph_two && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Top Skill: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Top Skill"}
                                    name={"top_skills"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.top_skills && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Bullet Point One: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Bullet Point One"}
                                    name={"bullet_point_one"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.bullet_point_one && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Bullet Point Two: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Bullet Point Two"}
                                    name={"bullet_point_two"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.bullet_point_two && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Bullet Point Three: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Bullet Point Three"}
                                    name={"bullet_point_three"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.bullet_point_three && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Bullet Point Four: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Bullet Point Four"}
                                    name={"bullet_point_four"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.bullet_point_four && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Bullet Point Five: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Bullet Point Five"}
                                    name={"bullet_point_five"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.bullet_point_five && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Bullet Point Six: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Bullet Point Six"}
                                    name={"bullet_point_six"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.bullet_point_six && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Bullet Point Seven: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Bullet Point Seven"}
                                    name={"bullet_point_seven"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.bullet_point_seven && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Bullet Point Eight: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Bullet Point Eight"}
                                    name={"bullet_point_eight"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.bullet_point_eight && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Post Bullet Point - Paragraph one: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Post Bullet Point - Paragraph one"}
                                    name={"post_bullet_point_paragraph_one"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.post_bullet_point_paragraph_one && "Your input is required"}
                            </div>
                            <div className="list-form-field-with-margin">
                                <p className="non-required-field">Post Bullet Point - Paragraph two: </p>
                                <textarea
                                    style={{ color: 'black' }}
                                    placeholder={"Post Bullet Point - Paragraph two"}
                                    name={"post_bullet_point_paragraph_two"}
                                    ref={register({ required: false })}
                                    style={{ display: 'flex', margin: '0em 1em' }}
                                />
                                {errors.post_bullet_point_paragraph_two && "Your input is required"}
                            </div>
                            <input style={{ color: 'Black' }} type="submit" value={buttonTxt} className="form-button" />
                        </form>
                    </div>
                </Segment>
            </Container>
        )
    }
}
