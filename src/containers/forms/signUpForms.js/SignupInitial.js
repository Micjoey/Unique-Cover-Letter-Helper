import React, {useCallback, useState } from 'react'
import * as actions from '../../../store/actions/Auth'
import { useDispatch, useSelector } from 'react-redux'
import {
    Form, Message,Button, 
    Grid, Segment, Table,  Divider
} from 'semantic-ui-react'

// import {
//     Form,
//     Input,
//     Select,
//     Button,
// } from 'antd';
import { Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form'

const RegistrationForm = () => {
    const history = useHistory()
    const [loading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const props = useSelector(state => (
        {
            ...state,
            isAuthenticated: localStorage.getItem('access_token') !== null,
            loading: state.loading,
            error: state.error
        }))
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const onAuth = useCallback(
        ({...values}) => dispatch(actions.authSignUp(values))
    )

    const onSubmit = (values) => {
        const data = {...values}
        const passwordCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
       if (data.password === data.confirm_password) {
            if (data.password.length > 5) {
                if (data.password.match(passwordCheck)){
                    onAuth({...values})
                    
                } else {
                    setErrorMessage("Password needs to contain at least one numeric digit, one uppercase and one lowercase letter")
                }
            } else {
                setErrorMessage("Password needs to be greater than 5 characters")
            }
       } else {
           setErrorMessage("Passwords don't match!")
       }
        // history.push('/')
    };


    return (
        <div className="login-form">

            <Segment placeholder>
                <Grid stackable >
                    <Grid.Column stackable>
                        <Form onSubmit={handleSubmit(onSubmit)} error={errorMessage !== null}>
                            <Table striped inverted textAlign="center">
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell colSpan={10}>Account Info</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell textAlign="center" verticalAlign="middle">Username: </Table.Cell>
                                        <Table.Cell>
                                            <Form.Field>
                                                {/* <label>Confirm Email</label> */}
                                                <input
                                                    required
                                                    placeholder={`Username:`}
                                                    defaultValue={""}
                                                    type="text"
                                                    name={"username"}
                                                    ref={register()}
                                                    minLength={4}
                                                    maxLength={20}
                                                />
                                            </Form.Field>
                                        </Table.Cell>
                                        <Table.Cell textAlign="center" verticalAlign="middle">Email: </Table.Cell>
                                        <Table.Cell>
                                            <Form.Field>
                                                {/* <label>Confirm Email</label> */}
                                                <input
                                                    required
                                                    placeholder={`Email:`}
                                                    defaultValue={""}
                                                    type="email"
                                                    name={"email"}
                                                    ref={register()}
                                                />
                                            </Form.Field>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell textAlign="center" verticalAlign="middle">Password: </Table.Cell>
                                        <Table.Cell>
                                            <Form.Field>
                                                {/* <label>Confirm Email</label> */}
                                                <input
                                                    required
                                                    placeholder={`Password:`}
                                                    defaultValue={""}
                                                    type="password"
                                                    name={"password"}
                                                    minLength={6}
                                                    maxLength={20}
                                                    ref={register()}
                                                />
                                            </Form.Field>
                                        </Table.Cell>
                                        <Table.Cell textAlign="center" verticalAlign="middle">Confirm Password: </Table.Cell>
                                        <Table.Cell>
                                            <Form.Field>
                                                {/* <label>Confirm Email</label> */}
                                                <input
                                                    required
                                                    placeholder={`Confirm Password:`}
                                                    defaultValue={""}
                                                    type="password"
                                                    minLength={6}
                                                    maxLength={20}
                                                    name={"confirm_password"}
                                                    ref={register()}
                                                />
                                            </Form.Field>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                                <Table.Footer>
                                    <Table.Row>
                                        <Table.HeaderCell colSpan='10' textAlign="center">
                                            {errorMessage && (<Message error heading="There was an error." content={errorMessage} />)}
                                            <Button primary type="submit" loading={loading} disabled={loading}>Submit</Button>
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Footer>
                            </Table>
                        </Form>
                    </Grid.Column>
                </Grid>
                <Divider horizontal>Or</Divider>
                <Grid.Column verticalAlign='middle'>
                    <Button content='Login' icon='signup' size='big' onClick={() => history.push("/login")} />
                </Grid.Column>
            </Segment>
        </div>
    );
};

export default RegistrationForm