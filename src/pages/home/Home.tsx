import React, { Component } from "react";
import { Layout } from "antd";
import { Route, Switch, Redirect } from "react-router-dom";
import "./Home.scss";
import GameTemplate from "./game-template/GameTemplate";
import GameTemplateDetail from "./game-template-detail/GameTemplateDetail";
import Task from "./task/Task";
import TaskDetail from "./task-detail/TaskDetail";
import { inject, observer } from "mobx-react";
import UserStore from "../../stores/UserStore";

const { Header, Content, Footer } = Layout;

interface HomeProps {
  userStore?: UserStore;
}

@inject("userStore")
@observer
export default class Home extends Component<HomeProps> {
  render() {
    const loginUser = this.props.userStore!.loginUser;
    if (!loginUser) {
      return <Redirect to="/login" />;
    }

    return (
      <Layout className="layout">
        <Header className="header">
          <div style={{ color: "#fff" }}>{loginUser.name}</div>
        </Header>
        <Content>
          <Switch>
            <Route
              path="/"
              exact={true}
              render={() => <Redirect to="/game_templates" />}
            />
            <Route
              exact={true}
              path="/game_templates"
              component={GameTemplate}
            />
            <Route path="/game_templates/:gid" component={GameTemplateDetail} />
            <Route exact={true} path="/tasks" component={Task} />
            <Route path="/tasks/:tid" component={TaskDetail} />
            {/* <Route render={() => <div>404</div>} /> */}
          </Switch>
        </Content>
        <Footer />
      </Layout>
    );
  }
}
