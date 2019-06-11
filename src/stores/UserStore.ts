import UserApi from "../apis/UserApi";
import { action } from "mobx";

export default class UserStore {
  api: UserApi;
  loginUser: any;

  constructor(api: UserApi) {
    this.api = api;
  }

  @action.bound
  async login(account: string, password: string) {
    await this.api.adminLogin(account, password);
  }
}
