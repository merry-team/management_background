import TaskApi from "../apis/TaskApi";
import { Pager } from "../apis/interface/Base";

export default class TaskStore {
  api: TaskApi;
  pager: Pager | null = null;
  taskList: any[] = [];

  constructor(api: TaskApi) {
    this.api = api;
  }

  async getTasks() {
    const res = await this.api.getTasks();
    this.pager = res.pager;
    this.taskList = res.taskList;
  }

  async deleteTask(id: number) {
    await this.api.deleteTask(id);
  }
}
