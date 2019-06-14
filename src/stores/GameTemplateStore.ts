import GameTemplateApi from "../apis/GameTemplateApi";
import { Pager } from "../apis/interface/Base";
import GameTemplateModel from "../models/GameTemplateModel";

export default class GameTemplateStore {
  api: GameTemplateApi;
  pager: Pager | null = null;
  gameTemplateList: GameTemplateModel[] = [];

  constructor(api: GameTemplateApi) {
    this.api = api;
  }

  async getGameTemplates() {
    const res = await this.api.getGameTemplates();
    this.pager = res.pager;
    this.gameTemplateList = res.gameTemplateList;
  }
}
