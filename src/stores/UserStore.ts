import UserApi from "../apis/UserApi";
import { action, observable } from "mobx";
import UserModel from "../models/UserModel";
import { RouterStore } from "mobx-react-router";
import { Pager } from "../apis/interface/Base";
import { routingStore } from "./index";

export default class UserStore {
  api: UserApi;
  routingStore: RouterStore;
  pager: Pager | null = null;
  userList: any[] = [];

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

  async getTasks() {
    const res = await this.api.getUsers();
    this.pager = res.pager;
    this.userList = res.userList;
  }
}
