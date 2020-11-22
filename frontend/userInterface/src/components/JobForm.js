import React, { useState } from "react";
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
        
        console.log(data, requestType, jobID)
        switch (requestType) {
            case 'post':
                axios.post('http://127.0.0.1:3000/api/jobs/', {data})
                .then(res => console.log(res))
                .catch(error => console.log(error))
                
            case 'put':
                axios.put(`http//127.0.0.1:3000/api/jobs/${jobID}/`, {data})
                    .then(res => console.log(res))
                    .catch(error => console.log(error))
        }

    };
    // const onError = (errors, e) => console.log(errors, e);

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
        ["job_posting_website", "Job Posting Website", "text"],
        ["position_title", "Position Title", "text"],
        ["choice_of_user", "Choice of User", "text"],
        ["company", "Company", "text"],
        ["city", "City", "text"],
        ["link", "Link", "text"],
        ["recruiter", "Recruiter", "text"],
        ["description","Description", "textarea"],
        ["pre_bullet_point_paragraph_one", "Pre Bullet Point - Paragraph one", "textarea"],
        ["pre_bullet_point_paragraph_two", "Pre Bullet Point - Paragraph two", "textarea"],
        ["top_skills", "Top Skills", "textarea"],
        ["bullet_point_one","Bullet Point One", "textarea"],
        ["bullet_point_two","Bullet Point Two", "textarea"],
        ["bullet_point_three","Bullet Point Three", "textarea"],
        ["bullet_point_four","Bullet Point Four", "textarea"],
        ["bullet_point_five","Bullet Point Five", "textarea"],
        ["bullet_point_six","Bullet Point Six", "textarea"],
        ["bullet_point_seven","Bullet Point Seven", "textarea"],
        ["bullet_point_eight","Bullet Point Eight", "textarea"],
        ["post_bullet_point_paragraph_one", "Post Bullet Point - Paragraph one", "textarea"],
        ["post_bullet_point_paragraph_two", "Post Bullet Point - Paragraph two", "textarea"],
    ]


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                <div style={{ display: 'flex' }}>
                    <p>Template Choices: </p>
                    <select style={{ color: 'Red' }} name="job_template_choices">
                        {Object.keys(template_choices).map((key, idx)=> (
                            <option value={key} key={idx}> {template_choices[key]} </option>
                        ))}
                    </select>
                </div>
            </label>
            <label>
                <div style={{ display: 'flex' }}>
                    <p>Job Stage: </p>
                    <select style={{ color: 'Red' }} name="job_template_choices">
                        {Object.keys(job_stages).map((key, idx)=> (
                            <option value={key} key={idx}> {job_stages[key]} </option>
                        ))}
                    </select>
                </div>
            </label>
            {form_fields.map((input_info, idx) => (
                <div style={{display: 'flex'}} key={idx}>
                    <h1>{input_info[1]}: </h1>
                    <textarea 
                        style={{ color: 'Red' }} 
                        type={input_info[3]}
                        placeholder={input_info[1]}
                        name={input_info[0]}
                        ref={register}
                        key={idx}
                    />
                </div>
            ))}
            
            
            <input style={{ color: 'Black' }} type="submit" value={buttonTxt}/>
        </form>
    );
}