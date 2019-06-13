import React, { Component } from "react";
import "./GameTemplate.scss";
import { observer, inject } from "mobx-react";
import GameTemplateStore from "stores/GameTemplateStore";

interface GameTemplateProps {
  gameTemplateStore?: GameTemplateStore;
}

interface GameTemplateState {
  loading: boolean;
}

@inject("gameTemplateStore")
@observer
export default class GameTemplate extends Component<
  GameTemplateProps,
  GameTemplateState
> {
  componentDidMount() {
    const gameTemplateStore = this.props.gameTemplateStore!;
    gameTemplateStore.getGameTemplates();
  }

  render() {
    return <div className="game-template">Game Template Works!</div>;
  }
}
