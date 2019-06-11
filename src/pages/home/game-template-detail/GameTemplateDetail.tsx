import React, { Component } from "react";
import "./GameTemplateDetail.scss";
import { observer, inject } from "mobx-react";
import GameTemplateStore from "stores/GameTemplateStore";

interface GameTemplateDetailProps {
  gameTemplateStore?: GameTemplateStore;
}

@inject("gameTemplateStore")
@observer
export default class GameTemplateDetail extends Component<
  GameTemplateDetailProps
> {
  render() {
    return (
      <div className="game-template-detail">Game Template Detail Works!</div>
    );
  }
}
