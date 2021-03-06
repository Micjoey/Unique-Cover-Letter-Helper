import React, { useState } from 'react'
import {
    Form,  Message,
    Button, Table, 
} from 'semantic-ui-react'
import { useForm } from "react-hook-form";

import axios from 'axios'

import Shell from '../../containers/Account/Shell';




const ChangePassword = (props) => {
    const [newPassword] = useState("")
    const [confirmPassword] = useState("")
    const [error, setError] = useState({})
    const [successMessage, setSuccessMessage] = useState(null)
    const { register, handleSubmit } = useForm()
    const [loading, setLoading] = useState(false)
    const accessToken = localStorage.getItem('access_token')



    const onSubmit = data => {
        const oldPassword = data.oldPassword
        const new_password = data.new_password1
        const newPassword2 = data.new_password2
        if (new_password !== '' || newPassword2 !== '' || oldPassword) {
            if (new_password === newPassword2) {
                    setLoading(true)
                    const backendData = { old_password: oldPassword, new_password: new_password }
                    axios.defaults.headers = {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${accessToken}`
                    }
                    // axios.patch(`${url}/api/change-password/`, backendData)
                    axios.patch(`/api/change-password/`, backendData)
                        .then(resp => {
                            setSuccessMessage("You have successfully changed the password!")
                            setError({})
                        })
                        .catch(err => {
                            setError("Woops seems like something went wrong. Did you enter the correct current password?")
                            setSuccessMessage(null)
                        })
                    setLoading(false)
            } else {
                setError("Passwords don't match!")
                setSuccessMessage(null)
            }
        } else {
            setError("Fields are empty!")
            setSuccessMessage(null)
        }
    }

    return (
        <Shell>
            <Form onSubmit={handleSubmit(onSubmit)} error={error !== null} success={successMessage !== null}>
                <Table striped inverted textAlign="center">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Current Password</Table.HeaderCell>
                            <Table.HeaderCell>New Password</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell textAlign="center" verticalAlign="middle">Current Password: </Table.Cell>
                            <Table.Cell>
                                <Form.Field>
                                    <label>Current Password</label>
                                    <input
                                        // value=
                                        placeholder="Current Password"
                                        defaultValue={newPassword}
                                        autoComplete="current-password"
                                        type="password"
                                        name={"oldPassword"}
                                        ref={register()}
                                    />
                                </Form.Field>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell verticalAlign="middle" textAlign="center">
                                <Form.Field>New Password</Form.Field>
                            </Table.Cell>
                            <Table.Cell>
                                <Form.Field required>
                                    <label>New Password</label>
                                    <input
                                        // value=
                                        placeholder="New Password"
                                        defaultValue={newPassword}
                                        type="password"
                                        name={"new_password1"}
                                        autoComplete="new-password"
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
                                        autoComplete="new-password"
                                        type="password"
                                        name={"new_password2"}
                                        ref={register()}
                                    />
                                </Form.Field>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>

                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='2' textAlign="center">
                                {error.length && (<Message error heading="There was an error" content={error} />)}
                                {successMessage && (<Message success heading="Success" content={successMessage} />)}
                                <Button primary type="submit" loading={loading} disabled={loading}>Submit</Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </Form>
        </Shell>
    )
}


export default ChangePassword