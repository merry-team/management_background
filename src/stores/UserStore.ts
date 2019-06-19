import UserApi from "../apis/UserApi";
import { action, observable } from "mobx";
import UserModel from "../models/UserModel";
import { RouterStore } from "mobx-react-router";

export default class UserStore {
  api: UserApi;
  routingStore: RouterStore;

  @observable
  loginUser: UserModel | null = null;

  constructor(api: UserApi, routingStore: RouterStore) {
    this.api = api;
    this.routingStore = routingStore;
    const user = localStorage.getItem("userInfo");
    if (user) {
      this.loginUser = JSON.parse(user);
    }
  }

  @action.bound
  async login(account: string, password: string) {
    const user = await this.api.adminLogin(account, password);
    this.loginUser = user;
    localStorage.setItem("userInfo", JSON.stringify(user));
    this.routingStore.push("/");
  }

  @action.bound
  logout() {
    this.api.logout();
    this.routingStore.push("/login");
  }
}
