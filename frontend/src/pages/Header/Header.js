import React from "react";
import { Layout, Menu, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  HomeFilled,
  ZhihuSquareFilled,
  CheckCircleFilled,
  BookFilled,
  ProfileFilled,
} from "@ant-design/icons";
import axios from "axios";
import { END_POINT } from "../../config";
import "./Header.css";

function Header() {
  const { Header } = Layout;
  const token = JSON.parse(localStorage.getItem("token"));
  const history = useHistory();
  let check = false;
  if (localStorage.getItem("token")) {
    check = true;
  }

  function confirm(e) {
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
        message.success("Đăng xuất thành công!!!", 2);
        history.push("/");
      });
  }

  function cancel(e) {
    message.error("Đăng xuất thất bại!!!", 2);
  }

  return (
    <div>
      <Layout>
        {check ? (
          <Header
            id="header"
            style={{ position: "fixed", zIndex: 100, width: "100%" }}
          >
            <div className="header-content-default">
              <div className="logo">
                <Link to="/">
                  <img
                    src="./cropped-logo-3.png"
                    alt="logo"
                    border="0"
                    className="logo-dict"
                  ></img>
                </Link>
              </div>

              <Menu className="menu" mode="horizontal">
                <Menu.Item
                  key="1"
                  icon={<HomeFilled className="icon-default" />}
                >
                  <Link to="/">
                    <span>Tra cứu</span>
                  </Link>
                </Menu.Item>

                <Menu.Item
                  key="2"
                  icon={<ZhihuSquareFilled className="icon-default" />}
                >
                  <Link to="/translate">
                    <span>Dịch</span>
                  </Link>
                </Menu.Item>

                <Menu.Item
                  key="3"
                  icon={<CheckCircleFilled className="icon-default" />}
                >
                  <Link to="/grammar">
                    <span>Ngữ pháp</span>
                  </Link>
                </Menu.Item>

                <Menu.Item
                  key="4"
                  icon={<BookFilled className="icon-default" />}
                >
                  <Link to="/myword">
                    <span>Học từ vựng</span>
                  </Link>
                </Menu.Item>

                <Menu.Item
                  key="5"
                  icon={<ProfileFilled className="icon-default" />}
                >
                  <Link to="/myinfo">
                    <span>Thông tin</span>
                  </Link>
                </Menu.Item>

                <Menu.Item key="6">
                  <Popconfirm
                    title="Bạn chắc chưa?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <div style={{ height: "80px" }} className="logout">
                      <span>Đăng xuất</span>
                    </div>
                  </Popconfirm>
                </Menu.Item>
              </Menu>
            </div>
          </Header>
        ) : (
          <div>
            <Header
              id="header"
              style={{ position: "fixed", zIndex: 100, width: "100%" }}
            >
              <div className="header-content-default">
                <div className="logo">
                  <Link to="/">
                    <img
                      src="./cropped-logo-3.png"
                      border="0"
                      alt="logo"
                      className="logo-dict"
                    ></img>
                  </Link>
                </div>

                <Menu className="menu" mode="horizontal">
                  <Menu.Item
                    key="1"
                    icon={<HomeFilled className="icon-default" />}
                  >
                    <Link to="/">
                      <span>Tra cứu</span>
                    </Link>
                  </Menu.Item>

                  <Menu.Item
                    key="2"
                    icon={<ZhihuSquareFilled className="icon-default" />}
                  >
                    <Link to="/translate">
                      <span>Dịch</span>
                    </Link>
                  </Menu.Item>

                  <Menu.Item
                    key="3"
                    icon={<CheckCircleFilled className="icon-default" />}
                  >
                    <Link to="/grammar">
                      <span>Ngữ pháp</span>
                    </Link>
                  </Menu.Item>

                  <Menu.Item
                    key="4"
                    icon={<BookFilled className="icon-default" />}
                  >
                    <Link to="/myword">
                      <span>Học từ vựng</span>
                    </Link>
                  </Menu.Item>

                  <Menu.Item key="5">
                    <Link to="/login">
                      <span>Đăng nhập</span>
                    </Link>
                  </Menu.Item>

                  <Menu.Item key="6">
                    <Link to="/signup">
                      <span>Đăng ký</span>
                    </Link>
                  </Menu.Item>
                </Menu>
              </div>
            </Header>
          </div>
        )}
      </Layout>
    </div>
  );
}

export default Header;
