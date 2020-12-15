import React, { useEffect, useState } from 'react'
import axios from 'axios'
import rg4js from 'raygun4js';
import { useForm } from 'react-hook-form'
import { determineCoverLetter } from './determineCoverLetterFormat'
import { Link } from 'react-router-dom'
import { Container, Popup, Segment, SegmentGroup } from 'semantic-ui-react'



const CoverLetterChoiceContainer = ({job, userId}) => {
    const accessToken = localStorage.getItem("access_token")
    const [user, setUser] = useState({})
    const [loaded, setLoaded] = useState({ isLoaded: false })
    const [currentCoverLetterChoice, setCurrentCoverLetterChoice] = useState(job.template_choices)
    const { register, handleSubmit } = useForm({
        defaultValues: {
            template_choice: job.template_choices,
        }
    })

    const template_choices = {
        'non-technical-cover-letter': 'Non-technical Cover Letter',
        'Standard Job Template': 'Standard Job Template',
        'Triplebyte (message-version)': 'Triplebyte (message-version)',
        // 'cover-letter': 'Cover Letter',
        // 'cover-letter-4': 'Template 4',
        // 'cover-letter-5': 'Template 5',
    }

    const onSubmit = (data) => {
        setCurrentCoverLetterChoice(data['template_choice'])
    }

    useEffect(() => {
        axios.defaults.headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
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
            }).then(() => {
                setLoaded({ isLoaded: true })
            })
            .catch(err => {
                setLoaded({ isLoaded: false })
            })
    }, [])

    if (loaded.isLoaded) {
        return (
        <div className="cover-letter-display-container">
            <Container>
                <SegmentGroup inverted>
                        <Segment>
                            <Link to="/job/form" user={user}>Create another cover letter?</Link>
                        </Segment>
                        <Segment>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <label>
                                    <p>Template Choices: </p>
                                    <select name="template_choice" ref={register} className="list-form-field-with-margin">
                                        {Object.keys(template_choices).map((key, idx) => (
                                            <option value={key} key={idx} name={template_choices[key]}> {template_choices[key]} </option>
                                            ))}
                                    </select>
                                </label>
                                <Popup
                                    content="This will temporarily change the cover letter."
                                    offset={[120,-10]}
                                    trigger={
                                    <input className="cover-letter-display-button" type="submit" value="Change Cover Letter" />
                                    }
                                />
                            </form>
                            <div>
                                {determineCoverLetter(currentCoverLetterChoice, job, user)}
                            </div>
                        </Segment>
                </SegmentGroup>
            </Container>
        </div>
    
        )
    } else {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        )
    }
}



export default CoverLetterChoiceContainer