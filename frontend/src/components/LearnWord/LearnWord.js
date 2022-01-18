import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import "./LearnWord.css";
// import { prettyDOM } from "@testing-library/react";

const columns = [
  {
    title: "Word",
    dataIndex: "word",
    key: "word",
  },
  {
    title: "Mean",
    dataIndex: "mean",
    key: "mean",
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    localStorage.setItem("word_card", JSON.stringify(selectedRows));
  },
};

let check = localStorage.getItem("his_search")
  ? JSON.parse(localStorage.getItem("his_search"))
  : [];
function LearnWord() {
  const [table, setTable] = useState({
    loading: false,
    data: [],
  });
  const [selectionType, setSelectionType] = useState("checkbox");
  useEffect(() => {
    check = localStorage.getItem("his_search")
      ? JSON.parse(localStorage.getItem("his_search"))
      : [];
  }, [localStorage.getItem("his_search")]);
  useEffect(async () => {
    let data1 = [];
    setTable({ data: [], loading: true });
    let mean = [];
    for (let i = 0; i < check.length; i++) {
      if (check[i].mean.length > 5) {
        check[i].mean.splice(4);
      }
      await data1.push(
        new Object({
          key: i + "",
          word: check[i].word,
          mean: check[i].mean,
        })
      );
    }
    setTable({ loading: false, data: data1 });
  }, []);

  return (
    <div>
      <div className="word-list">
        <h3 className="title-comm">
          <span className="title-holder title">Chọn từ</span>
        </h3>
      </div>

      <div>
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={table.data}
          loading={table.loading}
        />
      </div>

      <div className="btn-learn-word">
        <Button
          className="btn-default btn-learn mga"
          type="primary"
          href="/card"
        >
          Xác nhận
        </Button>
      </div>
    </div>
  );
}

export default LearnWord;
