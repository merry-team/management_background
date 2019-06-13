import Base from "./Base";

export type RoleType = "admin" | "guest";

interface Role extends Base {
  name: RoleType;
  resource_id: string;
  resource_type: string;
}

export default interface User extends Base {
  account: string;
  avatar: string;
  name: string;
  roles: Role[];
}
