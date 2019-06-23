import GameTemplateApi from "../apis/GameTemplateApi";
import { Pager } from "../apis/interface/Base";
import GameTemplateModel from "../models/GameTemplateModel";
import { action, observable } from "mobx";

export default class GameTemplateStore {
  api: GameTemplateApi;
  @observable pager: Pager | null = null;
  @observable gameTemplateList: GameTemplateModel[] = [];
  @observable selectedGameTemplate: GameTemplateModel | null = null;

  constructor(api: GameTemplateApi) {
    this.api = api;
  }

  @action.bound
  async getGameTemplates(page?: number, per?: number) {
    const res = await this.api.getGameTemplates(page, per);
    this.pager = res.pager;
    this.gameTemplateList = res.gameTemplateList;
  }

  @action.bound
  async selectGameTemplate(gameTemplate: GameTemplateModel) {
    this.selectedGameTemplate = gameTemplate;
  }

  @action.bound
  async createGameTemplate(
    description: string,
    category: "challenge" | "arena" | "quarter",
    duration: number,
    challenge_score: number,
    challenge_count: number,
    quarter_started_at?: string,
    quarter_ended_at?: string
  ) {
    await this.api.createGameTemplate(
      description,
      category,
      duration,
      challenge_score,
      challenge_count,
      quarter_started_at,
      quarter_ended_at
    );
  }

  @action.bound
  async updateGameTemplate(
    game_template_id: number,
    description: string,
    category: "challenge" | "arena" | "quarter",
    duration: number,
    challenge_score: number,
    challenge_count: number,
    quarter_started_at?: string,
    quarter_ended_at?: string
  ) {
    await this.api.updateGameTemplate(
      game_template_id,
      description,
      category,
      duration,
      challenge_score,
      challenge_count,
      quarter_started_at,
      quarter_ended_at
    );
  }

  @action.bound
  async deleteGameTemplate(id: number) {
    await this.api.deleteGameTemplate(id);
  }

  @action.bound
  async getGameTemplate(id: number) {
    const res = await this.api.getGameTemplate(id);
    this.selectedGameTemplate = res;
  }
}
