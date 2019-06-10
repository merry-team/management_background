import GameTemplateApi from '../apis/GameTemplateApi';
export default class GameTemplateStore {
  api: GameTemplateApi;
  
  constructor(
    api: GameTemplateApi
  ) {
    this.api = api;
  }
}