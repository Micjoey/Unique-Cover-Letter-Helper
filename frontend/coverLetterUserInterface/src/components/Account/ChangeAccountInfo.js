import React, { useEffect, useState } from 'react'
import { Form, Message, 
        Header, Button, Grid, 
        Container, Segment, Menu, 
        Table, Icon, Label } from 'semantic-ui-react'
import { useForm } from "react-hook-form";

import axios from 'axios'
import Shell from '../../containers/Account/Shell';



const ChangeAccountInfo = (props) => {
    const [user, setUser] = useState({})

    const [error, setError] = useState({})
    const { register, handleSubmit } = useForm({})
    const [loading, setLoading] = useState(false)
    const accessToken = localStorage.getItem('access_token')

    useEffect(() => {
        setUser(props.location.state.user)
    }, [])


    const onSubmit = data => {
        setLoading(true)
        axios.defaults.headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        console.log(data)
        axios.patch(`http://localhost:3000/api/users/${user.id}/`, data)
            .then(resp => {
                console.log(resp)
                setUser(resp.data)
                console.log("successful")
            })
            .catch(err => {
                console.log(err.Message)
            })
        setLoading(false)
    }

    return (
        <Shell>
            <Form onSubmit={handleSubmit(onSubmit)} error={error !== null}>
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
                                    <input
                                        placeholder={`Update First Name: ${user.first_name}`}
                                        defaultValue={user.first_name}
                                        type="text"
                                        name={"first_name"}
                                        ref={register()}
                                    />
                                </Form.Field>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell textAlign="center" verticalAlign="middle">Middle Name: </Table.Cell>
                            <Table.Cell>
                                <Form.Field name="middle_name">
                                    {/* <label>Confirm Email</label> */}
                                    <input
                                        placeholder={`Update middle Name: ${user.middle_name}`}
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
                                <Form.Field name="last_name">
                                    {/* <label>Confirm Email</label> */}
                                    <input
                                        placeholder={`Update Last Name: ${user.last_name}`}
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
                                <Form.Field name="preferred_name">
                                    {/* <label>Confirm Email</label> */}
                                    <input
                                        placeholder={`Update Preferred Name: ${user.preferred_name}`}
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
                                <Form.Field name="phone_number">
                                    {/* <label>Confirm Email</label> */}
                                    <input
                                        placeholder={`Update Phone Number: ${user.phone_number}`}
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
                                    <Form.Field name="LinkedIn">
                                    {/* <label>Confirm Email</label> */}
                                    <input
                                        placeholder={`Update LinkedIn: ${user.linkedin}`}
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
                                <Form.Field name="github">
                                    {/* <label>Confirm Email</label> */}
                                    <input
                                        placeholder={`Update Github: ${user.github}`}
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
                                <Form.Field name="portfolioWebsite">
                                    {/* <label>Confirm Email</label> */}
                                    <input
                                        placeholder={`Update Portfolio Website: ${user.portfolio_website}`}
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
                                    <input
                                        placeholder={`Update Street Address: ${user.street_address}`}
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
                                    <input
                                        placeholder={`Update City Address: ${user.city_address}`}
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
                                    <input
                                        placeholder={`Update State Address: ${user.state_address}`}
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
                                    <input
                                        placeholder={`Update Zip Code: ${user.zip_code}`}
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
            </Form>
        </Shell>
    )
}


export default ChangeAccountInfo