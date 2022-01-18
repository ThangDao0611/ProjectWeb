import React, { useState, useEffect } from "react";
import { Descriptions } from "antd";
import axios from "axios";
import { END_POINT } from "../../config";

function UserInfo() {
  const [info, setInfo] = useState({ email: "", name: "" });

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    axios
      .get(END_POINT + "/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setInfo({ email: res.data.email, name: res.data.name });
      });
  }, []);

  return (
    <div>
      <Descriptions layout="vertical" size="small">
        <Descriptions.Item
          label="Tên người dùng"
          labelStyle={{ fontSize: "20px", fontWeight: "bold" }}
        >
          <span style={{ fontSize: "25px" }}>{info.name}</span>
        </Descriptions.Item>
        <Descriptions.Item
          label="Email"
          labelStyle={{ fontSize: "20px", fontWeight: "bold" }}
        >
          <span style={{ fontSize: "25px" }}>{info.email}</span>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default UserInfo;
