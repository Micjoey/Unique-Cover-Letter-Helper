import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Button, Container, Form, Grid, Header, Message, Popup, Segment } from "semantic-ui-react";
import { job_template_choices, job_stages } from "../FieldChoices";
import { confirmAlert } from "react-confirm-alert";


export const JobForm = (props) => {
    const job = props.job
    const history = useHistory()
    const [error, setError] = useState({})
    const { handleSubmit } = useForm({
        reValidateMode: 'onChange'
    })
    const [accessToken] = useState(localStorage.getItem('access_token'))
    const handleChange = (e, { name, value }) => {
        props.setFormVariables(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const areYouSure = () => {
        confirmAlert({
            title: `You sure?`,
            message: `If you leave now you will lose any information you have in your fields.
             You can also set your default values in your Account page in the top right.`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => history.push('/default-form-values/')
                }
                ,
                {
                    label: 'No',
                },
            ]
        })
    }
    
    const onSubmit = () => {
        axios.defaults.headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        if (!job.job_posting_website) {
            job.job_posting_website = job.company
        }


        axios.post('/api/jobs/', job)
            .then(res => history.push(`/job/${res.data.id}`, {...res.data.id}))
            .catch(error => 
                {   
                const errors = Object.values(error.response.data)
                let errorMessage = ""
                errors.map(eArray => {
                    eArray.map(e => {
                        if (e.includes("fields link, position_title, belongs_to_user")) {
                            setError("You have already applied to this job!")
                            return null
                        } else {
                            errorMessage += e
                            setError(errorMessage)
                            return null
                        }
                    })
                })
                // setError(errorMessage)
                }
            )
    };
    const specificDropDown = (nameOfDropdown, nameOfDropdownTwo = null) => {
        return job.template_choices === nameOfDropdown || job.template_choices === nameOfDropdownTwo
    }

        

    return (
        <Container>
            <Segment inverted>
                <Header
                    as='h3'
                    content='Create Cover Letter'
                    inverted
                    style={{
                        fontSize: '4em',
                        fontWeight: 'normal',
                    }}
                    textAlign="center"
                />
                <Button secondary onClick={() => areYouSure()}>Set Default Values</Button>
                <br/>
                <Form onSubmit={handleSubmit(onSubmit)} error={error.length > 0}>
                    
                    <Form.Select
                        fluid
                        required
                        placeholder="Choose Template" 
                        options={job_template_choices} 
                        name="template_choices"
                        onChange={handleChange}
                        defaultValue={job.template_choices}
                    />
                    <Form.Select 
                        placeholder="Choose Job Stage" 
                        options={job_stages}
                        name="job_stage"
                        onChange={handleChange}
                        defaultValue={job.job_stage}
                    />
                    <Form.Input 
                        type="text" 
                        placeholder={job.position_title ? job.position_title : "**Position Title**"}
                        name="position_title"
                        onChange={handleChange}
                        defaultValue={job.position_title}
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
                        placeholder={job.city ? job.city : "City"}
                        name="city"
                        defaultValue={job.city}
                        onChange={handleChange}
                    />
                    <Form.Input 
                        type="text" 
                        placeholder={job.recruiter ? job.recruiter : "Recruiter's Name"}
                        name="recruiter"
                        onChange={handleChange}
                    />
                    <Popup
                        content={`I.e LinkedIn or Google. It will default to ${job.company}.`}
                        trigger={
                        <Form.Input 
                            type="text" 
                            placeholder={job.job_posting_website ? job.job_posting_website : "**Hosting Website**"}
                            name="job_posting_website"
                            onChange={handleChange}
                            defaultValue={job.job_posting_website}
                            // required
                        />}
                    />
                    <Popup
                        content="Web Url link"
                        trigger={
                        <Form.Input 
                            type="text" 
                            placeholder={job.link ? job.link : "**Link for Job Post**"}
                            name="link"
                            onChange={handleChange}
                            required
                        />}
                    />
                    <Form.TextArea 
                        type="text" 
                        placeholder={job.description ? job.description : "Description of Job Post"}
                        name="description"
                        onChange={handleChange}
                    />
                    <Grid container columns="equal" padded="vertically" verticalAlign="middle" centered>
                        <Grid.Row>
                            {specificDropDown("Standard Job Template", "Triplebyte (message-version)") ?
                                <Grid.Column>
                                        <Popup
                                            content="This field fulfills the pre-bullet-point paragraph."
                                            trigger={
                                                <Form.TextArea
                                                    placeholder={job.pre_bullet_point_paragraph_one ? job.pre_bullet_point_paragraph_one : `Unique Paragraph One `}
                                                    name="pre_bullet_point_paragraph_one"
                                                    onChange={handleChange} 
                                                    defaultValue={job.pre_bullet_point_paragraph_one}
                                                />
                                            } />
                                </Grid.Column>
                                    :
                                    null
                                }
                            {specificDropDown("Standard Job Template", "Triplebyte (message-version)") && (job.pre_bullet_point_paragraph_one || job.pre_bullet_point_paragraph_two)  ?
                                <Grid.Column>
                                        <Popup
                                            content="This field fulfills the SECOND pre-bullet-point paragraph."
                                            trigger={
                                                <Form.TextArea
                                                    placeholder={job.pre_bullet_point_paragraph_two ? job.pre_bullet_point_paragraph_two : `Unique Paragraph Two `}
                                                    name="pre_bullet_point_paragraph_two"
                                                    onChange={handleChange} 
                                                    defaultValue={job.pre_bullet_point_paragraph_two}
                                                />
                                            } />
                                </Grid.Column>
                                    :
                                    null
                                }
                        </Grid.Row>
                        <Grid.Row>
                            {specificDropDown("Standard Job Template", "Triplebyte (message-version)") ?
                                <Grid.Column>
                                    <Popup
                                        content="Fill in the YOUR skills that match the JOBS description."
                                        trigger={
                                            <Form.TextArea
                                                placeholder={job.top_skills ? job.top_skills : `**Top skills related to job**`}
                                                name="top_skills"
                                                onChange={handleChange}
                                                defaultValue={job.top_skills}
                                                required
                                            />
                                        } />
                                </Grid.Column>
                                :
                                null
                            }
                            {specificDropDown("Standard Job Template", "Triplebyte (message-version)") && (job.top_skills || job.bullet_point_one) ?
                                <Grid.Column>
                                        <Form.TextArea
                                            placeholder={job.bullet_point_one ? job.bullet_point_one : `Second Bullet Point `}
                                            name="bullet_point_one"
                                            onChange={handleChange} 
                                            defaultValue={job.bullet_point_one}
                                        />
                                </Grid.Column>
                                :
                                null
                            }
                        </Grid.Row>
                        <Grid.Row>
                            {specificDropDown("Standard Job Template", "Triplebyte (message-version)") && (job.bullet_point_one || job.bullet_point_two)?
                                <Grid.Column>
                                        <Form.TextArea
                                            placeholder={job.bullet_point_two ? job.bullet_point_two : `Third Bullet Point `}
                                            name="bullet_point_two"
                                            onChange={handleChange} 
                                            defaultValue={job.bullet_point_two}
                                        />
                                </Grid.Column>
                                    :
                                    null
                                }
                                {specificDropDown("Standard Job Template", "Triplebyte (message-version)") && (job.bullet_point_two  || job.bullet_point_three)? 
                                <Grid.Column>
                                        <Form.TextArea
                                            placeholder={job.bullet_point_three ? job.bullet_point_three : `Fourth Bullet Point `}
                                            name="bullet_point_three"
                                            onChange={handleChange}
                                            defaultValue={job.bullet_point_three}
                                        /> 
                                </Grid.Column>
                                    :
                                    null
                                }
                        </Grid.Row>
                        <Grid.Row>
                            {specificDropDown("Standard Job Template", "Triplebyte (message-version)") && (job.bullet_point_three || job.bullet_point_four)?
                                <Grid.Column>
                                    <Form.TextArea
                                        placeholder={job.bullet_point_five ? job.bullet_point_four : `Fifth Bullet Point `}
                                        name="bullet_point_four"
                                        onChange={handleChange} 
                                        defaultValue={job.bullet_point_five}
                                    />
                                </Grid.Column>
                                :
                                null
                            }
                            {specificDropDown("Standard Job Template", "Triplebyte (message-version)") && (job.bullet_point_four || job.bullet_point_five) ?
                                <Grid.Column>
                                    <Form.TextArea
                                        placeholder={job.bullet_point_five ? job.bullet_point_five : `Sixth Bullet Point `}
                                        name="bullet_point_five"
                                        onChange={handleChange} 
                                        defaultValue={job.bullet_point_five}
                                    />
                                </Grid.Column>
                                :
                                null
                            }
                        </Grid.Row>
                        <Grid.Row>
                            {specificDropDown("Standard Job Template", "Triplebyte (message-version)") && (job.bullet_point_five || job.bullet_point_six) ?
                                <Grid.Column>
                                        <Form.TextArea
                                            placeholder={job.bullet_point_six ? job.bullet_point_six : `Seventh Bullet Point `}
                                            name="bullet_point_six"
                                            onChange={handleChange} 
                                            defaultValue={job.bullet_point_six}
                                        />
                                </Grid.Column>
                                :
                                null
                            }
                            {specificDropDown("Standard Job Template", "Triplebyte (message-version)") && (job.bullet_point_six || job.bullet_point_seven) ?
                                <Grid.Column>
                                    <Form.TextArea
                                        placeholder={job.bullet_point_seven ? job.bullet_point_seven : `Eigth Bullet Point `}
                                        name="bullet_point_seven"
                                        onChange={handleChange} 
                                        defaultValue={job.bullet_point_seven}
                                    />
                                </Grid.Column>
                                :
                                null
                            }
                        </Grid.Row>
                        <Grid.Row>
                            {specificDropDown("Standard Job Template", "Triplebyte (message-version)") && (job.bullet_point_seven || job.bullet_point_eight) ?
                                <Grid.Column>
                                        <Form.TextArea
                                            placeholder={job.bullet_point_eight ? job.bullet_point_eight : `Ninth Bullet Point `}
                                            name="bullet_point_eight"
                                            onChange={handleChange} 
                                            defaultValue={job.bullet_point_eight}
                                        />
                                </Grid.Column>
                                :
                                null
                            }

                        </Grid.Row>
                    </Grid>
                    {error.length && (<Message error heading="There was an error" content={error} />)}
                    <Form.Button primary content="Create Cover Letter"/>
                    
                </Form>
            </Segment>
        </Container>
    )
}

