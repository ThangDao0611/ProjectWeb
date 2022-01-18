import React from "react";
import { Layout, Typography, Space } from "antd";
import { FacebookFilled, GithubFilled } from "@ant-design/icons";
import "./Footer.css";

function Footer() {
  const { Footer } = Layout;
  const { Text } = Typography;

  return (
    <div>
      <Layout>
        <Footer style={{ textAlign: "center" }}>
          <Space direction="vertical">
            <div className="text-footer">
              <div className="footer-item mga">
                <Text strong>
                  <span
                    style={{ fontSize: "20px" }}
                    className="hover-underline-animation"
                  >
                    1. Đào Mạnh Thắng - Mssv: 20184193
                  </span>
                  <a
                    href="https://www.facebook.com/BFFLei"
                    title="Facebook cá nhân"
                    target="_blank"
                  >
                    <FacebookFilled className="icon-default mgl-20" />
                  </a>

                  <a
                    href="https://github.com/ThangDao0611"
                    title="Github cá nhân"
                    target="_blank"
                    className="github-link"
                  >
                    <GithubFilled className="icon-default mgl-10" />
                  </a>
                </Text>
              </div>

              <div className="footer-item mga">
                <Text strong>
                  <span
                    style={{ fontSize: "20px" }}
                    className="hover-underline-animation"
                  >
                    2. Trần Thăng Đức - Mssv: 20184076
                  </span>
                  <a
                    href="https://www.facebook.com/DucTran2x"
                    title="Facebook cá nhân"
                    target="_blank"
                  >
                    <FacebookFilled className="icon-default mgl-20" />
                  </a>

                  <a
                    href="https://github.com/tranthangduc"
                    title="Github cá nhân"
                    target="_blank"
                    className="github-link"
                  >
                    <GithubFilled className="icon-default mgl-10" />
                  </a>
                </Text>
              </div>

              <div className="footer-item mga">
                <Text strong>
                  <span
                    style={{ fontSize: "20px" }}
                    className="hover-underline-animation"
                  >
                    3. Trần Hoàng Long Hải - Mssv: 20184090
                  </span>
                  <a
                    href="https://www.facebook.com/tranhoanglonghai"
                    title="Facebook cá nhân"
                    target="_blank"
                  >
                    <FacebookFilled className="icon-default mgl-20" />
                  </a>

                  <a
                    href="https://github.com/tranhoanglonghai2k"
                    title="Github cá nhân"
                    target="_blank"
                    className="github-link"
                  >
                    <GithubFilled className="icon-default mgl-10" />
                  </a>
                </Text>
              </div>
            </div>
          </Space>
        </Footer>
      </Layout>
    </div>
  );
}

export default Footer;
