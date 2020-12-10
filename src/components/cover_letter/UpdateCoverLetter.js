import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Container, Form, Grid, Header, Input, Label, List, Popup, Segment, Select } from "semantic-ui-react";


export const UpdateJobForm = (props) => {

    const job = props.job
    const [updatedJob, updateJob] = useState(job)
    const { register, handleSubmit } = useForm({
        reValidateMode: 'onChange'
    })
    const [accessToken] = useState(localStorage.getItem('access_token'))
    const handleChange = (e, { name, value }) => {
        updateJob(prevState => ({
            ...prevState,
            [name]: value
        }));
    }


    const onSubmit = () => {
        axios.defaults.headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        axios.put(`/api/jobs/${job.id}/`, updatedJob)
            .then(() => window.location.reload())
            .catch(errors => 
                {
                    // console.log(errors)
                })
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
            <Segment inverted vertical>
                <List divided selection>
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
                    <List.Item>
                        <Label color="red" horizontal>Template Choice</Label>
                        <Form.Select
                            fluid
                            requiwhite
                            // defaultValue={job.template_choices}
                            defaultValue={job.template_choices}
                            options={job_template_choicess}
                            name="job_template_choices"
                            onChange={handleChange}
                        />
                    </List.Item>
                    <br/>
                    <List.Item>
                        <Label color="red" horizontal>Job Stage</Label>
                        <Form.Select
                            defaultValue={job.job_stage}
                            options={job_stages}
                            name="job_stage"
                            onChange={handleChange}
                        />
                    </List.Item>
                    <br />
                    <List.Item>
                        <Label color="red" horizontal>Position Title</Label>
                        <Form.Input
                            type="text"
                            defaultValue={job.position_title}
                            name="position_title"
                            onChange={handleChange}
                            required
                        />
                    </List.Item>
                    <br />
                    <List.Item>
                            <Label color="red" horizontal>Job Stage</Label>
                        <Form.Input
                            type="text"
                            defaultValue={job.company}
                            name="company"
                            onChange={handleChange}
                            required
                        />
                    </List.Item>
                    <br />
                    <List.Item>
                        <Label color="red" horizontal>Recruiter's Name</Label>
                        <Form.Input
                            placeholder="Recruiter's Name"
                            defaultValue={job.recruiter ? job.recruiter : ""}
                            name="recruiter"
                            onChange={handleChange}
                        />
                    </List.Item><br />
                        <List.Item>
                            <Label color="red" horizontal>Job Posting Website</Label>
                            <Form.Input
                                type="text"
                                defaultValue={job.job_posting_website}
                                name="link"
                                onChange={handleChange}
                                required
                            />
                        </List.Item><br />
                    <List.Item>
                        <Label color="red" horizontal>Url for Job Post</Label>
                        <Form.Input
                            type="url"
                            defaultValue={job.link}
                            name="link"
                            onChange={handleChange}
                            required
                        />
                    </List.Item><br />
                    
                    <List.Item>
                            <Label color="red" horizontal>Description of Job Post</Label>
                        <Form.TextArea
                            type="text"
                            placeholder="Description of Job Post"
                            defaultValue={job.description ? job.description : ""}
                            name="description"
                            onChange={handleChange}
                        />
                    </List.Item>
                    <Grid verticalAlign="middle">
                        <Grid.Row>
                            <Grid.Column width={8}>
                                    <br />
                                    <List.Item>
                                        <Label color="red" horizontal>First Custom Paragraph</Label>
                                        <Popup
                                            content="This field fulfills the pre-bullet-point paragraph."
                                            trigger={
                                                <Form.TextArea
                                                    placeholder='Unique Paragraph One'
                                                    defaultValue={job.pre_bullet_point_paragraph_one ? job.pre_bullet_point_paragraph_one : ``}
                                                    name="pre_bullet_point_paragraph_one"
                                                    onChange={handleChange} />
                                            } />
                                    </List.Item>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                    <br />
                                    <List.Item>
                                        <Label color="red" horizontal>Second Custom Paragraph</Label>
                                    <Popup
                                        content="This field fulfills the SECOND pre-bullet-point paragraph."
                                        trigger={
                                            <Form.TextArea
                                                placeholder="Unique Paragraph Two"
                                                defaultValue={job.pre_bullet_point_paragraph_two ? job.pre_bullet_point_paragraph_two : ``}
                                                name="pre_bullet_point_paragraph_two"
                                                onChange={handleChange} />
                                        } />
                                    </List.Item>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <br />
                                <List.Item>
                                        <Label color="red" horizontal>Top Skills</Label>
                                        <Popup
                                        content="Fill in the YOUR skills that match the JOBS description."
                                        trigger={
                                            <Form.TextArea
                                                placeholder="Top skills related to job"
                                                defaultValue={job.top_skills ? job.top_skills : ``}
                                                name="top_skills"
                                                onChange={handleChange}
                                            />
                                        } />
                                    </List.Item>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <br />
                                <List.Item>
                                        <Label color="red" horizontal>Second Bullet Point</Label>
                                    <Form.TextArea
                                        placeholder="Second Bullet Point "
                                        defaultValue={job.bullet_point_one ? job.bullet_point_one : ``}
                                        name="bullet_point_one"
                                        onChange={handleChange} />
                                </List.Item>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <br />
                                <List.Item>
                                        <Label color="red" horizontal>Third Bullet Point</Label>
                                    <Form.TextArea
                                        placeholder="Third Bullet Point "
                                        defaultValue={job.bullet_point_two ? job.bullet_point_two : ``}
                                        name="bullet_point_two"
                                        onChange={handleChange} />
                                </List.Item>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                    <br />
                                    <List.Item>
                                        <Label color="red" horizontal>Fourth Bullet Point</Label>
                                        <Form.TextArea
                                            placeholder="Fourth Bullet Point"
                                            defaultValue={job.bullet_point_three ? job.bullet_point_three : ``}
                                            name="bullet_point_three"
                                            onChange={handleChange} />
                                    </List.Item>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                    <br />
                                    <List.Item>
                                        <Label color="red" horizontal>Fifth Bullet Point</Label>
                                        <Form.TextArea
                                            placeholder="Fifth Bullet Point"
                                            defaultValue={job.bullet_point_five ? job.bullet_point_five : ``}
                                            name="bullet_point_five"
                                            onChange={handleChange} />
                                    </List.Item>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                    <br />
                                    <List.Item>
                                        <Label color="red" horizontal>Sixth Bullet Point</Label>
                                        <Form.TextArea
                                            placeholder="Sixth Bullet Point"
                                            defaultValue={job.bullet_point_six ? job.bullet_point_six : ``}
                                            name="bullet_point_six"
                                            onChange={handleChange} />
                                    </List.Item>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <br />
                                <List.Item>
                                        <Label color="red" horizontal>Seventh Bullet Point</Label>
                                    <Form.TextArea
                                        placeholder="Seventh Bullet Point"
                                        defaultValue={job.bullet_point_seven ? job.bullet_point_seven : ``}
                                        name="bullet_point_seven"
                                        onChange={handleChange} />
                                </List.Item>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <br />
                                <List.Item>
                                        <Label color="red" horizontal>Eigth Bullet Point</Label>
                                    <Form.TextArea
                                        placeholder="Eigth Bullet Point"
                                        defaultValue={job.bullet_point_eight ? job.bullet_point_eight : ``}
                                        name="bullet_point_eight"
                                        onChange={handleChange} />
                                </List.Item>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <br/>
                    <Form.Button primary content="Update Cover Letter" />
                </Form>
                </List>
            </Segment>
        </Container>
    )
}

