import React, { Component } from "react";
import { Menu, Icon } from "antd";
import "./SiderMenu.scss";
import { inject, observer } from "mobx-react";
import SiderMenuStore from "../../../stores/SiderMenuStore";

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
    return (
      <Menu className="sider-menu" theme="dark" mode="inline">
        <MenuItem className="sider-menu-item">
          <IconFont type="icon-game" />
          <span>Game Templates</span>
        </MenuItem>
        <MenuItem className="sider-menu-item">
          <IconFont type="icon-task" />
          <span>Tasks</span>
        </MenuItem>
      </Menu>
    );
  }
}
