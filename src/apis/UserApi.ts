import BaseApi from "./BaseApi";
import merryAgent from "./agent";
import User from "./interface/User";
import UserModel from "../models/UserModel";
import Base, { Pager } from "./interface/Base";
import { Role } from "./interface/User";

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

  /**
   * 获取用户信息
   * @param userId
   */
  async getUserInfo(userId: number): Promise<User> {
    return {
      id: 5,
      created_at: "xxx",
      updated_at: "xxx",
      account: "Lucien",
      avatar: "abc",
      name: "Lucien",
      roles: [
        {
          name: "admin",
          resource_id: "fff",
          resource_type: "ggg"
        }
      ] as Role[]
    };
  }

  /**
   * 获取用户列表
   */
  async getUserList(
    page?: number,
    per?: number
  ): Promise<{
    pager: Pager;
    userList: UserModel[];
  }> {
    const res = await this.get<Base<User[]>>({
      url: "/api/v1/users",
      params: { page, per }
    });

    return {
      pager: res.pager!,
      userList: res.resources!.map((resource: User) => new UserModel(resource))
    };
  }
  private removeAgentAuthorization() {
    delete merryAgent.defaults.headers.common["Authorization"];
  }
}
