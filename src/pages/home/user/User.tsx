import React, { useState, useEffect } from "react";
import "./User.scss";
import UserStore from "../../../stores/UserStore";

interface UserProps {
  userStore?: UserStore;
}

const User: React.FunctionComponent<UserProps> = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {}, []);

  async function fetchUsers() {}

  return <div className="userComponent">123123</div>;
};

export default User;
