import BaseApi from "./BaseApi";
// import jwt from 'jsonwebtoken';
import merryAgent from "./agent";
import User from "./interface/User";
import UserModel from "../models/UserModel";

export default class UserApi extends BaseApi {
  async adminLogin(account: string, password: string): Promise<UserModel> {
    const res = await this.post<User>({
      url: "/api/v1/sign_in/admin_user",
      data: { account, password }
    });

    return new UserModel(res);
  }

  logout() {
    localStorage.removeItem("MERRY_ADMIN_TOKEN");
    this.removeAgentAuthorization();
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
