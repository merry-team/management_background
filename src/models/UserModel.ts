import User from "../apis/interface/User";
import { RoleType } from "../apis/interface/User";

export default class UserModel {
  account: string;
  name: string;
  avatar: string;
  roles: RoleType[];
  created_at: string;

  constructor(user: User) {
    this.account = user.account;
    this.name = user.name;
    this.avatar = user.avatar;
    this.created_at = user.created_at;
    this.roles = user.roles.map(r => r.name);
  }

  get isAdmin() {
    return this.roles.some(r => r === "admin");
  }

  get isGuest() {
    return !this.isAdmin && this.roles.some(r => r === "guest");
  }
}
