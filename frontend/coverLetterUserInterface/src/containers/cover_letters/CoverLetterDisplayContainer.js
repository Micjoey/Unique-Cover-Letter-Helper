import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { determineCoverLetter } from './determineCoverLetterFormat'
import { Link } from 'react-router-dom'



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
        'cover-letter': 'Cover Letter',
        'cover-letter-4': 'Template 4',
        'cover-letter-5': 'Template 5',
    }

    const onSubmit = (data) => {
        setCurrentCoverLetterChoice(data['template_choice'])
    }

    useEffect(() => {
        axios.defaults.headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        axios.get(`http://127.0.0.1:3000/api/users/${userId}`)
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        <p>Template Choices: </p>
                        <select style={{ color: 'Red' }} name="template_choice" ref={register} style={{ display: 'flex', margin: '0em 1em' }}>
                            {Object.keys(template_choices).map((key, idx) => (
                                <option value={key} key={idx} name={template_choices[key]}> {template_choices[key]} </option>
                                ))}
                        </select>
                    </label>
                    <input className="cover-letter-display-button" type="submit" value="Change Cover Letter" />
                </form>
                <div>
                    {determineCoverLetter(currentCoverLetterChoice, job, user)}
                </div>
                <div>
                    <Link to="/job/form">Create another cover letter?</Link>
                </div>
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