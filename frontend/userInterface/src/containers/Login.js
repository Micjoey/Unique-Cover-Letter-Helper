import { Form, Input, Button, Checkbox, Spin, Space, Alert } from 'antd';
import {Nav} from 'react-bootstrap';
import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../store/actions/Auth'
import { useHistory }  from 'react-router-dom';


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const Login = () => {
    const history = useHistory()
    const props = useSelector(state => (
        { ...state, 
            isAuthenticated: localStorage.getItem('access_token') !== null,
            loading: state.loading,
            error: state.error
        }))
    
    const dispatch = useDispatch()
    const onAuth = useCallback(
        (username, password) => dispatch(actions.authLogin(username, password))
    )

    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        setErrorMessage(props.error)
    }, [])
    
    const onFinish = (values) => {
        try {
            onAuth(values.username, values.password)
        } catch(e) {
            alert(e.message)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo, "hit finish failed");
    };

    return (
        <div>
            {errorMessage}
            {
                !props.loading ? 
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        autoComplete="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        autoComplete="current-password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                        or
                        <Nav.Link style={{marginLeft: '10px'}} href='/signup'>
                            Sign Up
                        </Nav.Link>
                    </Form.Item>
                </Form>
                :
                <Spin tip="Loading...">
                </Spin>
            }
        </div>
    );
};


export default Login