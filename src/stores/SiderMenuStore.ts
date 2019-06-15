import { RouterStore } from "mobx-react-router";

export default class SiderMenuStore {
  routingStore: RouterStore;

  constructor(routingStore: RouterStore) {
    this.routingStore = routingStore;
  }

  get currentRoute() {
    const path = this.routingStore.location.pathname;
    switch (path) {
      case "/tasks":
        return "tasks";
      case "/game_templates":
        return "game_templates";
      default:
        return "";
    }
    return this.routingStore.location.pathname;
  }
}
