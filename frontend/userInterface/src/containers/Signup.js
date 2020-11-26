import React, { useEffect, useState, useCallback } from 'react'
import * as actions from '../store/actions/Auth'
import { useDispatch, useSelector } from 'react-redux'
import {
    Form,
    Input,
    Tooltip,
    Select,
    Button,
} from 'antd';
import { Nav } from 'react-bootstrap';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const RegistrationForm = () => {

    const props = useSelector(state => (
        {
            ...state,
            isAuthenticated: state.token !== null,
            loading: state.loading,
            error: state.error
        }))

    const dispatch = useDispatch()
    const onAuth = useCallback(
        (username, email, passwordOne, passwordTwo) => dispatch(actions.authSignUp(username, email, passwordOne, passwordTwo))
    )
    const [form] = Form.useForm();

    const onFinish = (values) => {
        onAuth(values.username, values.email, values.password, values.confirm)
    };


    return (
        <Form
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                prefix: '1',
            }}
            scrollToFirstError
        >
            <Form.Item
                label="Username"
                name="username"
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
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            {/* <Form.Item
                name="preferred-name"
                label={
                    <span>
                        Preferred Name&nbsp;
                        <Tooltip title="What do you want others to call you?">
                            <QuestionCircleOutlined />
                        </Tooltip>
                    </span>
                }
                rules={[
                    {
                        required: true,
                        message: 'Please input your nickname!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item> */}


            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Signup
                </Button>
                or
                <Nav.Link style={{ marginLeft: '10px' }} href='/login'>
                    Login
                </Nav.Link>
            </Form.Item>
        </Form>
    );
};

export default RegistrationForm