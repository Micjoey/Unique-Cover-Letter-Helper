import React, { useEffect, useState } from 'react'
import { Form, Message, 
        Button,Table, 
    } from 'semantic-ui-react'
import { useForm } from "react-hook-form";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Shell from '../../containers/Account/Shell';
import { useHistory } from 'react-router-dom';
import * as actions from '../../store/actions/Auth'
import rg4js from 'raygun4js';
import { loadingPage } from '../LoadingPage';



const ChangeAccountInfo = (props) => {
    const [user, setUser] = useState({})
    const history = useHistory()
    const [error, setError] = useState({})
    const { register, handleSubmit } = useForm({})
    const [loading, setLoading] = useState(false)
    const accessToken = localStorage.getItem('access_token')
    const userId = jwtDecode(accessToken).user_id

    useEffect(() => {
        setLoading(true)
        axios.defaults.headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        axios.get(`/api/users/${userId}/`)
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
            .catch(err => {
                // console.log(err)
            })
        setLoading(false)
    }, [accessToken, userId])


    const onSubmit = data => {
        setLoading(true)
        axios.defaults.headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        axios.patch(`/api/users/${user.id}/`, data)
            .then(resp => {
                setUser(resp.data)
                // history.go()
            })
            .then(() =>
                history.go(0)
            )
            .catch(err => {
                setError(err.Message)
            })
        setLoading(false)
    }

    const onDelete = () => {
        confirmAlert({
            title: `Confirm Delete `,
            message: `Are you sure you want to delete your account ${user.first_name} ${user.last_name}? This is permenant and there is no coming back.`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.defaults.headers = {
                            "Content-type": "application/json",
                            Authorization: `Bearer ${accessToken}`
                        }
                        axios.delete(`/api/users/${user.id}/`)
                            // .then(resp => console.log(resp))
                            .then(() => actions.logout())
                            .then(() => history.push('/login/'))
                            .then( () => history.go(0))
                            .catch(error => {

                                // console.log(error)
                            })
                    }
                }
                ,
                {
                    label: 'No',
                }
            ]
        });
    }
    if (user && !loading) {
        return (
            <Shell>
                <Form onSubmit={handleSubmit(onSubmit)} error={error !== null}>
                    <Table striped inverted textAlign="center">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan={10}>Account Info</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
    
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell textAlign="center" verticalAlign="middle">First Name: </Table.Cell>
                                <Table.Cell>
                                        <Form.Field>
                                        {/* <label>Confirm Email</label> */}
                                        <input
                                            placeholder={`Update First Name:`}
                                            defaultValue={user.first_name}
                                            type="text"
                                            name={"first_name"}
                                            ref={register()}
                                            minLength={1}
                                            maxLength={30}
                                            required
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
                                            placeholder={`Update middle Name:`}
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
                                            placeholder={`Update Last Name:`}
                                            defaultValue={user.last_name}
                                            type="text"
                                            name={"last_name"}
                                            ref={register()}
                                            minLength={1}
                                            maxLength={30}
                                            required
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
                                            placeholder={`Update Preferred Name:`}
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
                                            placeholder={`Update Phone Number:`}
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
                                            placeholder={`Update LinkedIn:`}
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
                                            placeholder={`Update Github:`}
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
                                            placeholder={`Update Portfolio Website:`}
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
                                            placeholder={`Update Street Address:`}
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
                                            placeholder={`Update City Address:`}
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
                                            placeholder={"Update State Address:"}
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
                                            placeholder={`Update Zip Code:`}
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
                <br></br>
                <Form onSubmit={handleSubmit(onDelete)} error={error !== null}>
                    <Button type="submit" negative>Delete Account</Button>
                    {error.length && (<Message error heading="There was an error deleting your account. Please try again later." content={error} />)}
                </Form>
            </Shell>
        )
    } else {
        // history.push('/user-admin/')
        return (
            loadingPage()

        )
    }

}


export default ChangeAccountInfo