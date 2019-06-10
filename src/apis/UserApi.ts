import BaseApi from './BaseApi';
// import jwt from 'jsonwebtoken';
import merryAgent from './agent';

export default class UserApi extends BaseApi {
  async adminLogin(account: string, password: string) {
    const jwtToken = await this.post<any>({
      url: '/api/v1/sign_in/admin_user',
      data: { account, password }
    });

    this.setAgentAuthorization(jwtToken);
    localStorage.setItem('MERRY_ADMIN_TOKEN', jwtToken);
    // let decoded;
    // try {
    //   decoded = this.parseToken(jwtToken);
    // } catch (e) {
    //   // 返回无效 TOKEN
    //   throw new Error('登陆服务器存在问题');
    // }
  }

  logout() {
    localStorage.removeItem('MERRY_ADMIN_TOKEN');
    this.removeAgentAuthorization();
  }

  /**
   * 修改用户权限角色
   * @param id 修改用户id
   * @param role_name 修改用户角色的名称[:admin, :guest]
   */
  async modifyUserPermission(id: string, role_name: 'admin' | 'guest') {
    const res = await this.post<any>({
      url: `/api/v1/users/${id}/update_role`,
      data: {id, role_name}
    });

    return res.resource;
  }

  private setAgentAuthorization(jwtToken: string) {
    merryAgent.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
  }

  private removeAgentAuthorization() {
    delete merryAgent.defaults.headers.common['Authorization'];
  }

}