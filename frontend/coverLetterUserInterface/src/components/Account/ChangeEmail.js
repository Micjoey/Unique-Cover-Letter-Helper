import React, { useEffect, useState } from 'react'
import {Form, Input, Message, Header, Button} from 'semantic-ui-react'
import { useForm } from "react-hook-form";

import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Shell from '../../containers/Account/Shell';



const ChangeEmail = (props) => {
    const [user, setUser] = useState("")
    const [newEmail] = useState("")
    const [confirmEmail] = useState("")
    const [error, setError] = useState({})
    const {register, handleSubmit} = useForm()
    const [loading, setLoading] = useState(false)
    const accessToken = localStorage.getItem('access_token')
    
    useEffect(() => {
        setUser(props.location.state.user)
    }, [])


    const onSubmit = data => {
        const email = data.newEmail
        const confirmEmail = data.confirmEmail
        if (data.newEmail !== '' || data.confirmEmail !== '') {
            if (email === confirmEmail) {
                if (email !== user.email) {
                    setLoading(true)
                    data = {email: email}
                    axios.defaults.headers = {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${accessToken}`
                    }
                    axios.patch(`http://localhost:3000/api/users/${user.id}/`, data)
                    .then(resp => {
                        setUser(resp.data)
                    })
                    .catch(err => {
                        console.log(err.Message)
                    })
                    setLoading(false)
                } else {
                    setError(`Your email is already ${email}`)
                }
            } else {
                setError("Emails don't match!")
            }
        } else {
            setError("Fields are empty!")

        }
    }

    return (
        <Shell>
            <Header as="h2">Change Email</Header>
            <br/>
            <Form onSubmit={handleSubmit(onSubmit)} error={error !== null}>
                <Form.Field>
                    <label>Current Email</label>
                    <input defaultValue={user.email} name="currentEmail" disabled/>
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