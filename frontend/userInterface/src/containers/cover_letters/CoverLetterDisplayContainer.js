import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { determineCoverLetter } from './determineCoverLetterFormat'



const CoverLetterChoiceContainer = ({job}) => {
    const user = null // this will be the state eventually
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


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input style={{ color: 'Black' }} type="submit" value="Change Cover Letter" />
                <label style={{ display: 'flex' }}>
                    <p>Template Choices: </p>
                    <select style={{ color: 'Red' }} name="template_choice" ref={register} style={{ display: 'flex', margin: '0em 1em' }}>
                        {Object.keys(template_choices).map((key, idx) => (
                            <option value={key} key={idx} name={template_choices[key]}> {template_choices[key]} </option>
                        ))}
                    </select>
                </label>
            </form>
            <div>
                {determineCoverLetter(currentCoverLetterChoice, job, user)}
            </div>
        </div>

    )
}



export default CoverLetterChoiceContainer