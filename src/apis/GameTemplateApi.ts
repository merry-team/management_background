import BaseApi from './BaseApi';

export default class GameTemplateApi extends BaseApi {
  /**
   * 获取游戏模板列表
   */
  async getGameTemplates() {
    const res = await this.get<any>({
      url: '/api/v1/game_templates'
    });

    return res.resources;
  }

  /**
   * show某个游戏模板
   * @param id 
   */
  async showGameTemplate(id: string) {
    const res = await this.get<any>({
      url: `/api/v1/game_templates/${id}`
    });

    return res.resource;
  }

  /**
   * 创建游戏模板
   */
  async createGameTemplate(
    description: string,
    category: 'challenge' | 'arena' | 'quarter',
    duration: number,
    challenge_score: number,
    challenge_count: number,
    quarter_started_at: string,
    quarter_ended_at: string
  ) {
    const res = await this.post<any>({
      url: '/api/v1/game_templates',
      data: {
        description,
        category,
        duration,
        challenge_score,
        challenge_count,
        quarter_started_at,
        quarter_ended_at
      }
    });
  }

  /**
   * 更新游戏模板
   */
  async updateGameTemplate(
    game_template_id: string,
    description: string,
    category: 'challenge' | 'arena' | 'quarter',
    duration: number,
    challenge_score: number,
    challenge_count: number,
    quarter_started_at: string,
    quarter_ended_at: string
  ) {
    const res = await this.patch<any>({
      url: `/api/v1/game_templates/${game_template_id}`,
      data: {
        description,
        category,
        duration,
        challenge_score,
        challenge_count,
        quarter_started_at,
        quarter_ended_at
      }
    });
  }

  async deleteGameTemplate(id: string) {
    await this.delete<any>({
      url: `/api/v1/game_templates/${id}`
    });
  }

  /**
   * 获取任务列表
   */
  async getTasks() {
    const res = await this.get<any>({
      url: '/api/v1/tasks'
    });

    return res.resources;
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
      url: '/api/v1/tasks',
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