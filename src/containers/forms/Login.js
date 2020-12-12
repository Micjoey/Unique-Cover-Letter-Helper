// import { Form, Input, Button, Checkbox, Spin, Space, Alert } from 'antd';
import {
    Form, Input, Message,
    Header, Button, Grid,
    Container, Segment, Menu,
    Table, Icon, Label, Tab, Divider
} from 'semantic-ui-react'

import {Nav} from 'react-bootstrap';
import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions/Auth'
import { useHistory }  from 'react-router-dom';
import { useForm } from "react-hook-form";




const Login = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const props = useSelector(state => (
        { ...state, 
            isAuthenticated: localStorage.getItem('access_token') !== null,
            loading: state.loading,
            error: state.error
        }))
    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch()
    const onAuth = useCallback(
        (username, password) => dispatch(actions.authLogin(username, password, setErrorMessage, false, history))
    )

    const [errorMessage, setErrorMessage] = useState(null)
    
    const onFinish = (values) => {
        setLoading(true)
        try {
            onAuth(values.username, values.password)
        } catch {
            setErrorMessage("Please try again or signup.")
        }
        setLoading(false)
    };

    
    return (
        <div className="login-form">
            <Segment size="large">
                <Segment placeholder inverted style={{minWidth: "10vh"}}>
                    <Grid columns={1} relaxed='very' stackable>
                        <Grid.Column>
                            <Form onSubmit={handleSubmit(onFinish)} loading={props.loading} error={errorMessage !== null} inverted>
                                {errorMessage && (<Message error heading="There was an error." content={errorMessage} />)}
                                <Form.Field required>
                                    <label>Username</label>
                                    <input
                                        icon='user'
                                        label='Username'
                                        name={'username'}
                                        placeholder='Username'
                                        autoComplete="username"
                                        ref={register()}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Password</label>
                                    <input
                                        icon='lock'
                                        label='Password'
                                        name={'password'}
                                        autoComplete="current-password"
                                        type='password'
                                        ref={register()}
                                    />

                                </Form.Field>

                                <Button primary type="submit" loading={loading} disabled={loading}>Login</Button>
                            </Form>
                            <Divider horizontal inverted>Or</Divider>
                        {/* <Grid.Column verticalAlign='middle'> */}
                            <Button content='Sign up' icon='signup' size='big' onClick={() => history.push("/signup")}/>
                        {/* </Grid.Column> */}
                        </Grid.Column>

                    </Grid>
                    
                </Segment>
            </Segment>
        </div>
    );
};


export default Login