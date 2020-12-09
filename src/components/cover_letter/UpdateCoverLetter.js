import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Container, Form, Grid, Header, Input, Popup, Segment, Select } from "semantic-ui-react";


export const UpdateJobForm = (props) => {

    const job = props.job
    console.log(useHistory())
    const { register, handleSubmit } = useForm({
        reValidateMode: 'onChange'
    })
    const [accessToken] = useState(localStorage.getItem('access_token'))
    const handleChange = (e, { name, value }) => {
        props.setJob(prevState => ({
            ...prevState,
            [name]: value
        }));
    }


    const onSubmit = () => {
        axios.defaults.headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        axios.put(`/api/jobs/${job.id}`, job)
            .then(() => window.location.reload())
            .catch(errors => console.log(errors))
    };

    const job_template_choicess = [
        { key: 'non-technical-cover-letter', value: 'non-technical-cover-letter', text: 'Non-technical Cover Letter' },
        { key: 'Triplebyte (message-version)', value: 'Triplebyte (message-version)', text: 'Triplebyte (message-version)' },
        { key: 'Standard Job Template', value: 'Standard Job Template', text: 'Standard Job Template' },
        // 'cover-letter-4': 'Template 4',
        // 'cover-letter-5': 'Template 5',
    ]

    const job_stages = [
        { key: 'Initial', value: 'Initial', text: 'Initial' },
        { key: 'Accepted', value: 'Accepted', text: 'Accepted' },
        { key: 'Rejected', value: 'Rejected', text: 'Rejected' },
        { key: 'No Response', value: 'No Response', text: 'No Response' },

    ]

    return (
        <Container>
            <Segment inverted>
                <Form onSubmit={handleSubmit(onSubmit)} >
                    <Header
                        as='h3'
                        content='Update Cover Letter'
                        inverted
                        style={{
                            fontSize: '4em',
                            fontWeight: 'normal',
                        }}
                        textAlign="center"
                    />
                    <Form.Select
                        fluid
                        required
                        // placeholder={job.template_choices}
                        defaultValue={job.template_choices}
                        options={job_template_choicess}
                        name="job_template_choices"
                        onChange={handleChange}
                    />
                    <Form.Select
                        defaultValue={job.job_stage}
                        options={job_stages}
                        name="job_stage"
                        onChange={handleChange}
                    />
                    <Form.Input
                        type="text"
                        placeholder={job.position_title ? job.position_title : "**Position Title**"}
                        name="position_title"
                        onChange={handleChange}
                        required
                    />
                    <Form.Input
                        type="text"
                        placeholder={job.company ? job.company : "**Company Applying To**"}
                        name="company"
                        onChange={handleChange}
                        required
                    />
                    <Form.Input
                        type="text"
                        placeholder={job.recruiter ? job.recruiter : "Recruiter's Name"}
                        name="recruiter"
                        onChange={handleChange}
                    />
                    <Form.Input
                        type="url"
                        placeholder={job.link ? job.link : "**Link for Job Post**"}
                        name="link"
                        onChange={handleChange}
                        required
                    />
                    <Form.TextArea
                        type="text"
                        placeholder={job.description ? job.description : "Description of Job Post"}
                        name="description"
                        onChange={handleChange}
                    />
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                    <Popup
                                        content="This field fulfills the pre-bullet-point paragraph."
                                        trigger={
                                            <Form.TextArea
                                                placeholder={job.pre_bullet_point_paragraph_one ? job.pre_bullet_point_paragraph_one : `Unique Paragraph One `}
                                                name="pre_bullet_point_paragraph_one"
                                                onChange={handleChange} />
                                        } />
                            </Grid.Column>
                            <Grid.Column width={8}>
                                    <Popup
                                        content="This field fulfills the SECOND pre-bullet-point paragraph."
                                        trigger={
                                            <Form.TextArea
                                                placeholder={job.pre_bullet_point_paragraph_two ? job.pre_bullet_point_paragraph_two : `Unique Paragraph Two `}
                                                name="pre_bullet_point_paragraph_two"
                                                onChange={handleChange} />
                                        } />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                    <Popup
                                        content="Fill in the YOUR skills that match the JOBS description."
                                        trigger={
                                            <Form.TextArea
                                                placeholder={job.top_skills ? job.top_skills : `**Top skills related to job**`}
                                                name="top_skills"
                                                onChange={handleChange}
                                                required
                                            />
                                        } />
                            </Grid.Column>
                            <Grid.Column width={8}>
                                    <Form.TextArea
                                        placeholder={job.bullet_point_one ? job.bullet_point_one : `Second Bullet Point `}
                                        name="bullet_point_one"
                                        onChange={handleChange} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                    <Form.TextArea
                                        placeholder={job.bullet_point_two ? job.bullet_point_two : `Third Bullet Point `}
                                        name="bullet_point_two"
                                        onChange={handleChange} />
                            </Grid.Column>
                            <Grid.Column width={8}>
                                    <Form.TextArea
                                        placeholder={job.bullet_point_three ? job.bullet_point_three : `Fourth Bullet Point `}
                                        name="bullet_point_three"
                                        onChange={handleChange} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                    <Form.TextArea
                                        placeholder={job.bullet_point_five ? job.bullet_point_five : `Fifth Bullet Point `}
                                        name="bullet_point_five"
                                        onChange={handleChange} />
                            </Grid.Column>
                            <Grid.Column width={8}>
                                    <Form.TextArea
                                        placeholder={job.bullet_point_six ? job.bullet_point_six : `Sixth Bullet Point `}
                                        name="bullet_point_six"
                                        onChange={handleChange} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                    <Form.TextArea
                                        placeholder={job.bullet_point_seven ? job.bullet_point_seven : `Seventh Bullet Point `}
                                        name="bullet_point_seven"
                                        onChange={handleChange} />
                            </Grid.Column>
                            <Grid.Column width={8}>
                                    <Form.TextArea
                                        placeholder={job.bullet_point_eight ? job.bullet_point_eight : `Eigth Bullet Point `}
                                        name="bullet_point_eight"
                                        onChange={handleChange} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Form.Button primary content="Create Cover Letter" />
                </Form>
            </Segment>
        </Container>
    )
}

