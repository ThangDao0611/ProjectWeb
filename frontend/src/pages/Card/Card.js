import React from "react";
import { FlashcardComponent } from "./FlashCard";
import { Layout, Typography } from "antd";
import { useHistory } from "react-router-dom";

function Card() {
  const { Content } = Layout;
  const { Title } = Typography;
  const list_word = localStorage.getItem("word_card")
    ? JSON.parse(localStorage.getItem("word_card"))
    : [];
  const history = useHistory();
  let cardData = [];
  for (let i = 0; i < list_word.length; i++) {
    cardData.push(
      new Object({
        front: {
          text: list_word[i].word,
        },
        back: {
          text: list_word[i].mean,
        },
      })
    );
  }

  return (
    <Layout>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: "64px" }}
      >
        <div className="site-layout-background">
          <div className="container">
            <h3 className="title-comm">
              <span className="title-holder title">Học từ mới</span>
            </h3>

            <FlashcardComponent
              dataSource={cardData}
              onFinish={() => history.push("/myword")}
            />
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default Card;
