import React, { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";
import { Table, Avatar, Select, Modal } from "antd";
import "./User.scss";
import UserModel from "../../../models/UserModel";
import { userStore } from "../../../stores";
import moment from "moment";
import { dateFormat } from "constants/index";
import { RoleType, roleMaps } from "../../../apis/interface/User";

const { Option } = Select;
const { confirm } = Modal;

function User() {
  const [currentPage, setCurrentPage] = useState(1);
  const [per] = useState(10);

  const fetchUsers = () => {
    userStore.getUserList(currentPage, per);
  };

  const updateRole = (id: string, role: RoleType) => {
    confirm({
      title: "确定更新用户权限？",
      content: "这操作请谨慎！！",
      async onOk() {
        await userStore.modifyUserPermission(id, role);
        setTimeout(fetchUsers, 200);
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
    fetchUsers();
  }, []);

  return (
    <div className="user">
      <Table
        bordered
        columns={columns}
        dataSource={userStore.users}
        rowKey={record => record.id.toString()}
      />
    </div>
  );
}

export default inject("userStore")(observer(User));
