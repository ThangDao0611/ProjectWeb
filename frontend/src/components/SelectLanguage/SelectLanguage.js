import React, { useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import axios from "axios";
import { Form, Select, Input, Button } from "antd";
import { ZhihuSquareFilled, SoundFilled } from "@ant-design/icons";
import { END_POINT } from "../../config";
import "./SelectLanguage.css";

export const SelectLanguage = () => {
  // localStorage.clear(); // NOTE: khi nào public thì xóa

  const { Option } = Select;
  const { TextArea } = Input;

  const [form] = Form.useForm();
  const { speak } = useSpeechSynthesis();

  const [lang1, setLang1] = useState("Anh");
  const [lang2, setLang2] = useState("Việt");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const check = localStorage.getItem("his")
    ? JSON.stringify(localStorage.getItem("his"))
    : [];

  const [his, setHis] = useState(check);

  function handleChangeinput(e) {
    setInput(e.target.value);
  }

  function handleChangelang1(value) {
    value === "Anh" ? setLang2("Việt") : setLang2("Anh");
    setLang1(value);
  }
  function handleSubmit(values) {
    if (input.length > 0) {
      setHis((data) => [...data, input]);

      localStorage.setItem("his", his);
      const request_lang = lang1 === "Việt" ? "en" : "vi";

      axios
        .get(END_POINT + "/api/translate-paragraph", {
          params: { type: request_lang, param: input },
        })
        .then((res) => {
          setOutput(res.data.param);
        });

      form
        .validateFields()
        .then((values) => {})
        .catch((errorInfo) => {});
    }
  }

  return (
    <div>
      <div>
        <h3 className="title-comm">
          <span className="title-holder title">Dịch đoạn văn</span>
        </h3>
      </div>

      <Form form={form}>
        <div className="container-language">
          <Form.Item>
            <Select
              style={{ width: 160, marginRight: "5px" }}
              className="language-input"
              name="lang1"
              value={lang1}
              onChange={handleChangelang1}
            >
              <Option value="Anh">Anh</Option>
              <Option value="Việt">Việt</Option>
            </Select>
            <Select
              style={{ width: 160, marginLeft: "5px" }}
              name="lang2"
              value={lang2}
            >
              <Option value="Việt">Việt</Option>
              <Option value="Anh">Anh</Option>
            </Select>
          </Form.Item>
        </div>
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
                className="btn-default btn-submit"
                onClick={handleSubmit}
                icon={<ZhihuSquareFilled />}
              >
                <span>Dịch</span>
              </Button>
            </Form.Item>

            <div className="output-translate mgt-30">
              <div className="output mg-20">{output}</div>
            </div>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
