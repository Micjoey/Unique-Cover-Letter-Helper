import React, { useState } from 'react'
import Shell from './Shell'
import {Form, Input, Message, Header, Button} from 'semantic-ui-react'
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import axios from 'axios'
import axiosInstance from '../../store/axiosApi';


const ChangeEmail = () => {
    const [currentEmail, setCurrentEmail] = useState("myemail@gmail.com")
    const [newEmail, setNewEmail] = useState("")
    const [confirmEmail, setConfirmEmail] = useState("")
    const [error, setError] = useState({})
    const {register, errors, handleSubmit} = useForm()
    const [loading, setLoading] = useState(false)
    const accessToken = localStorage.getItem("access_token")
    
    const onSubmit = data => {
        const email = data.newEmail
        const confirmEmail = data.confirmEmail
        if (data.newEmail !== '' || data.confirmEmail !== '') {
            if (email === confirmEmail) {
                axiosInstance.post('')
            } else {
                setError("Emails don't match!")
            }
        } else {
            setError("Fields are empty!")

        }
    }

    return (
        <Shell>
            <Header as="h4">Change Email</Header>
            <Form onSubmit={handleSubmit(onSubmit)} error={error !== null}>
                <Form.Field>
                    <label>Current Email</label>
                    <input value={currentEmail} name="currentEmail" disabled/>
                </Form.Field>
                <Form.Field required>
                    <label>New Email</label>
                    <input 
                        // value=
                        placeholder="New Email"
                        defaultValue={newEmail} 
                        type="email"
                        name={"newEmail"}
                        ref={register()}
                    />
                </Form.Field>
                <Form.Field required>
                    <label>Confirm Email</label>
                    <input 
                        // value=
                        placeholder="Confirm Email" 
                        defaultValue={confirmEmail}
                        dependencies={["newEmail"]}
                        type="email" 
                        name={"confirmEmail"}
                        ref={register()}
                    />
                </Form.Field>
                {error.length && (<Message error heading="There was an error" content={error}/>) }
                <Button primary type="submit" loading={loading} disabled={loading}>Submit</Button>
            </Form>
        </Shell>
    )
}
 

export default ChangeEmail