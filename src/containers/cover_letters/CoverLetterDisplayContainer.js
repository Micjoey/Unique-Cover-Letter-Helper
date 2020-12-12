import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useForm } from 'react-hook-form'
import { determineCoverLetter } from './determineCoverLetterFormat'
import { Link } from 'react-router-dom'
import { Container, Popup, Segment, SegmentGroup } from 'semantic-ui-react'
import { job_template_choices } from '../../components/FieldChoices'



const CoverLetterChoiceContainer = ({job, userId}) => {
    const accessToken = localStorage.getItem("access_token")
    const [user, setUser] = useState({})
    const [loaded, setLoaded] = useState({ isLoaded: false })
    const [currentCoverLetterChoice, setCurrentCoverLetterChoice] = useState(job.template_choices)
    const template_choices = job_template_choices
    const { register, handleSubmit } = useForm({
        defaultValues: {
            template_choice: job.template_choices,
        }
    })

    const onSubmit = (data) => {
        setCurrentCoverLetterChoice(data['template_choice'])
    }

    useEffect(() => {
        axios.defaults.headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        axios.get(`/api/users/${userId}/`)
            .then(res => {
                setUser(res.data)
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
                            <Link to="/job/form">Create another cover letter?</Link>
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