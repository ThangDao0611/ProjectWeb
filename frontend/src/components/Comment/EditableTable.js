import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Space,
} from "antd";
import { END_POINT } from "../../config";
import axios from "axios";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [update, setUpdate] = useState(false);
  const [table, setTable] = useState({
    loading: false,
    data: [],
  });

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      content: "",
      content_mean: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...table.data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        let item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        item = newData[index];
        await axios
          .post(
            END_POINT + "/api/update-contribution",
            {
              word_id: item.id,
              type: item.type,
              content: item.content,
              content_mean: item.content_mean,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            setUpdate(!update);
          });
        setEditingKey("");
      } else {
        setEditingKey("");
      }
    } catch (errInfo) {}
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
      editable: true,
    },

    {
      title: "Mean of Example",
      dataIndex: "content_mean",
      key: "content_mean",
      editable: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      dataIndex: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
            <a onClick={() => handleDelete(record.id, record.type)}>Delete</a>
          </Space>
        );
      },
    },
    {
      dataIndex: "edit",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
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

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        loading={table.loading}
        bordered
        dataSource={table.data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default EditableTable;
