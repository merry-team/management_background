import React, { Component } from 'react';
import './GameTemplate.scss';
import { observer, inject } from 'mobx-react';
import GameTemplateStore from '../../../stores/GameTemplateStore';

interface GameTemplateProps {
  gameTemplateStore?: GameTemplateStore;
}

@inject('gameTemplateStore')
@observer
export default class GameTemplate extends Component<GameTemplateProps> {
  render() {
    return <div className="game-template">
      Game Template Works!
    </div>
  }
}