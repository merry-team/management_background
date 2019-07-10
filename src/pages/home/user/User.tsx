import React, { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";
import { Table, Avatar, Button, Icon } from "antd";
import "./User.scss";
import UserModel from "../../../models/UserModel";
import { userStore } from "../../../stores";
import moment from "moment";
import { dateFormat } from "constants/index";
import { RoleType } from "../../../apis/interface/User";

function User() {
  const [currentPage, setCurrentPage] = useState(1);
  const [per] = useState(10);

  const columns = [
    {
      title: (
        <Icon
          type="plus-circle"
          theme="twoTone"
          style={{ cursor: "pointer", fontSize: 18 }}
        />
      ),
      dataIndex: "create",
      key: "create",
      align: "center" as "center"
    },
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
      render: (text: string, item: UserModel) =>
        item.roles.map((item: RoleType) => <span>{item}</span>)
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (text: string, item: UserModel) => (
        <div style={{ display: "flex" }}>
          <Button size={"small"} type="default">
            更新
          </Button>
        </div>
      )
    }
  ];

  const fetchUsers = () => {
    userStore.getUserList(currentPage, per);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user">
      <Table
        bordered
        columns={columns}
        dataSource={userStore.users}
        rowKey={"id"}
      />
    </div>
  );
}

export default inject("userStore")(observer(User));
