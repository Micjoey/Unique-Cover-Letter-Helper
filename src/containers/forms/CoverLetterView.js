import React, { useEffect, useState, } from 'react'
import {  useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { JobForm } from '../../components/cover_letter/CoverLetterForm'
import { Grid, Header, Segment} from 'semantic-ui-react';
import { determineCoverLetter } from '../cover_letters/determineCoverLetterFormat';
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import rg4js from 'raygun4js';
import { loadingPage } from '../../components/LoadingPage'


const CoverLetterView = () => {
    const [user, setUser] = useState({})
    const accessToken = localStorage.getItem('access_token')
    const userId = accessToken !== null ? jwtDecode(accessToken).user_id : null
    const [loading, setLoading] = useState(false)
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
        setLoading(true)
        axios.defaults.headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        let userInfo = null
        let defaultInfo = null
        // if (userId) {
           userInfo = axios.get(`/api/users/${userId}/`)
                .then(resp => {
                    setLoading(true)
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
            defaultInfo = axios.get('/api/defaultInfo/')
                .then(resp => {
                    const formValues = resp.data.results[0]
                    const updatedFormVariables = Object.assign({}, formVariables, {...formValues})
                    setFormVariables(updatedFormVariables)
                })
                .catch(err => {
                })
        // }
        Promise.all([userInfo, defaultInfo]).then(() => setLoading(false))
    }, [])

    if (!loading) {
        return (
            <Segment placeholder padded="very">
                { !user.first_name && !loading ?
                    <Segment>
                        {user.first_name}
                        <Header>
                            You are missing crucial information! Please navigate to your user profile and fill in at the minimum your first and last name.
                        </Header>
                        <p>
                            <Link to="/user-admin/">Please click here - Account Dashboard</Link> - Then navigate to change account info and update information.
                        </p>
                    </Segment> 
                : null
                }
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
    } else {
        return (
            loadingPage
        )
    }
}

export default CoverLetterView
