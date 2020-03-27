import React, { useReducer } from "react";
import { Row, Col, Card, Form, Input, Button } from "antd";
import {
  DribbbleCircleFilled,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";
import qs from "querystring";

import "../../App.css";

const Login = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    loading: false,
    error: null,
  });

  const handleLogin = values => {
    setState({ loading: true, error: null });
    const { username, password } = values;
    console.log("Clicked login", username, password);
    axios
      .post(
        "/login_check",
        qs.stringify({
          username,
          password,
        }),
      )
      .then(response => {
        const res = response.status;
        if (res === 200) {
          console.log("Response: ", res);
          setState({ loading: false, error: null });
          history.push("/open-jobs");
        } else {
          setState({ loading: false, error: "Error! Please try again" });
        }
      })
      .catch(err => {
        setState({ loading: false, error: err.message });
        console.log("Error logging in: ", err);
      });
  };
  return (
    <Row justify='space-around' align='middle' className='login full-height'>
      <Col md={4}></Col>
      <Col xs={12} md={4}>
        <Card
          title={
            <>
              <p className='title'>Login to</p>
              <p className='title'>QR Genetics</p>
            </>
          }
          extra={<DribbbleCircleFilled style={{ fontSize: 50 }} />}
          bordered={false}
          style={{ width: 300 }}
        >
          <Form
            form={form}
            name='normal_login'
            className='login-form'
            initialValues={{ remember: true }}
            onFinish={handleLogin}
          >
            <Form.Item
              name='username'
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                data-testid='username'
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Enter your Username'
                className='dashed-input'
              />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                data-testid='password'
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder='Enter your Password'
                className='dashed-input'
              />
            </Form.Item>

            <Form.Item>
              <Button
                data-testid='login'
                type='primary'
                htmlType='submit'
                disabled={state.loading}
                loading={state.loading}
                className='login-form-button'
              >
                Submit Form
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col md={4}></Col>
    </Row>
  );
};

export default Login;
