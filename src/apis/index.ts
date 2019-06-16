import UserApi from "./UserApi";
import GameTemplateApi from "./GameTemplateApi";
import TaskApi from "./TaskApi";

export const userApi = new UserApi();
export const gameTemplateApi = new GameTemplateApi(userApi);
export const taskApi = new TaskApi();
