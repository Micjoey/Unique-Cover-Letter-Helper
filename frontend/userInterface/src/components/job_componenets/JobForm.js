import React  from "react";
import { useForm } from "react-hook-form";

import axios from 'axios';

export const JobForm = props => {
    const requestType = props.requestType
    const jobID = props.jobID
    const buttonTxt = props.buttonTxt
    const { register, handleSubmit} = useForm({
        defaultValues: {
            job_posting_website: "LinkedIn",
            top_skills: "Dynamic and accomplished Software Engineer with experience and expertise in ",
            link: "test",
            position_title: 'test title',
            choice_of_user: 6,
        }
    })

    
    const onSubmit = (data) => {
        switch (requestType) {
            case 'post':
                axios.post('http://127.0.0.1:3000/api/jobs/', data)
                .then(res => console.log(res))
                .then(() => window.location.reload())
                .catch(error => console.log(error))
                
            case 'put':
                console.log(jobID)
                axios.put(`http://127.0.0.1:3000/api/jobs/${jobID}/`, data)
                    .then(res => console.log(res))
                    .then(() => window.location.reload())
                    .catch(error => console.log(error))
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

    const form_fields = [
        ["job_posting_website", "Job Posting Website", true],
        ["position_title", "Position Title", true],
        ["choice_of_user", "Choice of User", false],
        ["company", "Company", true],
        ["city", "City", false],
        ["link", "Link", true],
        ["recruiter", "Recruiter", false],
        ["description","Description", false],
        ["pre_bullet_point_paragraph_one", "Pre Bullet Point - Paragraph one", false],
        ["pre_bullet_point_paragraph_two", "Pre Bullet Point - Paragraph two", false],
        ["top_skills", "Top Skills", false],
        ["bullet_point_one","Bullet Point One", false],
        ["bullet_point_two","Bullet Point Two", false],
        ["bullet_point_three","Bullet Point Three", false],
        ["bullet_point_four","Bullet Point Four", false],
        ["bullet_point_five","Bullet Point Five", false],
        ["bullet_point_six","Bullet Point Six", false],
        ["bullet_point_seven","Bullet Point Seven", false],
        ["bullet_point_eight","Bullet Point Eight", false],
        ["post_bullet_point_paragraph_one", "Post Bullet Point - Paragraph one", false],
        ["post_bullet_point_paragraph_two", "Post Bullet Point - Paragraph two", false],
    ]


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input style={{ color: 'Black' }} type="submit" value={buttonTxt} />
            <label style={{ display: 'flex' }}>
                    <p>Template Choices: </p>
                    <select style={{ color: 'Red' }} name="job_template_choices" ref={register}>
                        {Object.keys(template_choices).map((key, idx)=> (
                            <option value={key} key={idx} > {template_choices[key]} </option>
                        ))}
                    </select>
            </label>
            <label style={{ display: 'flex' }}>
                    <p>Job Stage: </p>
                    <select style={{ color: 'Red' }} name="job_stage" ref={register}>
                        {Object.keys(job_stages).map((key, idx)=> (
                            <option value={job_stages[key]} key={idx} > {job_stages[key]} </option>
                        ))}
                    </select>
            </label>
            {form_fields.map((input_info, idx) => (
                <div style={{display: 'flex'}} key={idx}>
                    <h1>{input_info[1]}: </h1>
                    <textarea 
                        style={{ color: 'Red' }} 
                        placeholder={input_info[1]}
                        name={input_info[0]}
                        ref={register({
                            required: input_info[3]
                        })}
                        key={idx}
                    />
                </div>
            ))}
            
            
            
        </form>
    );
}