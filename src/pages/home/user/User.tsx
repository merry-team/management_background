import React, { useState, useEffect } from "react";
import "./User.scss";
import { observer, inject } from "mobx-react";
import UserStore from "../../../stores/UserStore";

interface UserProps {
  userStore?: UserStore;
}

const User: React.FunctionComponent<UserProps> = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {}, []);

  async function fetchUsers() {}

  return <div className="userComponent"></div>;
};

export default User;
