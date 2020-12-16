import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Form, Grid, Header, Popup, Segment } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { job_template_choices, job_stages } from "../FieldChoices";
import { confirmAlert } from 'react-confirm-alert'




const SetDefaultFormValue = props => {
    const [newValues, setNewValues] = useState({})
    const history = useHistory()
    const { handleSubmit } = useForm({
        reValidateMode: 'onChange'
    })

    const accessToken = props.accessToken

    const handleChange = (e, { name, value }) => {
        setNewValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const onSubmit = () => {
        axios.defaults.headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        if (newValues["id"] === undefined) {
            axios.post('/api/defaultInfo/', newValues)
                .then(resp => {
                    setNewValues(resp.data)
                    return resp.data
                })
                .then(data => {
                    const updatedUser = Object.assign({}, props.user, { default_info: data.id })
                    return updatedUser
                })
                .then(updatedUser => {
                    axios.defaults.headers = {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${accessToken}`
                    }
                    axios.patch(`/api/users/${props.user.id}/`, updatedUser)
                })
                .then(
                    confirmAlert({
                        title: `Success!`,
                        message: `You successfully set your default values, do you wish to create a new cover letter?`,
                        buttons: [
                            {
                                label: 'Yes',
                                onClick: () => history.push('/job/form/')
                            }
                            ,
                            {
                                label: 'Go To All Jobs',
                                onClick: () => { history.push('/all-jobs/') }
                            },
                            {
                                label: 'Go To Account Dashboard',
                                onClick: () => { history.push('/user-admin/') }
                            },
                            {
                                label: 'No',
                                onClick: () => { history.go(0) }
                            },
                        ]
                    })
                )
                .catch(errors => {
    
                    // {console.log(errors)}
                    }
                )
        } else {
            axios.patch(`/api/defaultInfo/${newValues.id}/`, newValues)
                .then(
                    confirmAlert({
                    title: `Success!`,
                    message: `You successfully set your default values, do you wish to create a new cover letter?`,
                    buttons: [
                                {
                                    label: 'Yes',
                                    onClick: () => history.push('/job/form/')
                                }
                                ,
                                {
                                    label: 'Go To All Jobs',
                                    onClick: () => { history.push('/all-jobs/') }
                                },
                                {
                                    label: 'Go To Account Dashboard',
                                    onClick: () => { history.push('/user-admin/') }
                                },
                                {
                                    label: 'No',
                                    onClick: () => { history.go(0) }
                                },
                            ]
                    })
                ).catch(errors => {
                    // {console.log(errors)}
                }
            )
        }
    };

    useEffect(() => {
        setNewValues(props.defaultInfo)
    }, [props.defaultInfo])

    return (
        <Container>
            <Segment inverted>
                <Form onSubmit={handleSubmit(onSubmit)} >
                    <Header
                        as='h3'
                        content='Default Form Values'
                        inverted
                        style={{
                            fontSize: '3em',
                            fontWeight: 'normal',
                        }}
                        textAlign="center"
                    />
                    <Form.Select
                        fluid
                        placeholder="Choose Template"
                        options={job_template_choices}
                        value={newValues.template_choices ? newValues.template_choices : ""}
                        name="template_choices"
                        onChange={handleChange}
                    />
                    <Form.Select
                        placeholder="Choose Job Stage"
                        options={job_stages}
                        value={newValues.job_stage ? newValues.job_stage : ""}
                        name="job_stage"
                        onChange={handleChange}
                    />

                    <Form.Input
                        type="text"
                        placeholder="Position Title"
                        name="position_title"
                        onChange={handleChange}
                        value={newValues.position_title ? newValues.position_title : ""}
                    />
                    <Form.Input
                        type="text"
                        placeholder="City"
                        name="city"
                        onChange={handleChange}
                        value={newValues.city ? newValues.city : ""}
                    />
                    
                    <Popup
                        content={`I.e LinkedIn or Google. It will default to the company
                         otherwise if no value is given in the form.`}
                        trigger={
                            <Form.Input
                                type="text"
                                placeholder="Hosting Website"
                                name="job_posting_website"
                                onChange={handleChange}
                                value={newValues.job_posting_website ? newValues.job_posting_website : ""}
                            />}
                    />
                    <Grid container columns="equal" padded="vertically" verticalAlign="middle" centered>
                        <Grid.Row>
                                <Grid.Column>
                                    <Popup
                                        content="This field fulfills the pre-bullet-point paragraph."
                                        trigger={
                                            <Form.TextArea
                                                placeholder="Unique Paragraph One"
                                                name="pre_bullet_point_paragraph_one"
                                                onChange={handleChange} 
                                                value={newValues.pre_bullet_point_paragraph_one ? newValues.pre_bullet_point_paragraph_one : ""}
                                            />
                                        } />
                                </Grid.Column>

                                <Grid.Column>
                                    <Popup
                                        content="This field fulfills the SECOND pre-bullet-point paragraph."
                                        trigger={
                                            <Form.TextArea
                                                placeholder="Unique Paragraph Two"
                                                name="pre_bullet_point_paragraph_two"
                                                onChange={handleChange} 
                                                value={newValues.pre_bullet_point_paragraph_two ? newValues.pre_bullet_point_paragraph_two : ""}
                                                />
                                        } />
                                </Grid.Column>

                        </Grid.Row>                       
                         <Grid.Row>
                                <Grid.Column>
                                    <Popup
                                        content="Fill in the YOUR skills that match the JOBS description."
                                        trigger={
                                            <Form.TextArea
                                                placeholder={`Top skills related to job`}
                                                name="top_skills"
                                                onChange={handleChange}
                                                value={newValues.top_skills ? newValues.top_skills : ""}
                                            />
                                        } />
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.TextArea                              
                                        placeholder={`Second Bullet Point `}
                                        name="bullet_point_one"
                                        onChange={handleChange} 
                                        value={newValues.bullet_point_one ? newValues.bullet_point_one : ""}
                                    />
                                </Grid.Column>

                        </Grid.Row>
                        <Grid.Row>

                                <Grid.Column>
                                    <Form.TextArea                                        
                                        placeholder={`Third Bullet Point `}
                                        name="bullet_point_two"
                                        onChange={handleChange} 
                                        value={newValues.bullet_point_two ? newValues.bullet_point_two : ""}
                                    />                   
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.TextArea
                                        placeholder={newValues.bullet_point_three ? newValues.bullet_point_three : `Fourth Bullet Point `}
                                        name="bullet_point_three"
                                        onChange={handleChange} />
                                </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>

                                <Grid.Column>
                                    <Form.TextArea
                                        placeholder={ `Fifth Bullet Point `}
                                        name="bullet_point_four"
                                        onChange={handleChange} 
                                        value={newValues.bullet_point_four ? newValues.bullet_point_four : ""}
                                    />
                                </Grid.Column>

                                <Grid.Column>
                                    <Form.TextArea
                                        placeholder={ `Sixth Bullet Point `}
                                        value={newValues.bullet_point_five ? newValues.bullet_point_five : ""}
                                        name="bullet_point_five"
                                        onChange={handleChange} 
                                    />
                                </Grid.Column>

                        </Grid.Row>
                        <Grid.Row>
                                <Grid.Column>
                                    <Form.TextArea
                                        placeholder={ `Seventh Bullet Point `}
                                        value={newValues.bullet_point_six ? newValues.bullet_point_six : ""}
                                        name="bullet_point_six"
                                        onChange={handleChange} 
                                    />
                                </Grid.Column>


                                <Grid.Column>
                                    <Form.TextArea                                        
                                        placeholder={ `Eigth Bullet Point `}
                                        value={newValues.bullet_point_seven ? newValues.bullet_point_seven : ""}
                                        name="bullet_point_seven"
                                        onChange={handleChange} 
                                    />
                                </Grid.Column>

                        </Grid.Row>
                    </Grid>
                    <Form.Button primary content="Set Default Values" />
                </Form>
            </Segment>
        </Container>
    )
}

export default SetDefaultFormValue