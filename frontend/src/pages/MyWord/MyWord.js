import React from "react";
import { Layout } from "antd";
import LearnWord from "../../components/LearnWord/LearnWord";

function MyWord() {
  const { Content } = Layout;

  return (
    <Layout>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: "64px" }}
      >
        <div className="site-layout-background">
          <div className="container">
            <LearnWord />
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default MyWord;
