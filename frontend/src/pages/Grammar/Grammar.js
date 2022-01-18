import React from "react";
import { Layout } from "antd";
import { CheckGrammar } from "../../components/CheckGrammar/CheckGrammar";

function Grammar() {
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
              <CheckGrammar />
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default Grammar;
