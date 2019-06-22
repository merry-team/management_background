import React, { useState, useEffect } from "react";
import "./User.scss";
import UserStore from "stores/UserStore";
import { inject, observer } from "mobx-react";

interface UserProps {
  userStore?: UserStore;
}

const User: React.FunctionComponent<UserProps> = props => {
  const [loading, setLoading] = useState(true);
  const userStore = props.userStore;

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    userStore && (await userStore.getUsers());
    setLoading(false);
  }

  const updateUserRole = async (id: string, role: "admin" | "guest") => {
    userStore && (await userStore.updateUserRole(id, role));
  };

  return <div className="userComponent"></div>;
};

export default inject("userStore")(observer(User));
