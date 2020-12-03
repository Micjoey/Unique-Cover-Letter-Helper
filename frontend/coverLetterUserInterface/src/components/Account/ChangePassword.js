import React, { useEffect, useState } from 'react'
import {
    Form, Input, Message,
    Header, Button, Grid,
    Container, Segment, Menu,
    Table, Icon, Label, Tab
} from 'semantic-ui-react'
import { useForm } from "react-hook-form";

import axios from 'axios'
import jwtDecode from 'jwt-decode';
import Shell from '../../containers/Account/Shell';




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
        const new_password = data.new_password1
        const newPassword2 = data.new_password2
        if (data.newPassword1 !== '' || data.newPassword2 !== '') {
            if (new_password === newPassword2) {
                    setLoading(true)
                    const backendData = { old_password: oldPassword, new_password: new_password }
                    axios.defaults.headers = {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${accessToken}`
                    }
                    axios.patch(`http://localhost:3000/api/change-password/`, backendData)
                        .then(resp => {
                            { resp.length && (<Message confirm heading="Successfully changed password" content="You have successfully change your password!" />) }
                        })
                        .catch(err => {
                            setError(err)
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
            <Form onSubmit={handleSubmit(onSubmit)} error={error !== null}>
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
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>

                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='2' textAlign="center">
                                {error.length && (<Message error heading="There was an error" content={error} />)}
                                <Button primary type="submit" loading={loading} disabled={loading}>Submit</Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </Form>
            {/* <Header as="h2">Change Password</Header>
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
            </Form> */}
        </Shell>
    )
}


export default ChangePassword