import React, { Component } from "react";
import "./GameTemplateDetail.scss";
import { observer, inject } from "mobx-react";
import GameTemplateStore from "stores/GameTemplateStore";
import { RouteComponentProps } from "react-router";
import { Spin } from "antd";

interface GameTemplateDetailProps extends RouteComponentProps<{ gid: string }> {
  gameTemplateStore?: GameTemplateStore;
}

interface GameTemplateDetailState {
  loading: boolean;
}

@inject("gameTemplateStore")
@observer
export default class GameTemplateDetail extends Component<
  GameTemplateDetailProps,
  GameTemplateDetailState
> {
  constructor(props: GameTemplateDetailProps) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    const {
      selectedGameTemplate,
      getGameTemplate
    } = this.props.gameTemplateStore!;
    const gid = this.props.match.params.gid;
    if (!selectedGameTemplate) {
      this.setState({
        loading: true
      });
      getGameTemplate(Number(gid)).then(res => {
        this.setState({
          loading: false
        });
      });
    }
  }

  render() {
    const { selectedGameTemplate } = this.props.gameTemplateStore!;
    const { loading } = this.state;

    return (
      <div className="game-template-detail">
        {loading || !selectedGameTemplate ? (
          <Spin />
        ) : (
          <div>{selectedGameTemplate!.id}</div>
        )}
      </div>
    );
  }
}
