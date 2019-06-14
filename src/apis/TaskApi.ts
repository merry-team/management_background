import BaseApi from "./BaseApi";
import { Pager } from "./interface/Base";
import TaskModel from "../models/TaskModel";
import Base from "./interface/Base";
import Task from "./interface/Task";

export default class TaskApi extends BaseApi {
  /**
   * 获取任务列表
   */
  async getTasks(): Promise<{
    pager: Pager;
    taskList: TaskModel[];
  }> {
    const res = await this.get<Base<Task[]>>({
      url: "/api/v1/tasks"
    });

    const temp: {
      pager: Pager;
      taskList: TaskModel[];
    } = {
      pager: res.pager!,
      taskList: res.resources!.map(resource => new TaskModel(resource))
    };

    return temp;
  }

  /**
   * show某个任务
   * @param id
   */
  async showTask(id: string) {
    const res = await this.get<any>({
      url: `/api/v1/tasks/${id}`
    });

    return res.resource;
  }

  /**
   * 创建任务
   */
  async createTask(
    game_template_id: string,
    challenge_score: number,
    reward_score: string
  ) {
    const res = await this.post<any>({
      url: "/api/v1/tasks",
      data: { game_template_id, challenge_score, reward_score }
    });
  }

  /**
   * 更新任务
   */
  async updateTask(
    task_id: string,
    game_template_id: string,
    challenge_score: number,
    reward_score: string
  ) {
    const res = await this.post<any>({
      url: `/api/v1/tasks/${task_id}`,
      data: { game_template_id, challenge_score, reward_score }
    });
  }

  /**
   * 删除任务
   */
  async deleteTask(id: string) {
    const res = await this.delete<any>({
      url: `/api/v1/tasks/${id}`
    });
  }
}
