import React from "react";
import { Layout } from "antd";

function Error() {
  const { Content } = Layout;

  return (
    <div>
      <Layout>
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: "64px" }}
        >
          <div className="site-layout-background">
            <div className="container">
              <h1>Đây là Trang lỗi</h1>
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default Error;
