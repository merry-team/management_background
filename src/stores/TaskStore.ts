import TaskApi from "../apis/TaskApi";
import { Pager } from "../apis/interface/Base";
import { observable, action } from "mobx";
import TaskModel from "../models/TaskModel";

export default class TaskStore {
  api: TaskApi;
  @observable pager: Pager | null = null;
  @observable taskList: any[] = [];
  @observable selectedTask: TaskModel | null = null;

  constructor(api: TaskApi) {
    this.api = api;
  }

  @action.bound
  async getTasks(gameTemplateId: number, page?: number, per?: number) {
    const res = await this.api.getTasks(gameTemplateId, page, per);
    this.pager = res.pager;
    this.taskList = res.taskList;
  }

  @action.bound
  selectTask(task: TaskModel) {
    this.selectedTask = task;
  }

  @action.bound
  async createTask(
    gameTemplateId: number,
    challengeScore: number,
    rewardScore: number
  ) {
    await this.api.createTask(gameTemplateId, challengeScore, rewardScore);
  }

  @action.bound
  async updateTask(
    taskId: number,
    gameTemplateId: number,
    challengeScore: number,
    rewardScore: number
  ) {
    await this.api.updateTask(
      taskId,
      gameTemplateId,
      challengeScore,
      rewardScore
    );
  }

  @action.bound
  async deleteTask(id: number) {
    await this.api.deleteTask(id);
  }

  @action.bound
  async getTask(id: number) {
    const res = await this.api.getTask(id);
    this.selectedTask = res;
  }
}
