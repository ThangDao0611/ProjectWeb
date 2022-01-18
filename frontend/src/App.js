import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { BackTop } from "antd";
import Header from "./pages/Header/Header";
import Footer from "./pages/Footer/Footer";
import Home from "./pages/Home/Home";
import Translate from "./pages/Translate/Translate";
import Grammar from "./pages/Grammar/Grammar";
import MyWord from "./pages/MyWord/MyWord";
import Login from "./pages/Login/Login";
import Signup from "./pages/Sign up/Signup";
import MyInfo from "./pages/MyInfo/MyInfo";
import MyPassword from "./pages/MyPassword/MyPassword";
import MyComment from "./pages/MyComment/MyComment";
import Card from "./pages/Card/Card";
import Error from "./pages/Error/Error";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/translate" component={Translate} />
          <Route path="/grammar" component={Grammar} />
          <Route path="/myword" component={MyWord} />
          <Route path="/card" component={Card} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/myinfo" component={MyInfo} />
          <Route path="/mypassword" component={MyPassword} />
          <Route path="/mycomment" component={MyComment} />
          <Route path="/:somestring" component={Error} />
        </Switch>

        <BackTop />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
