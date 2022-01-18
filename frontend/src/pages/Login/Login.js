import React from "react";
import { Layout } from "antd";
import LoginForm from "../../components/LoginForm/LoginForm";

function Login() {
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
              <LoginForm />
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default Login;
