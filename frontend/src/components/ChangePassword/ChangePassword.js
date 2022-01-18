import React from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { END_POINT } from "../../config";
import { useHistory } from "react-router-dom";
import "./ChangePassword.css";

function ChangPassword() {
  const token = JSON.parse(localStorage.getItem("token"));
  const history = useHistory();
  const onFinish = (values) => {
    console.log("Success:", values);
    axios
      .post(
        END_POINT + "/users/change-password",
        {
          oldPassword: values.currentpassword,
          newPassword: values.newpassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.message);
        if (res.status === 200) {
          localStorage.removeItem("token");
          axios
            .post(
              END_POINT + "/users/me/logout",
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              console.log(res.data.message);
              history.push("/login");
            });
        }
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        width: "100%",
        margin: "50px 0",
      }}
    >
      <Form
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 10,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Current Password"
          name="currentpassword"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password allowClear />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newpassword"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
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
                if (!value || getFieldValue("newpassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password allowClear />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            className="btn-default btn-changePassword"
          >
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ChangPassword;
