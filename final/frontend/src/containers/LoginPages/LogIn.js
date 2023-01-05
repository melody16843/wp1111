import React from 'react';
import { Button, Space, Checkbox, Form, Input } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../../api';
import { useLogin } from '../hook/useLogin';

const Wrapper = styled.div`
  margin: auto;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
    width: auto;
    height: auto;
    display: flex;
    align-content: center;
    padding: 1em;
    color: black;
    font-size: 2em;
    font-weight: 600;
`

const LogIn = () => {
    const { login, setLogin, email, setEmail, setStatus } = useLogin();

    const handleLogin = (email) => {
        console.log(email)
        axios.post("/login", { email })
            .then((response) => {
                console.log(response.data)
                if (response.data.status_code === 200) {
                    setStatus(
                        {
                            type: 'success',
                            msg: 'Check the magic link in your mailbox!'
                        });
                    console.log('Check the magic link in your mailbox!');
                } else {
                    setStatus({ type: 'error', msg: 'An error occurred. Please try again.' });
                    console.log('An error occurred, please try again.');
                }
            });
    }

    const handleLogout = () => {
        setLogin(false);
        setEmail('');
    }

    const onFinish = async (values) => {
        console.log('Success:', values);
        await setEmail(values.user.email);
        console.log(values.user.email);
        handleLogin(values.user.email);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Wrapper>
            {login ? <><Button type='default' onClick={handleLogout}>Click me to logout!</Button> </> :
                <>
                    <Title>Sign up or log in</Title>
                    <p>Sign up or log in to your account. No password needed!</p>
                    <Space
                        direction="vertical"
                        size="middle"
                        style={{
                            display: 'flex',
                        }}
                    >
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >

                            <Form.Item
                                name={['user', 'email']}
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                        type: 'email',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Space>
                                    <Button type="primary" htmlType="submit">
                                        Continue ✈
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Space>
                </>}
        </Wrapper>
    );
};
export default LogIn;
