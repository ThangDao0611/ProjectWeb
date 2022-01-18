import React, { useState, useEffect } from "react";
import { Table, Button, Space, Modal, Form, Input } from "antd";
import { END_POINT } from "../../config";
import axios from "axios";

function Comment() {
  const token = JSON.parse(localStorage.getItem("token"));
  const [table, setTable] = useState({
    loading: false,
    data: [],
  });
  const [form, setForm] = useState({
    content: "",
    content_mean: "",
  });
  const [update, setUpdate] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async (id, type) => {
    setIsModalVisible(false);
    // await axios.post(END_POINT + '/api/update-contribution',{
    //   word_id: id, type: type,content:form.content,content_mean:form.content_mean
    // },{
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }).then((res) => {
    //   setUpdate(!update);
    // });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (id, type) => {
    await axios
      .post(
        END_POINT + "/api/remove-contribution",
        { word_id: id, type: type },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setUpdate(!update);
      });
  };

  const columns = [
    {
      title: "Word",
      dataIndex: "word",
      key: "word",
    },
    {
      title: "Example",
      dataIndex: "content",
      key: "content",
    },

    {
      title: "Mean of Example",
      dataIndex: "content_mean",
      key: "content_mean",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
            <a onClick={showModal}>Update</a>

            <Modal
              title="Cập nhật"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button className="btn-default" onClick={handleCancel}>
                  Huỷ
                </Button>,
                <Button
                  key="submit"
                  htmlType="submit"
                  type="primary"
                  className="btn-default"
                  onClick={handleOk(record.id, record.type)}
                >
                  Xác Nhận
                </Button>,
              ]}
            >
              <div style={{ width: "80%" }}>
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
                  autoComplete="off"
                >
                  <Form.Item
                    label="Example"
                    name="Example"
                    onChange={(value) =>
                      setForm((prevState) => ({
                        ...form,
                        content: value.target.value,
                      }))
                    }
                    // initialValue={record.content}
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
                    // initialValue={record.content_mean}
                    onChange={(value) =>
                      setForm((prevState) => ({
                        ...form,
                        content_mean: value.target.value,
                      }))
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please input your Mean!",
                      },
                    ]}
                  >
                    <Input allowClear />
                  </Form.Item>
                </Form>
              </div>
            </Modal>

            <a onClick={() => handleDelete(record.id, record.type)}>Delete</a>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    setTable({ loading: true });
    axios
      .get(END_POINT + "/api/get-my-contribution", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let data = res.data.list;
        const dataSource = [];
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            dataSource.push(
              new Object({
                key: i + "",
                id: data[i]._id,
                type: data[i].type,
                word: data[i].word,
                content: data[i].content,
                content_mean: data[i].content_mean,
                date: data[i].day,
              })
            );
          }
        }
        setTable({ loading: false, data: dataSource });
      });
  }, [update]);
  return (
    <div>
      <Table
        loading={table.loading}
        columns={columns}
        dataSource={table.data}
      />
    </div>
  );
}

export default Comment;
