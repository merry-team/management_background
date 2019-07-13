import React, { Component } from "react";
import { Layout, Icon, Avatar } from "antd";
import { Route, Switch, Redirect } from "react-router-dom";
import "./Home.scss";
import GameTemplateList from "./game-template/game-template-list/GameTemplateList";
import GameTemplateDetail from "./game-template/game-template-detail/GameTemplateDetail";
import TaskDetail from "./task/task-detail/TaskDetail";
import { inject, observer } from "mobx-react";
import UserStore from "../../stores/UserStore";
import SiderMenu from "./sider-menu/SiderMenu";
import User from "./user/User";

const { Header, Content, Footer, Sider } = Layout;

interface HomeProps {
  userStore?: UserStore;
}

interface HomeState {
  collapsed: boolean;
}

@inject("userStore")
@observer
export default class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  logout = () => {
    const userStore = this.props.userStore!;
    userStore.logout();
  };

  render() {
    const loginUser = this.props.userStore!.loginUser;
    const collapsed = this.state.collapsed;
    if (!loginUser) {
      return <Redirect to="/login" />;
    }

    return (
      <Layout className="layout">
        <Sider
          className="sider"
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="logo">Management Background</div>
          <SiderMenu inlineCollapsed={collapsed} />
        </Sider>
        <Layout>
          <Header className="header">
            <Icon
              className="trigger"
              type={collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
            <div className="user-profile">
              <Avatar
                className="user-avatar"
                icon="user"
                src={loginUser.avatar}
              />
              {loginUser.name}
              <Icon className="logout" type="logout" onClick={this.logout} />
            </div>
          </Header>
          <Content className="content">
            <Switch>
              <Route
                path="/"
                exact={true}
                render={() => <Redirect to="/users" />}
              />
              <Route
                exact={true}
                path="/game_templates"
                component={GameTemplateList}
              />
              <Route
                exact={true}
                path="/game_templates/:gid"
                component={GameTemplateDetail}
              />
              {/* <Route exact={true} path="/game_templates/:gid/tasks" component={Task} /> */}
              <Route
                path="/game_templates/:gid/tasks/:tid"
                component={TaskDetail}
              />
              {/* <Route render={() => <div>404</div>} /> */}
              <Route path="/users" component={User} />
            </Switch>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}
