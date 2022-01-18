import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import ChangePassword from "../../components/ChangePassword/ChangePassword";

function MyComment() {
  const { Content, Sider } = Layout;

  return (
    <div>
      <Layout>
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: "64px" }}
        >
          <div className="site-layout-background">
            <h3 className="title-comm">
              <span className="title-holder title">Mật khẩu của tôi</span>
            </h3>

            <Layout style={{ padding: "24px 0", backgroundColor: "#fff" }}>
              <Sider style={{ backgroundColor: "#fff" }} width={200}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["2"]}
                  style={{ height: "100%" }}
                >
                  <Menu.Item key="1" icon={<UserOutlined />}>
                    <Link to="/myinfo">Thông tin</Link>
                  </Menu.Item>
                  <Menu.Item key="2" icon={<LaptopOutlined />}>
                    <Link to="/mypassword">Đổi mật khẩu</Link>
                  </Menu.Item>
                  <Menu.Item key="3" icon={<CommentOutlined />}>
                    <Link to="/mycomment">Đóng góp</Link>
                  </Menu.Item>
                </Menu>
              </Sider>

              <Content style={{ padding: "0 24px", minHeight: 280 }}>
                <ChangePassword />
              </Content>
            </Layout>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default MyComment;
