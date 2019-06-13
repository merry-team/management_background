import BaseApi from "./BaseApi";

export default class GameTemplateApi extends BaseApi {
  /**
   * 获取游戏模板列表
   */
  async getGameTemplates() {
    const res = await this.get({
      url: "/api/v1/game_templates"
    });

    return res;
  }

  /**
   * show某个游戏模板
   * @param id
   */
  async showGameTemplate(id: string) {
    const res = await this.get({
      url: `/api/v1/game_templates/${id}`
    });

    return res;
  }

  /**
   * 创建游戏模板
   */
  async createGameTemplate(
    description: string,
    category: "challenge" | "arena" | "quarter",
    duration: number,
    challenge_score: number,
    challenge_count: number,
    quarter_started_at: string,
    quarter_ended_at: string
  ) {
    const res = await this.post({
      url: "/api/v1/game_templates",
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
    category: "challenge" | "arena" | "quarter",
    duration: number,
    challenge_score: number,
    challenge_count: number,
    quarter_started_at: string,
    quarter_ended_at: string
  ) {
    const res = await this.patch({
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
    await this.delete({
      url: `/api/v1/game_templates/${id}`
    });
  }
}
