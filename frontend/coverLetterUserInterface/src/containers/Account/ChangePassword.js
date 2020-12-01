import React, { useEffect, useState } from 'react'
import Shell from './Shell'
import { Form, Input, Message, Header, Button } from 'semantic-ui-react'
import { useForm } from "react-hook-form";

import axios from 'axios'
import jwtDecode from 'jwt-decode';




const ChangePassword = (props) => {
    const [newPassword] = useState("")
    const [currentPassword] = useState("")
    const [confirmPassword] = useState("")
    const [error, setError] = useState({})
    const { register, handleSubmit } = useForm()
    const [loading, setLoading] = useState(false)
    const accessToken = localStorage.getItem('access_token')
    const userId = jwtDecode(accessToken).user_id

    const onSubmit = data => {
        const Password = data.newPassword
        const confirmPassword = data.confirmPassword
        if (data.newPassword !== '' || data.confirmPassword !== '') {
            if (Password === confirmPassword) {
                    setLoading(true)
                    data = { Password: Password }
                    axios.defaults.headers = {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${accessToken}`
                    }
                    axios.patch(`http://localhost:3000/rest-auth/password/change/`, data)
                        .then(resp => {
                            { resp.length && (<Message confirm heading="Successfully changed password" content="You have successfully change your password!" />) }
                        })
                        .catch(err => {
                            console.log(err.Message)
                        })
                    setLoading(false)
            } else {
                setError("Passwords don't match!")
            }
        } else {
            setError("Fields are empty!")

        }
    }

    return (
        <Shell>
            <Header as="h2">Change Password</Header>
            <br />
            <Form onSubmit={handleSubmit(onSubmit)} error={error !== null}>
                <Form.Field required>
                    <label>Current Password</label>
                    <input
                        // value=
                        placeholder="Current Password"
                        defaultValue={newPassword}
                        type="password"
                        name={"currentPassword"}
                        ref={register()}
                    />
                </Form.Field>
                <Form.Field required>
                    <label>New Password</label>
                    <input
                        // value=
                        placeholder="New Password"
                        defaultValue={newPassword}
                        type="password"
                        name={"newPassword"}
                        ref={register()}
                    />
                </Form.Field>
                <Form.Field required>
                    <label>Confirm Password</label>
                    <input
                        // value=
                        placeholder="Confirm Password"
                        defaultValue={confirmPassword}
                        dependencies={["newPassword"]}
                        type="password"
                        name={"confirmPassword"}
                        ref={register()}
                    />
                </Form.Field>
                {error.length && (<Message error heading="There was an error" content={error} />)}
                <Button primary type="submit" loading={loading} disabled={loading}>Submit</Button>
            </Form>
        </Shell>
    )
}


export default ChangePassword