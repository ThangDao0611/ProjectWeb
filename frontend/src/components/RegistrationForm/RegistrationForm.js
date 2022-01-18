import React, { useState } from "react";
import { Form, Input, Typography, Button } from "antd";
import { register } from "../AuthService/AuthService ";
import { useHistory } from "react-router-dom";
import "./RegistrationForm.css";

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
  const { Title } = Typography;
  const history = useHistory();
  const [form] = Form.useForm();

  const [regis, setRegis] = useState({
    username: "",
    email: "",
    password: "",
    // confirm: "",
  });

  function handleChange(values) {
    const id = values.target.id;
    const array = id.split("_");

    setRegis({
      ...regis,
      [array[1]]: values.target.value,
    });
  }

  async function handleSubmit(e) {
    await register(regis.username, regis.email, regis.password);
    history.push("/");
  }

  const onFinish = (values) => {};

  return (
    <div>
      <h3 className="title-comm">
        <span className="title-holder title">Đăng ký</span>
      </h3>

      <div className="sign-up-form">
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          style={{ alignItems: "center" }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            onChange={handleChange}
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input allowClear />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            onChange={handleChange}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password allowClear />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password allowClear />
          </Form.Item>

          <Form.Item
            name="username"
            onChange={handleChange}
            label="Name"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input allowClear />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              className="btn-default btn-submit btn-registration"
              type="primary"
              htmlType="submit"
              onClick={handleSubmit}
            >
              <span style={{ fontSize: "18px" }}>Đăng ký</span>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegistrationForm;
