import React, { useState } from "react";
import { login as Login } from "../AuthService/AuthService ";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import "./LoginForm.css";

const LoginForm = () => {
  const history = useHistory();
  const onFinish = (values) => {};
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  function handleChange(values) {
    const id = values.target.id;
    const array = id.split("_");

    setLogin({
      ...login,
      [array[2]]: values.target.value,
    });
  }
  async function handleSubmit(e) {
    await Login(login.username, login.password);
    history.push("/");
  }

  return (
    <div>
      <h3 className="title-comm">
        <span className="title-holder title">Đăng nhập</span>
      </h3>

      <div
        style={{
          margin: "50px 0",
        }}
      >
        <div className="login-form mga">
          <Form
            form={form}
            name="normal_login"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              onChange={handleChange}
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                allowClear
              />
            </Form.Item>

            <Form.Item
              name="password"
              onChange={handleChange}
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                allowClear
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a
                href="https://www.google.com/"
                target="_blank"
                className="link-css login-form-forgot"
              >
                Quên mật khẩu
              </a>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button btn-default"
                style={{ fontSize: "20px", height: "40px" }}
                onClick={handleSubmit}
              >
                <span>Đăng nhập</span>
              </Button>

              <div
                style={{
                  marginLeft: "15px",
                  fontSize: "20px",
                }}
              >
                Hoặc
                <Link
                  to="/signup"
                  style={{ marginLeft: "15px" }}
                  className="link-css"
                >
                  Đăng ký ngay!!!
                </Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
