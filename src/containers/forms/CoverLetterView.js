import React, { useEffect, useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { JobForm } from '../../components/cover_letter/CoverLetterForm'
import { Form, Grid, Header, Segment, Select } from 'semantic-ui-react';
import { determineCoverLetter } from '../cover_letters/determineCoverLetterFormat';
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import rg4js from 'raygun4js';
import { useForm } from "react-hook-form";

const CoverLetterView = () => {
    const [user, setUser] = useState({})
    const accessToken = localStorage.getItem('access_token')
    const userId = accessToken !== null ? jwtDecode(accessToken).user_id : null
    
    const [formVariables, setFormVariables] = useState({
        job_template_choices: "non-technical-cover-letter",
        recruiter: '',
        position_title: '',
        job_stage: 'Initial',
        company: '',
        job_posting_website: '',
        top_skills: '',
        city: '',
        link: '',
        description: '',
        pre_bullet_point_paragraph_one: '',
        pre_bullet_point_paragraph_two: '',
        top_skills: '',
        bullet_point_one: '',
        bullet_point_two: '',
        bullet_point_three: '',
        bullet_point_four: '',
        bullet_point_five: '',
        bullet_point_six: '',
        bullet_point_seven: '',
        bullet_point_eight: '',
        post_bullet_point_paragraph_one: '',
        post_bullet_point_paragraph_two: '',
        belongs_to_user: userId,
    })

    const props = useSelector(state => (
        {
            ...state, 
            isAuthenticated: state.token !== null,
            loading: state.loading,
            error: state.error
        }))

    useEffect(() => {
        props.loading = true
        axios.defaults.headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        if (userId) {
            axios.get(`/api/users/${userId}/`)
                .then(resp => {
                    setUser(resp.data)
                    rg4js('setUser', {
                        identifier: `${resp.data.username}`,
                        isAnonymous: false,
                        email: `${resp.data.email}`,
                        firstName: `${resp.data.first_name}`,
                        fullName: `${resp.data.first_name} ${resp.data.last_name}`
                    })
                    props.loading = false
                })
                .catch(err => {
                    // console.log(err)
                })
            axios.get('/api/defaultInfo/')
                .then(resp => {
                    const formValues = resp.data.results[0]
                    const updatedFormVariables = Object.assign({}, formVariables, {...formValues})
                    setFormVariables(updatedFormVariables)
                })
        }
    }, [])

    return (
        <Segment placeholder padded="very">
            <Grid columns={2} stackable>
                <Grid.Row>
                    <Grid.Column verticalAlign="left">
                        <Segment inverted >
                            <JobForm job={formVariables} setFormVariables={setFormVariables} user={user}/>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        {determineCoverLetter(
                                    formVariables.job_template_choices,
                                    formVariables,
                                    user)}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
}

export default CoverLetterView
