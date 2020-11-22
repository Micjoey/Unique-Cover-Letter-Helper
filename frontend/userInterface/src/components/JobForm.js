import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function JobForm() {
    const { register, handleSubmit, } = useForm({
        defaultValues: {
            job_posting_website: "LinkedIn",
            top_skills: "Dynamic and accomplished Software Engineer with experience and expertise in "
        }
    })
    const [initialFormValue, setInitialFormValue] = useState({value: 'non-technical-cover-letter'})
    const onSubmit = data => console.log(data);

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
        ["company", "Position Title", "text"],
        ["city", "Position Title", "text"],
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
                <p>Template Choices</p>
                <select style={{ color: 'Red' }} name="job_template_choices">
                    {Object.keys(template_choices).map((key)=> (
                        <option value={key}> {template_choices[key]} </option>
                    ))}
                </select>
            </label>
            <label>
                <p>Job Stage</p>
                <select style={{ color: 'Red' }} name="job_template_choices">
                    {Object.keys(job_stages).map((key, idx)=> (
                        <option value={key} key={idx}> {job_stages[key]} </option>
                    ))}
                </select>
            </label>
            {form_fields.map((input_info, idx) => (
                <textarea 
                    style={{ color: 'Red' }} 
                    type={input_info[3]}
                    placeholder={input_info[1]}
                    name={input_info[0]}
                    ref={register}
                    key={idx}
                />
            ))}
            
            
            <input style={{ color: 'Red' }} type="submit" />
        </form>
    );
}