import React, { useEffect, useState } from 'react'
import {
    Form, Input, Message,
    Button, Table
} from 'semantic-ui-react'
import { useForm } from "react-hook-form";
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import rg4js from 'raygun4js';
import Shell from '../../containers/Account/Shell';
import { useHistory } from 'react-router-dom';
import { loadingPage } from '../LoadingPage';



const ChangeEmail = (props) => {
    const [user, setUser] = useState("")
    const [newEmail] = useState("")
    const [confirmEmail] = useState("")
    const [error, setError] = useState({})
    const {register, handleSubmit} = useForm()
    const [loading, setLoading] = useState(false)
    const accessToken = localStorage.getItem('access_token')
    const userId = jwtDecode(accessToken).user_id
    const history = useHistory()
    useEffect(() => {
        axios.get(`/api/users/${userId}/`, { userId: userId })
            .then(resp => {
                setUser(resp.data)
                rg4js('setUser', {
                    identifier: `${resp.data.username}`,
                    isAnonymous: false,
                    email: `${resp.data.email}`,
                    firstName: `${resp.data.first_name}`,
                    fullName: `${resp.data.first_name} ${resp.data.last_name}`
                })
            })
            .then(() => {
                setLoading(false)
            })
            .catch(err => {
                // console.log(err)
            })
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
                    axios.patch(`/api/users/${user.id}/`, data)
                    .then(resp => {
                        setUser(resp.data)
                    })
                    .then(() => history.go(0))
                    .catch(err => {
                        setError(err.Message)
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
    if (!loading) {
        return (
            <Shell>
                <Form onSubmit={handleSubmit(onSubmit)} error={error !== null}>
                    <Table striped inverted textAlign="center">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Current Email</Table.HeaderCell>
                                <Table.HeaderCell>New Email</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {/* <Header as="h2">Change Email</Header> */}
                            {/* <br /> */}
                                <Table.Row>
                                    <Table.Cell textAlign="center" verticalAlign="middle">Current Email: </Table.Cell>
                                    <Table.Cell>
                                        <Form.Field>
                                            {/* <label>Confirm Email</label> */}
                                            <Input
                                                // placeholder={`Update First Name: ${user.first_name}`}
                                                defaultValue={user.email}
                                                type="text"
                                                name={"currentEmail"}
                                                ref={register({ name: "currentEmail" })}
                                                disabled
                                            />
                                        </Form.Field>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell verticalAlign="middle" textAlign="center">
                                        <Form.Field>Change Email</Form.Field>
                                    </Table.Cell>
                                    <Table.Cell>
                                    <Form.Field required>
                                        <label>New Email</label>
                                        <input
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
            </Shell>
        )
    } {
        return (loadingPage())
    }
}
 

export default ChangeEmail