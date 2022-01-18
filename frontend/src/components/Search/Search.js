import React, { useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { END_POINT } from "../../config";
import axios from "axios";
import {
  Form,
  Select,
  Input,
  AutoComplete,
  Table,
  Modal,
  Button,
  message,
  notification,
} from "antd";
import {
  AudioOutlined,
  HistoryOutlined,
  SoundFilled,
  FileImageOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ContributionFrom from "../Contribution/ContributionFrom";
import "./Search.css";

function Search() {
  // localStorage.clear(); // NOTE: khi nào public thì xóa

  const [list, setList] = useState([]);
  const { speak } = useSpeechSynthesis();

  const word = {
    _id: "",
    wType: [],
    means: [],
    examples: [],
    examplesVn: [],
    word: "",
    spell: "",
    __v: 0,
  };

  const columns = [
    {
      title: "Example",
      dataIndex: "examples",
      key: "examples",
    },
    {
      title: "Mean of Example",
      dataIndex: "examplesVn",
      key: "examplesVn",
    },
  ];

  const columnsEn = [
    {
      title: "Example",
      dataIndex: "examples",
      key: "examples",
    },
    {
      title: "Mean of Example",
      dataIndex: "examplesEn",
      key: "examplesEn",
    },
  ];

  const columnsMean = [
    {
      title: "Means",
      dataIndex: "mean",
      key: "mean",
    },
  ];

  const [table, setTable] = useState({
    loading: false,
    data: [],
    means: [],
  });

  const [con, setCon] = useState({
    loading: false,
    data: [],
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    setHis([]);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const notificationError = (type) => {
    notification[type]({
      description: "Không có từ này trong từ điển!!!",
      duration: 5,
    });
  };

  const notificationWarning = (type) => {
    notification[type]({
      description: "Hoặc là bạn đang để sai chế độ tra cứu!!!",
      duration: 5,
    });
  };

  const [lang, setLang] = useState("anhviet");

  const { Option } = Select;

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );

  const [input, setInput] = useState("");
  const [output, setOutput] = useState(word);
  let check = localStorage.getItem("his_search")
    ? JSON.parse(localStorage.getItem("his_search"))
    : [];
  const [his, setHis] = useState(check);
  useEffect(() => {
    const request_lang = lang === "anhviet" ? "en" : "vi";
    if (input.length > 0) {
      setList([]);
      axios
        .get(END_POINT + "/api/recommend-search", {
          params: { lang: request_lang, word: input },
        })
        .then((res) => {
          let data = res.data;

          let l = data.word;

          l = l
            .map((word) => {
              return { value: word.word };
            })
            .reverse();

          l.shift();

          setList(l);
        });
    } else {
      setList([""]);
    }
  }, [input]);

  const handleChangeTmp = (e) => {
    setInput(e);
  };

  function handleChangelang(e) {
    setLang(e);
  }
  useEffect(() => {
    localStorage.setItem("his_search", JSON.stringify(his));
  }, [his]);

  const [add,setAdd] = useState(true)
  useEffect(() => {
    if(output.word.length > 0)
      handleSubmit();
  }, [add]);

  const handleSubmit = async (e) => {
    input.trim();
    input.toLowerCase();
    const request_lang = lang === "anhviet" ? "en" : "vi";
    setTable({ loading: true });
    setCon({ loading: true });
    let id;
    await axios
      .get(END_POINT + "/api/search-word", {
        params: { lang: request_lang, word: input },
      })
      .then(async (res) => {
        let data = res.data;
        if (!Object.prototype.hasOwnProperty.call(data, "auto")) {
          id = data.word._id;
          let dataSource = [];
          let meanSource = [];
          if (data.word.examples && data.word.examples.length > 0) {
            for (let i = 0; i < data.word.examples.length; i++) {
              dataSource.push(
                lang === "anhviet"
                  ? new Object({
                      key: i + "",
                      examples: data.word.examples[i],
                      examplesVn: data.word.examplesVn[i],
                    })
                  : new Object({
                      key: i + "",
                      examples: data.word.examples[i],
                      examplesEn: data.word.examplesEn[i],
                    })
              );
            }
          }
          for (let i = 0; i < data.word.means.length; i++) {
            meanSource.push(
              new Object({
                key: i + "",
                mean: data.word.means[i],
              })
            );
          }
          setTable({ loading: false, data: dataSource, mean: meanSource });
          setOutput((output) => {
            return { ...output, ...data.word };
          });
          let update = new Object({ word: input, mean: data.word.means });
          let isExist = 0;
          for (let i = 0; i < his.length; i++) {
            if (his[i].word === update.word) {
              isExist = 1;
              break;
            }
          }
          if (isExist === 0) {
            if (update.mean) {
              await setHis((pre) => {
                return [update, ...pre];
              });
            }
          }
          isExist = 0;
        } else {
          notificationError("error");
          notificationWarning("warning");
        }
      });

    await axios
      .get(END_POINT + "/api/get-contribution", {
        params: {
          word_id: id,
          type: request_lang,
        },
      })
      .then((res) => {
        let data = res.data.list;
        const dataSource = [];
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            dataSource.push(
              lang === "anhviet"
                ? new Object({
                    key: i + "",
                    examples: data[i].content,
                    examplesVn: data[i].content_mean,
                  })
                : new Object({
                    key: i + "",
                    examples: data[i].content,
                    examplesEn: data[i].content_mean,
                  })
            );
          }
        }
        setCon({ loading: false, data: dataSource });
      });
  };

  const onSelect = (data) => {
    setInput(data);
  };

  return (
    <div>
      <div>
        <h3 className="title-comm">
          <span className="title-holder title">Tra từ</span>
        </h3>
      </div>

      <Form onSubmit={handleSubmit} className="search-form">
        <div className="container-search">
          <div className="select">
            <Select
              onChange={handleChangelang}
              value={lang}
              style={{ width: 160 }}
              name="languages"
              className="switch-language"
            >
              <Option value="anhviet">Anh-Việt</Option>
              <Option value="vietanh">Việt-Anh</Option>
            </Select>
          </div>

          <div className="search">
            <AutoComplete
              value={input}
              dataSource={list}
              onSelect={onSelect}
              onSearch={handleChangeTmp}
              style={{ width: "100%" }}
            >
              <Input.Search
                onSearch={handleSubmit}
                size="large"
                placeholder="Tra Từ"
                // suffix={suffix}
                allowClear
                enterButton
                style={{ width: "100%" }}
              />
            </AutoComplete>
          </div>
        </div>

        <div className="box-history-btn">
          <Button
            type="primary"
            shape="round"
            icon={<HistoryOutlined className="icon-default" />}
            size="large"
            onClick={showModal}
            className="btn-default btn-history mga easing-variables"
          />
        </div>

        <Modal
          title="Lịch sử tra cứu"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button
              type="primary"
              className="btn-default"
              onClick={handleDelete}
            >
              <DeleteOutlined />
            </Button>,
            <Button type="primary" className="btn-default" onClick={handleOk}>
              Ok
            </Button>,
          ]}
        >
          <div className="overflow-scroll-gradient">
            <div className="overflow-scroll-gradient__scroller">
              {his &&
                his.map((item) => (
                  <div className="row no-margin">
                    <div className="content-history">
                      <p className="truncate-text">
                        <span>{item.word}</span>
                      </p>
                      <hr />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Modal>

        {output.word.length > 0 && (
          <div className="box-word">
            <ul className="word cl-blue">
              <li className="mg-20">
                <div>
                  <div style={{ display: "inline-block" }}>
                    <span className="word-css cl-blue">Word:</span>
                    <span className="font mg-20">{output.word}</span>
                    <span className="font">
                      <SoundFilled
                        className="speaker-icon"
                        onClick={() => speak({ text: output.word })}
                      />
                    </span>
                  </div>

                </div>
              </li>
              <li className="mg-20">
                <div>
                  <span className="word-css cl-blue">Spell:</span>
                  <span className="font mg-20">{output.spell}</span>
                  <span className="font">
                    <SoundFilled
                      className="speaker-icon"
                      onClick={() => speak({ text: output.word })}
                    />
                  </span>
                </div>
              </li>
              <li className="mg-20">
                <div>
                  <span className="word-css cl-blue">Type:</span>
                  <span className="font mg-20">{output.wType}</span>
                </div>
              </li>
              <li className="mg-20">
                <div>
                  <span className="word-css cl-blue">Means:</span>

                  <div className="table-means">
                    <Table
                      dataSource={table.mean}
                      columns={columnsMean}
                      loading={table.loading}
                      size="small"
                      className="paragraph font mg-20"
                    />
                  </div>
                </div>
              </li>
              <li className="mg-20">
                <div>
                  <span className=" word-css cl-blue">Example && Mean:</span>
                  <div className="table-example">
                    <Table
                      dataSource={table.data}
                      columns={lang === "anhviet" ? columns : columnsEn}
                      loading={table.loading}
                      size="small"
                      className="paragraph font mg-20"
                    />
                  </div>
                </div>
              </li>
              <li className="mg-20">
                <div>
                  <span className=" word-css cl-blue">Contribution:</span>
                  <div className="table-example">
                    <Table
                      dataSource={con.data}
                      columns={lang === "anhviet" ? columns : columnsEn}
                      loading={con.loading}
                      size="small"
                      className="paragraph font mg-20"
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        )}
      </Form>

      {localStorage.getItem("token") && output._id && (
        <div style={{ marginTop: "50px" }}>
          <div className="box-word">
            <div style={{ margin: "10px 0" }}>
              <h1 style={{ textAlign: "center" }}>Thêm ví dụ</h1>
            </div>

            <div style={{ width: "80%", margin: "10px 0" }}>
              <ContributionFrom
                word={output.word}
                word_id={output._id}
                lang={lang}
                setAdd={setAdd}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
