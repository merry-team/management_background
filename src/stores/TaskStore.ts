import TaskApi from "../apis/TaskApi";

export default class TaskStore {
  api: TaskApi;

  constructor(
    api: TaskApi
    ) {
    this.api = api;
  }
}