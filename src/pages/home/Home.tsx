import React, { Component } from "react";
import { Layout } from "antd";
import { Route, Switch, Redirect } from "react-router-dom";
import "./Home.scss";
import GameTemplate from "./game-template/GameTemplate";
import GameTemplateDetail from "./game-template-detail/GameTemplateDetail";
import Task from "./task/Task";
import TaskDetail from "./task-detail/TaskDetail";

const { Header, Content, Footer } = Layout;

export default class Home extends Component<{}> {
  render() {
    return (
      <Layout className="layout">
        <Header className="header" />
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
