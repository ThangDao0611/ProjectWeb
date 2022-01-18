import React from "react";
import { Layout } from "antd";
import Search from "../../components/Search/Search";

function Home() {
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
              <Search />
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default Home;
