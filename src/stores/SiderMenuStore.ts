import { RouterStore } from "mobx-react-router";

export default class SiderMenuStore {
  routingStore: RouterStore;

  constructor(routingStore: RouterStore) {
    this.routingStore = routingStore;
  }
}
