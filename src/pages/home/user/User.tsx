import React, { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";
import { Table, Avatar, Select, Modal, Input } from "antd";
import "./User.scss";
import UserModel from "../../../models/UserModel";
import { userStore } from "../../../stores";
import moment from "moment";
import { dateFormat } from "constants/index";
import { RoleType, roleMaps } from "../../../apis/interface/User";

const { Option } = Select;
const { confirm } = Modal;
const { Search } = Input;

function User() {
  const [per] = useState(10);
  const { pager } = userStore;
  const [roleValue, setRoleValue] = useState<RoleType | "全部">("全部");

  const fetchUsers = (
    page: number,
    roleName?: RoleType | "全部",
    keyword?: string
  ) => {
    if (roleName === "全部" && keyword) {
      //return userStore.getUserList(page,per, void, keyword)
    }
    if (roleName !== "全部" && keyword) {
      return userStore.getUserList(page, per, roleName, keyword);
    }
    if (roleName === "全部") {
      return userStore.getUserList(page, per);
    } else {
      return userStore.getUserList(page, per, roleName);
    }
  };

  const updateRole = (id: string, role: RoleType) => {
    confirm({
      title: "确定更新用户权限？",
      content: "这操作请谨慎！！",
      async onOk() {
        await userStore.modifyUserPermission(id, role);
        setTimeout(() => fetchUsers(pager ? pager.current_page : 1), 200);
      }
    });
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "姓名", dataIndex: "name", key: "name" },
    { title: "账号", dataIndex: "account", key: "account" },
    {
      title: "头像",
      dataIndex: "avatar",
      key: "avatar",
      render: (text: string, item: UserModel) => (
        <Avatar className="user-avatar" icon="user" src={item.avatar} />
      )
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      key: "created_at",
      render: (text: string, item: UserModel) => (
        <span>{moment(item.created_at).format(dateFormat)}</span>
      )
    },
    {
      title: "权限",
      dataIndex: "roles",
      key: "roles",
      width: 100,
      render: (text: string, item: UserModel) => (
        <Select
          value={item.roles[0]}
          style={{ width: 120 }}
          onChange={(v: RoleType) => updateRole(item.id.toString(), v)}
        >
          {roleMaps.map((role, index) => (
            <Option value={role} key={index}>
              {role}
            </Option>
          ))}
        </Select>
      )
    }
  ];

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const filterRoleUsers = (value: RoleType | "全部") => {
    setRoleValue(value);
    value === "全部"
      ? fetchUsers(pager ? pager.current_page : 1)
      : fetchUsers(1, value);
  };

  return (
    <div className="user">
      <div className="actions-wrap">
        <Select
          style={{ width: 120 }}
          value={roleValue}
          onChange={(v: RoleType | "全部") => filterRoleUsers(v)}
        >
          <Option value={"全部"}>全部</Option>
          {roleMaps.map((role, index) => (
            <Option value={role} key={index}>
              {role}
            </Option>
          ))}
        </Select>
        <Search
          placeholder="搜索名字"
          enterButton="Search"
          onSearch={(value: string) => fetchUsers(1, roleValue, value)}
          style={{ width: 300 }}
        />
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={userStore.users}
        rowKey={record => record.id.toString()}
        pagination={{
          current: pager ? pager.current_page : 1,
          pageSize: per,
          total: pager ? pager.total_count : 0,
          onChange: (page: number) => fetchUsers(page, roleValue)
        }}
      />
    </div>
  );
}

export default inject("userStore")(observer(User));
