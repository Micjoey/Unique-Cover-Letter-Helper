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
        const oldPassword = data.oldPassword
        const new_password = data.newPassword1
        const newPassword2 = data.newPassword2
        console.log(data)
        if (data.newPassword1 !== '' || data.newPassword2 !== '') {
            if (new_password === newPassword2) {
                    setLoading(true)
                    const backendData = { old_password: oldPassword, new_password: new_password }
                    console.log(backendData)
                    axios.defaults.headers = {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${accessToken}`
                    }
                    axios.patch(`http://localhost:3000/api/change-password/`, backendData)
                        .then(resp => {
                            { resp.length && (<Message confirm heading="Successfully changed password" content="You have successfully change your password!" />) }
                        })
                        .catch(err => {
                            console.log(err)
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
                        name={"oldPassword"}
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
                        name={"new_password1"}
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
                        name={"new_password2"}
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