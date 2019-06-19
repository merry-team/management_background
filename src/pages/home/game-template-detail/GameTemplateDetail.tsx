import React, { Component } from "react";
import "./GameTemplateDetail.scss";
import { observer, inject } from "mobx-react";
import GameTemplateStore from "stores/GameTemplateStore";
import { RouteComponentProps } from "react-router";
import { Spin, Radio, Icon } from "antd";
import Task from "../task/Task";

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

interface GameTemplateDetailProps extends RouteComponentProps<{ gid: string }> {
  gameTemplateStore?: GameTemplateStore;
}

interface GameTemplateDetailState {
  loading: boolean;
  selectedTab: "detail" | "tasks";
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
      loading: false,
      selectedTab: "detail"
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

  toggleTab = (value: "detail" | "tasks") => {
    this.setState({
      selectedTab: value
    });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { selectedGameTemplate } = this.props.gameTemplateStore!;
    const { loading, selectedTab } = this.state;

    return (
      <div className="game-template-detail">
        {loading || !selectedGameTemplate ? (
          <Spin />
        ) : (
          <div className="game-template-detail-container">
            <a className="go-back" onClick={this.goBack}>
              <Icon className="go-back-icon" type="rollback" />
              Go back
            </a>
            <div className="radio-container">
              <RadioGroup
                value={selectedTab}
                buttonStyle="solid"
                onChange={(e: any) => {
                  this.toggleTab(e.target.value);
                }}
              >
                <RadioButton value="detail">Detail</RadioButton>
                <RadioButton value="tasks">Tasks</RadioButton>
              </RadioGroup>
            </div>
            <div className="content-container">
              {selectedTab === "tasks" ? (
                <Task gameTemplateId={selectedGameTemplate.id} />
              ) : (
                <div>{selectedGameTemplate.id}</div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
