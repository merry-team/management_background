import { BaseEntity } from "./Base";

export type RoleType = "admin" | "guest";

interface Role extends BaseEntity {
  name: RoleType;
  resource_id: string;
  resource_type: string;
}

export default interface User extends BaseEntity {
  account: string;
  avatar: string;
  name: string;
  roles: Role[];
}
