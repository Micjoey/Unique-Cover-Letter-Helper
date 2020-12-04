import React, { useState } from 'react'
import {
    Form, Message,
    Button, Grid,
    Segment, Table, 
} from 'semantic-ui-react'
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import axios from 'axios'

import jwtDecode from 'jwt-decode';

const AccountDetailsForm = () => {
    const history = useHistory()
    const [errorMessage, setErrorMessage] = useState({})
    const { register, handleSubmit } = useForm({})
    const [loading, setLoading] = useState(false)
    const accessToken = localStorage.getItem('access_token')
    const userId = jwtDecode(accessToken).user_id
    // const dispatch = useDispatch()
    const url = window.location.origin

    const onSubmit = data => {
        setLoading(true)
        axios.defaults.headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        // axios.patch(`${url}/api/users/${userId}/`, data)
        axios.patch(`http://localhost:3000/api/users/${userId}/`, data)
            .then(() => {
                history.push("/all-jobs/")
            })
            .catch(err => {
                setErrorMessage(err.Message)
            })
        setLoading(false)
    }


    return (
        <div className="login-form">
            <Segment placeholder>
                <Grid stackable >
                    <Grid.Column stackable>
                        <Form onSubmit={handleSubmit(onSubmit)} error={errorMessage !== null}>
                            <Table striped inverted textAlign="center">
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Account Info</Table.HeaderCell>
                                        <Table.HeaderCell> </Table.HeaderCell>
                                        <Table.Row>
                                            <Table.Cell textAlign="center" verticalAlign="middle">Name: </Table.Cell>
                                            <Table.Cell stackable>
                                                <Form.Field>
                                                    <input
                                                        required
                                                        placeholder={`First Name:`}
                                                        defaultValue={""}
                                                        type="text"
                                                        name={"first_name"}
                                                        ref={register()}
                                                    />
                                                </Form.Field>
                                            </Table.Cell>
                                            <Table.Cell stackable>
                                                <Form.Field>
                                                    <input
                                                        placeholder={`Middle Name:`}
                                                        defaultValue={""}
                                                        type="text"
                                                        name={"middle_name"}
                                                        ref={register()}
                                                    />
                                                </Form.Field>
                                            </Table.Cell>
                                            <Table.Cell stackable>
                                                <Form.Field>
                                                    <input
                                                        required
                                                        placeholder={`Last Name:`}
                                                        defaultValue={""}
                                                        type="text"
                                                        name={"last_name"}
                                                        ref={register()}
                                                    />
                                                </Form.Field>
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell textAlign="center" verticalAlign="middle">Preferred Name: </Table.Cell>
                                            <Table.Cell stackable>
                                                <Form.Field>
                                                    <input
                                                        placeholder={`Preferred Name:`}
                                                        defaultValue={""}
                                                        type="text"
                                                        name={"preferred_name"}
                                                        ref={register()}
                                                    />
                                                </Form.Field>
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell textAlign="center" verticalAlign="middle">Cover Letter Information </Table.Cell>
                                            <Table.Cell>
                                                <Form.Field name="phone_number">
                                                    {/* <label>Confirm Email</label> */}
                                                    <input
                                                        placeholder={`Phone Number:`}
                                                        defaultValue={""}
                                                        type="text"
                                                        name={"phone_number"}
                                                        ref={register()}
                                                    />
                                                </Form.Field>
                                                <Form.Field name="LinkedIn">
                                                    {/* <label>Confirm Email</label> */}
                                                    <input
                                                        placeholder={`LinkedIn:`}
                                                        defaultValue={""}
                                                        type="text"
                                                        name={"linkedin"}
                                                        ref={register()}
                                                    />
                                                </Form.Field>
                                                <Form.Field name="github">
                                                    {/* <label>Confirm Email</label> */}
                                                    <input
                                                        placeholder={`Github:`}
                                                        defaultValue={""}
                                                        type="text"
                                                        name={"github"}
                                                        ref={register()}
                                                    />
                                                </Form.Field>
                                                <Form.Field name="portfolioWebsite">
                                                    {/* <label>Confirm Email</label> */}
                                                    <input
                                                        placeholder={`Portfolio Website:`}
                                                        defaultValue={""}
                                                        type="text"
                                                        name={"portfolio_website"}
                                                        ref={register()}
                                                    />
                                                </Form.Field>
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell textAlign="center" verticalAlign="middle">Address: </Table.Cell>
                                            <Table.Cell>
                                                <Form.Field>
                                                    {/* <label>Confirm Email</label> */}
                                                    <input
                                                        placeholder={`Street Address:`}
                                                        defaultValue={""}
                                                        type="text"
                                                        name={"street_address"}
                                                        ref={register()}
                                                    />
                                                </Form.Field>
                                                <Form.Field>
                                                    {/* <label>Confirm Email</label> */}
                                                    <input
                                                        placeholder={`City Address:`}
                                                        defaultValue={""}
                                                        type="text"
                                                        name={"city_address"}
                                                        ref={register()}
                                                    />
                                                </Form.Field>
                                                <Form.Field>
                                                    {/* <label>Confirm Email</label> */}
                                                    <input
                                                        placeholder={`State Address:`}
                                                        defaultValue={""}
                                                        type="text"
                                                        name={"state_address"}
                                                        ref={register()}
                                                    />
                                                </Form.Field>
                                                <Form.Field>
                                                    <input
                                                        placeholder={`Zip Code:`}
                                                        defaultValue={""}
                                                        type="text"
                                                        name={"zip_code"}
                                                        ref={register()}
                                                    />
                                                </Form.Field>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Footer>
                                    <Table.Row>
                                        <Table.HeaderCell colSpan='10' textAlign="center">
                                            {errorMessage.length && (<Message error heading="There was an error." content={errorMessage} />)}
                                            <Button primary type="submit" loading={loading} disabled={loading}>Submit</Button>
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Footer>
                            </Table>
                        </Form>
                    </Grid.Column>
                </Grid>
            </Segment>
        </div>

    );
};

export default AccountDetailsForm