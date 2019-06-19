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
  async deleteGameTemplate(id: number) {
    await this.api.deleteGameTemplate(id);
  }

  @action.bound
  async getGameTemplate(id: number) {
    const res = await this.api.getGameTemplate(id);
    this.selectedGameTemplate = res;
  }
}
