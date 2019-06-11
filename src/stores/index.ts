import { RouterStore } from "mobx-react-router";
import GameTemplateStore from "./GameTemplateStore";
import { gameTemplateApi, taskApi, userApi } from "../apis/index";
import TaskStore from "./TaskStore";
import UserStore from "./UserStore";

export const routingStore = new RouterStore();
export const gameTemplateStore = new GameTemplateStore(gameTemplateApi);
export const taskStore = new TaskStore(taskApi);
export const userStore = new UserStore(userApi);
