import React, { Component } from "react";
import { Menu, Icon } from "antd";
import "./SiderMenu.scss";
import { inject, observer } from "mobx-react";
import SiderMenuStore from "../../../stores/SiderMenuStore";
import { Link } from "react-router-dom";

const MenuItem = Menu.Item;

interface SiderMenuProps {
  siderMenuStore?: SiderMenuStore;
  inlineCollapsed: boolean;
}

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1244296_vgb6nuix54c.js"
});

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
            <IconFont type="icon-game" />
            <span>Users</span>
          </Link>
        </MenuItem>
        <MenuItem className="sider-menu-item" key="game_templates">
          <Link to="/game_templates">
            <IconFont type="icon-game" />
            <span>Game Templates</span>
          </Link>
        </MenuItem>
      </Menu>
    );
  }
}
