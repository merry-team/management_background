import "./SiderMenu.scss";

import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { IconFont } from "../../../constants";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import SiderMenuStore from "../../../stores/SiderMenuStore";

const MenuItem = Menu.Item;

interface SiderMenuProps {
  siderMenuStore?: SiderMenuStore;
  inlineCollapsed: boolean;
}

@inject("siderMenuStore")
@observer
export default class SiderMenu extends Component<SiderMenuProps> {
  render() {
    const siderMenuStore = this.props.siderMenuStore!;
    const { currentRoute } = siderMenuStore;

    return (
      <Menu
        className="sider-menu"
        theme="dark"
        mode="inline"
        selectedKeys={[currentRoute]}
      >
        <MenuItem className="sider-menu-item" key="users">
          <Link to="/users">
            <IconFont type="icon-user" className="icon" />
            <span>Users</span>
          </Link>
        </MenuItem>
        <MenuItem className="sider-menu-item" key="game_templates">
          <Link to="/game_templates">
            <IconFont type="icon-game" className="icon" />
            <span>Game Templates</span>
          </Link>
        </MenuItem>
      </Menu>
    );
  }
}
