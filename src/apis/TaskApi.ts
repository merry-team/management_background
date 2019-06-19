import BaseApi from "./BaseApi";
import { Pager } from "./interface/Base";
import TaskModel from "../models/TaskModel";
import Base from "./interface/Base";
import Task from "./interface/Task";

export default class TaskApi extends BaseApi {
  /**
   * 获取任务列表
   */
  async getTasks(
    gameTemplateId: number,
    page?: number,
    per?: number
  ): Promise<{
    pager: Pager;
    taskList: TaskModel[];
  }> {
    const res = await this.get<Base<Task[]>>({
      url: "/api/v1/tasks",
      params: { gameTemplateId, page, per }
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
   * get某个任务
   * @param id
   */
  async getTask(id: number): Promise<TaskModel> {
    const res = await this.get<Base<Task>>({
      url: `/api/v1/tasks/${id}`
    });

    return new TaskModel(res.resource!);
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
  async deleteTask(id: number) {
    const res = await this.delete({
      url: `/api/v1/tasks/${id}`
    });
  }
}
