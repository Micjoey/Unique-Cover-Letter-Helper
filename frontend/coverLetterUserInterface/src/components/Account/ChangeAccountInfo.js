import React, { useEffect, useState } from 'react'
import { Form, Input, Message, 
        Header, Button, Grid, 
        Container, Segment, Menu, 
        Table, Icon, Label } from 'semantic-ui-react'
import { useForm } from "react-hook-form";

import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Shell from '../../containers/Account/Shell';



const ChangeAccountInfo = (props) => {
    const [user, setUser] = useState("")
    const [error, setError] = useState({})
    const { register, handleSubmit } = useForm()
    const [loading, setLoading] = useState(false)
    const accessToken = localStorage.getItem('access_token')

    useEffect(() => {
        setUser(props.location.state.user)
    }, [])


    const onSubmit = data => {
        console.log(data)
        // if (data.newEmail !== '' || data.confirmEmail !== '') {
        //     if (email === confirmEmail) {
        //         if (email !== user.email) {
        //             setLoading(true)
        //             data = { email: email }
        //             axios.defaults.headers = {
        //                 "Content-type": "application/json",
        //                 Authorization: `Bearer ${accessToken}`
        //             }
        //             axios.patch(`http://localhost:3000/api/users/${user.id}/`, data)
        //                 .then(resp => {
        //                     setUser(resp.data)
        //                 })
        //                 .catch(err => {
        //                     console.log(err.Message)
        //                 })
        //             setLoading(false)
        //         } else {
        //             setError(`Your email is already ${email}`)
        //         }
        //     } else {
        //         setError("Emails don't match!")
        //     }
        // } else {
        //     setError("Fields are empty!")

        // }
    }

    return (
        <Shell>
            <Table striped inverted textAlign="center">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Current Account Info</Table.HeaderCell>
                        <Table.HeaderCell>New Info</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell textAlign="center" verticalAlign="middle">First Name: </Table.Cell>
                        <Table.Cell>
                                <Form.Field>
                                {/* <label>Confirm Email</label> */}
                                <Input
                                    placeholder="Update First Name"
                                    defaultValue={user.first_name}
                                    type="text"
                                    name={"first_name"}
                                    ref={register()}
                                />
                            </Form.Field>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell textAlign="center" verticalAlign="middle">Middle Name: </Table.Cell>
                        <Table.Cell>
                                <Form.Field>
                                {/* <label>Confirm Email</label> */}
                                <Input
                                    placeholder="Update Middle Name"
                                    defaultValue={user.middle_name}
                                    type="text"
                                    name={"middle_name"}
                                    ref={register()}
                                />
                            </Form.Field>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell textAlign="center" verticalAlign="middle">Last Name: </Table.Cell>
                        <Table.Cell>
                                <Form.Field>
                                {/* <label>Confirm Email</label> */}
                                <Input
                                    placeholder="Update Last Name"
                                    defaultValue={user.last_name}
                                    type="text"
                                    name={"last_name"}
                                    ref={register()}
                                />
                            </Form.Field>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell textAlign="center" verticalAlign="middle">Preferred Name: </Table.Cell>
                        <Table.Cell>
                                <Form.Field>
                                {/* <label>Confirm Email</label> */}
                                <Input
                                    placeholder="Update Preferred Name"
                                    defaultValue={user.preferred_name}
                                    type="text"
                                    name={"preferred_name"}
                                    ref={register()}
                                />
                            </Form.Field>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell textAlign="center" verticalAlign="middle">Phone Number: </Table.Cell>
                        <Table.Cell>
                                <Form.Field>
                                {/* <label>Confirm Email</label> */}
                                <Input
                                    placeholder="Update Phone Number"
                                    defaultValue={user.phone_number}
                                    type="text"
                                    name={"phone_number"}
                                    ref={register()}
                                />
                            </Form.Field>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell textAlign="center" verticalAlign="middle">LinkedIn: </Table.Cell>
                        <Table.Cell>
                                <Form.Field>
                                {/* <label>Confirm Email</label> */}
                                <Input
                                    placeholder="Update LinkedIn"
                                    defaultValue={user.linkedin}
                                    type="text"
                                    name={"linkedin"}
                                    ref={register()}
                                />
                            </Form.Field>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell textAlign="center" verticalAlign="middle">Github: </Table.Cell>
                        <Table.Cell>
                                <Form.Field>
                                {/* <label>Confirm Email</label> */}
                                <Input
                                    placeholder="Update Github"
                                    defaultValue={user.github}
                                    type="text"
                                    name={"github"}
                                    ref={register()}
                                />
                            </Form.Field>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell textAlign="center" verticalAlign="middle">Portfolio Website: </Table.Cell>
                        <Table.Cell>
                                <Form.Field>
                                {/* <label>Confirm Email</label> */}
                                <Input
                                    placeholder="Update Portfolio Website"
                                    defaultValue={user.portfolio_website}
                                    type="text"
                                    name={"portfolio_website"}
                                    ref={register()}
                                />
                            </Form.Field>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell textAlign="center" verticalAlign="middle">Street Address: </Table.Cell>
                        <Table.Cell>
                                <Form.Field>
                                {/* <label>Confirm Email</label> */}
                                <Input
                                    placeholder="Update Street Address"
                                    defaultValue={user.street_address}
                                    type="text"
                                    name={"street_address"}
                                    ref={register()}
                                />
                            </Form.Field>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell textAlign="center" verticalAlign="middle">City Address: </Table.Cell>
                        <Table.Cell>
                                <Form.Field>
                                {/* <label>Confirm Email</label> */}
                                <Input
                                    placeholder="Update City Address"
                                    defaultValue={user.city_address}
                                    type="text"
                                    name={"city_address"}
                                    ref={register()}
                                />
                            </Form.Field>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell textAlign="center" verticalAlign="middle">State Address: </Table.Cell>
                        <Table.Cell>
                                <Form.Field>
                                {/* <label>Confirm Email</label> */}
                                <Input
                                    placeholder="Update State Address"
                                    defaultValue={user.state_address}
                                    type="text"
                                    name={"state_address"}
                                    ref={register()}
                                />
                            </Form.Field>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell textAlign="center" verticalAlign="middle">Zip Code: </Table.Cell>
                        <Table.Cell>
                                <Form.Field>
                                {/* <label>Confirm Email</label> */}
                                <Input
                                    placeholder="Update Zip Code"
                                    defaultValue={user.zip_code}
                                    type="text"
                                    name={"zip_code"}
                                    ref={register()}
                                />
                            </Form.Field>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='2'textAlign="center">
                            {error.length && (<Message error heading="There was an error" content={error} />)}
                            <Button primary type="submit" loading={loading} disabled={loading}>Submit</Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </Shell>
    )
}


export default ChangeAccountInfo