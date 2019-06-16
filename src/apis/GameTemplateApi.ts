import BaseApi from "./BaseApi";
import Base from "./interface/Base";
import { Pager } from "./interface/Base";
import GameTemplate from "./interface/GameTemplate";
import GameTemplateModel from "../models/GameTemplateModel";
import UserApi from "./UserApi";

export default class GameTemplateApi extends BaseApi {
  userApi: UserApi;

  constructor(userApi: UserApi) {
    super();
    this.userApi = userApi;
  }

  /**
   * 获取游戏模板列表
   */
  async getGameTemplates(): Promise<{
    pager: Pager;
    gameTemplateList: GameTemplateModel[];
  }> {
    const res = await this.get<Base<GameTemplate[]>>({
      url: "/api/v1/game_templates"
    });

    return {
      pager: res.pager!,
      gameTemplateList: res.resources!.map(
        (resource: GameTemplate) => new GameTemplateModel(resource)
      )
    };
  }

  /**
   * get某个游戏模板
   * @param id
   */
  async getGameTemplate(id: number): Promise<GameTemplateModel> {
    const res = await this.get<Base<GameTemplate>>({
      url: `/api/v1/game_templates/${id}`
    });

    return new GameTemplateModel(res.resource!);
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

  async deleteGameTemplate(id: number) {
    await this.delete({
      url: `/api/v1/game_templates/${id}`
    });
  }
}
