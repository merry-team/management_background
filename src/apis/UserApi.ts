import BaseApi from "./BaseApi";
// import jwt from 'jsonwebtoken';
import merryAgent from "./agent";
import { Pager } from "./interface/Base";
import User from "./interface/User";
import UserModel from "../models/UserModel";
import Base from "./interface/Base";

export default class UserApi extends BaseApi {
  async adminLogin(account: string, password: string): Promise<UserModel> {
    const res = await this.post<Base<User>>({
      url: "/api/v1/sign_in/admin_user",
      data: { account, password }
    });

    return new UserModel(res.resource!);
  }

  logout() {
    localStorage.removeItem("MERRY_TOKEN");
    this.removeAgentAuthorization();
  }

  async getUsers(): Promise<{
    pager: Pager;
    userList: UserModel[];
  }> {
    const res = await this.get<Base<User[]>>({
      url: "/api/v1/users"
    });

    const temp: {
      pager: Pager;
      userList: UserModel[];
    } = {
      pager: res.pager!,
      userList: res.resources!.map(resource => new UserModel(resource))
    };

    return temp;
  }

  /**
   * 修改用户权限角色
   * @param id 修改用户id
   * @param role_name 修改用户角色的名称[:admin, :guest]
   */
  async modifyUserPermission(id: string, role_name: "admin" | "guest") {
    const res = await this.post<any>({
      url: `/api/v1/users/${id}/update_role`,
      data: { id, role_name }
    });

    return res;
  }

  private removeAgentAuthorization() {
    delete merryAgent.defaults.headers.common["Authorization"];
  }
}
