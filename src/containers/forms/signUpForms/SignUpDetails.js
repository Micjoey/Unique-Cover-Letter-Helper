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
import { confirmAlert } from 'react-confirm-alert';

const AccountDetailsForm = () => {
    const history = useHistory()
    // const [requiredFields, setRequiredFields] = useState({})
    const [errorMessage, setErrorMessage] = useState({})
    const { register, handleSubmit } = useForm({})
    const [loading, setLoading] = useState(false)


    const onSubmit = data => {
        const navBar = document.getElementsByClassName("nav-bar")[0]
        navBar.style.display = null
        setLoading(true)
        const accessToken = localStorage.getItem('access_token')
        const userId = jwtDecode(accessToken).user_id
        axios.defaults.headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        axios.patch(`/api/users/${userId}/`, data)
            .then(
                confirmAlert({
                    title: `Success!`,
                    message: `You have finished filling out your user profile. Would you like to set default values for your future cover letters or go straight to creating them?`,
                    buttons: [
                        {
                            label: 'Yes, straight to cover letters',
                            color: 'red',
                            onClick: () => history.push('/job/form/')
                        }
                        ,
                        {
                            label: 'Set your default form values',
                            onClick: () => { history.push('/default-form-values/') }
                        },
                        {
                            label: 'No, I would like to change my account information.',
                            onClick: () => { history.push('/user-admin/') }
                        },
                    ]
                })
            )
            .catch(err => {
                setErrorMessage(err.Message)
            })
        
        setLoading(false)

    }

    const pageLoad = () => {
        confirmAlert({
            title: `Please fill in.`,
            message: `For this next page, please fill in as much information as you can.  The First Name and Last Name are required.`,
            buttons: [
                {
                    label: 'continue',
                }
                ,
            ]
        })
    }

    return (
        <div className="login-form">
            <Segment placeholder onClick={confirmAlert()}>
                <Grid stackable="true" >
                    <Grid.Column stackable={true}>
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
                                                        placeholder={`**First Name:`}
                                                        defaultValue={""}
                                                        type="text"
                                                        name={"first_name"}
                                                        ref={register()}
                                                        style={{ fontWeight: "bolder" }}
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
                                                        placeholder={`**Last Name:`}
                                                        defaultValue={""}
                                                        type="text"
                                                        name={"last_name"}
                                                        ref={register()}
                                                        style={{fontWeight: "bolder"}}
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
                                                    <input
                                                        placeholder={`Phone Number:`}
                                                        defaultValue={""}
                                                        type="text"
                                                        name={"phone_number"}
                                                        ref={register()}
                                                    />
                                                </Form.Field>
                                                <Form.Field name="LinkedIn">
                                                    <input
                                                        placeholder={`LinkedIn:`}
                                                        defaultValue={""}
                                                        type="text"
                                                        name={"linkedin"}
                                                        ref={register()}
                                                    />
                                                </Form.Field>
                                                <Form.Field name="github">
                                                    <input
                                                        placeholder={`Github:`}
                                                        defaultValue={""}
                                                        type="text"
                                                        name={"github"}
                                                        ref={register()}
                                                    />
                                                </Form.Field>
                                                <Form.Field name="portfolioWebsite">
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
                                                    <input
                                                        placeholder={`Street Address:`}
                                                        defaultValue={""}
                                                        type="text"
                                                        name={"street_address"}
                                                        ref={register()}
                                                    />
                                                </Form.Field>
                                                <Form.Field>
                                                    <input
                                                        placeholder={`City Address:`}
                                                        defaultValue={""}
                                                        type="text"
                                                        name={"city_address"}
                                                        ref={register()}
                                                    />
                                                </Form.Field>
                                                <Form.Field>
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