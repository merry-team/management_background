import UserApi from "../apis/UserApi";
import { action, observable } from "mobx";
import UserModel from "../models/UserModel";
import { RouterStore } from "mobx-react-router";
import { Pager } from "../apis/interface/Base";

export default class UserStore {
  api: UserApi;
  routingStore: RouterStore;

  @observable loginUser: UserModel | null = null;
  @observable users: UserModel[] = [];
  @observable pager: Pager | null = null;

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
  async getUserList(page?: number, per?: number) {
    const res = await this.api.getUserList(page, per);
    this.pager = res.pager;
    this.users = res.userList;
  }

  @action.bound
  logout() {
    this.api.logout();
    this.routingStore.push("/login");
  }
}
