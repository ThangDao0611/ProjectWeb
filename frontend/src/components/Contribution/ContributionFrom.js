import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { END_POINT } from "../../config";

const ContributionFrom = ({ word,word_id, lang, setAdd }) => {
  const onFinish = (values) => {
    const type = lang == "anhviet" ? "en" : "vi";
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .post(
        END_POINT + "/api/add-contribution",
        {
          word_id: word_id,
          word: word,
          type: type,
          content: values.Example,
          content_mean: values.Mean,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        values.Example = "";
        values.Mean = "";
        setAdd(pre=> !pre);
      });
  };

  const onFinishFailed = (errorInfo) => {};

  return (
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
        label="Example"
        name="Example"
        rules={[
          {
            required: true,
            message: "Please input your Example!",
          },
        ]}
      >
        <Input allowClear />
      </Form.Item>

      <Form.Item
        label="Mean"
        name="Mean"
        rules={[
          {
            required: true,
            message: "Please input your Mean!",
          },
        ]}
      >
        <Input allowClear />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" className="btn-default">
          Xác nhận
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContributionFrom;
