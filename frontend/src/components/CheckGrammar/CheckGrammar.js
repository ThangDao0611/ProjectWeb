import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Popover } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { END_POINT } from "../../config";
import "./CheckGrammar.css";

export const CheckGrammar = () => {
  const { TextArea } = Input;

  const [form] = Form.useForm();

  const [input, setInput] = useState("Plese input");
  const [output, setOutput] = useState([]);

  function handleChangeinput(e) {
    setInput(e.target.value);
  }

  function handleSubmit() {
    axios
      .get(END_POINT + "/api/grammar-check", {
        params: { text: input },
      })
      .then((res) => {
        let offset = [];
        let length = [];
        let replacements = [];
        let message = [];

        if (res.data.text.matches.length > 0) {
          res.data.text.matches.map((item) => {
            offset.push(item.offset);
            length.push(item.length);
            replacements.push(item.replacements);
            message.push(item.message);
          });
        }

        let returnString = [];
        let word = "";
        let title = "";
        let replacement = [];
        for (let i = 0; i < input.length; i++) {
          if (i == offset[0]) {
            if (word.length > 0)
              returnString.push(
                new Object({
                  word: word,
                  title: title,
                  replacement: replacement,
                })
              );
            word = "";
            title = message.shift();
            for (let j = i; j < offset[0] + length[0]; j++) {
              word += input[j];
            }
            i += length[0];
            replacement = replacements.shift();
            returnString.push(
              new Object({ word: word, title: title, replacement: replacement })
            );
            offset.shift();
            length.shift();
            word = "";
            title = "";
            replacement = [];
          } else {
            word += input[i];
          }
        }

        if (word.length > 0) {
          returnString.push(
            new Object({ word: word, title: title, replacement: replacement })
          );
        }

        setOutput(returnString);
      });
    form
      .validateFields()
      .then((values) => {})
      .catch((errorInfo) => {});
  }

  const content = (replace) => {
    if (replace) {
      return replace.map((item) => {
        return (
          <div>
            <p>{item.value}</p>
          </div>
        );
      });
    } else {
      return;
    }
  };

  return (
    <div>
      <h3 className="title-comm">
        <span className="title-holder title">Kiểm tra ngữ pháp</span>
      </h3>

      <Form form={form} onFinish={handleSubmit}>
        <div className="container-translate mgt-10">
          <Form.Item>
            <TextArea
              rows={4}
              showCount
              maxLength={5000}
              allowClear
              name="input"
              onChange={handleChangeinput}
              className="textarea"
            />

            <Form.Item>
              <Button
                className="btn-default btn-submit "
                htmlType="submit"
                icon={<CheckCircleFilled />}
              >
                <span>Kiểm tra</span>
              </Button>
            </Form.Item>

            <div className="output-translate mgt-30">
              <div className="output mg-20">
                {output.map((item) => {
                  if (item.title) {
                    return (
                      <Popover
                        content={content(item.replacement)}
                        title={item.title}
                      >
                        <mark className="highlight mg-1">{item.word}</mark>
                      </Popover>
                    );
                  } else {
                    return item.word;
                  }
                })}
              </div>
            </div>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
