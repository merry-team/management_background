import React, { Component } from "react";
import "./GameTemplateList.scss";
import { observer, inject } from "mobx-react";
import GameTemplateStore from "stores/GameTemplateStore";
import { Table, Dropdown, Icon, Menu, Popconfirm, Modal } from "antd";
import GameTemplateModel from "../../../../models/GameTemplateModel";
import { Link } from "react-router-dom";
import { GameTemplateFieldValues } from "../game-template-form/GameTemplateForm";
import GameTemplateForm from "../game-template-form/GameTemplateForm";
import moment from "moment";
import { dateFormat } from "../../../../constants/index";

const MenuItem = Menu.Item;

interface GameTemplateListProps {
  gameTemplateStore?: GameTemplateStore;
}

interface GameTemplateListState {
  loading: boolean;
  modalVisible: boolean;
  actionType?: "create" | "update";
  updatingGameTemplateId?: number;
  initialValue?: GameTemplateFieldValues;
}

@inject("gameTemplateStore")
@observer
export default class GameTemplateList extends Component<
  GameTemplateListProps,
  GameTemplateListState
> {
  constructor(props: GameTemplateListProps) {
    super(props);
    this.state = {
      loading: false,
      modalVisible: false
    };
  }

  componentDidMount() {
    this.getGameTemplates();
  }

  getGameTemplates = () => {
    this.setState({
      loading: true
    });
    const gameTemplateStore = this.props.gameTemplateStore!;
    gameTemplateStore.getGameTemplates().then(res => {
      this.setState({
        loading: false
      });
    });
  };

  selectGameTemplate = async (gameTemplate: GameTemplateModel) => {
    const gameTemplateStore = this.props.gameTemplateStore!;
    gameTemplateStore.selectGameTemplate(gameTemplate);
  };

  createGameTemplate = async (values: GameTemplateFieldValues) => {
    const gameTemplateStore = this.props.gameTemplateStore!;
    gameTemplateStore
      .createGameTemplate(
        values.game_rule!,
        values.category!,
        values.duration!,
        values.challenge_score!,
        values.challenge_count!,
        values.quarter_started_ended_at &&
          values.quarter_started_ended_at.length !== 0
          ? values.quarter_started_ended_at[0].format(dateFormat)
          : undefined,
        values.quarter_started_ended_at &&
          values.quarter_started_ended_at.length !== 0
          ? values.quarter_started_ended_at[1].format(dateFormat)
          : undefined
      )
      .then(async res => {
        await gameTemplateStore.getGameTemplates();
        this.setState({
          modalVisible: false,
          actionType: undefined
        });
      });
  };

  updateGameTemplate = async (values: GameTemplateFieldValues) => {
    const gameTemplateStore = this.props.gameTemplateStore!;
    const { updatingGameTemplateId } = this.state;
    gameTemplateStore
      .updateGameTemplate(
        updatingGameTemplateId!,
        values.game_rule!,
        values.category!,
        values.duration!,
        values.challenge_score!,
        values.challenge_count!,
        values.quarter_started_ended_at &&
          values.quarter_started_ended_at.length !== 0
          ? values.quarter_started_ended_at[0].format(dateFormat)
          : undefined,
        values.quarter_started_ended_at &&
          values.quarter_started_ended_at.length !== 0
          ? values.quarter_started_ended_at[1].format(dateFormat)
          : undefined
      )
      .then(async res => {
        await gameTemplateStore.getGameTemplates();
        this.setState({
          modalVisible: false,
          actionType: undefined,
          updatingGameTemplateId: undefined,
          initialValue: undefined
        });
      });
  };

  deleteGameTemplate = async (id: number) => {
    const gameTemplateStore = this.props.gameTemplateStore!;
    gameTemplateStore.deleteGameTemplate(id).then(async res => {
      await this.getGameTemplates();
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  onPageChange = (page: number) => {
    const gameTemplateStore = this.props.gameTemplateStore!;
    this.setState({
      loading: true
    });
    gameTemplateStore.getGameTemplates(page).then(res => {
      this.setState({
        loading: false
      });
    });
  };

  render() {
    const {
      loading,
      modalVisible,
      initialValue,
      updatingGameTemplateId,
      actionType
    } = this.state;
    const { gameTemplateList, pager } = this.props.gameTemplateStore!;

    return (
      <div className="game-template">
        <Table
          columns={[
            {
              title: (
                <Icon
                  type="plus-circle"
                  theme="twoTone"
                  style={{ cursor: "pointer", fontSize: 20 }}
                  onClick={() => {
                    this.setState({
                      modalVisible: true,
                      actionType: "create"
                    });
                  }}
                />
              ),
              dataIndex: "create",
              key: "create"
            },
            {
              title: "游戏类型",
              dataIndex: "category",
              key: "category",
              render: (text: string, record: GameTemplateModel) => (
                <Link
                  to={`/game_templates/${record.id}`}
                  onClick={() => this.selectGameTemplate(record)}
                >
                  {record.category}
                </Link>
              )
            },
            {
              title: "创建人",
              dataIndex: "creator",
              key: "creator",
              render: (text: string, record: GameTemplateModel) => (
                <span>{record.creator.name}</span>
              )
            },
            {
              title: "游戏规则",
              dataIndex: "description",
              key: "description"
            },
            {
              title: "游戏时间",
              dataIndex: "duration",
              key: "duration"
            },
            {
              title: "挑战次数",
              dataIndex: "challenge_count",
              key: "challenge_count"
            },
            {
              title: "挑战分数",
              dataIndex: "challenge_score",
              key: "challenge_score"
            },
            {
              title: "赛季开始时间",
              dataIndex: "quarter_started_at",
              key: "quarter_started_at"
            },
            {
              title: "赛季结束时间",
              dataIndex: "quarter_ended_at",
              key: "quarter_ended_at"
            },
            {
              title: "操作",
              dataIndex: "action",
              key: "action",
              render: (text: string, record: GameTemplateModel) => (
                <Dropdown
                  overlay={
                    <Menu>
                      <MenuItem>
                        <Link
                          to={`/game_templates/${record.id}`}
                          onClick={() => this.selectGameTemplate(record)}
                        >
                          View Detail
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <span
                          onClick={() => {
                            this.setState({
                              modalVisible: true,
                              actionType: "update",
                              updatingGameTemplateId: record.id,
                              initialValue: {
                                category: record.category,
                                game_rule: record.description,
                                duration: record.duration,
                                challenge_count: record.challenge_count,
                                challenge_score: record.challenge_score,
                                quarter_started_ended_at:
                                  // 只要有一个值为''，则说明该项不需要提供起止时间
                                  record.quarter_started_at !== ""
                                    ? [
                                        moment(record.quarter_started_at),
                                        moment(record.quarter_ended_at)
                                      ]
                                    : null
                              }
                            });
                          }}
                        >
                          Update
                        </span>
                      </MenuItem>
                      <MenuItem>
                        <Popconfirm
                          title="Are you sure?"
                          onConfirm={() => this.deleteGameTemplate(record.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <span>Delete</span>
                        </Popconfirm>
                      </MenuItem>
                    </Menu>
                  }
                >
                  <a>
                    actions <Icon type="down" />
                  </a>
                </Dropdown>
              )
            }
          ]}
          dataSource={gameTemplateList}
          loading={loading}
          rowKey={record => record.id.toString()}
          pagination={{
            current: pager ? pager.current_page : 1,
            pageSize: 10,
            total: pager ? pager.total_count : 0,
            onChange: this.onPageChange
          }}
        />
        <Modal
          title={
            actionType === "create"
              ? "Create GameTemplate"
              : `Update GameTemplate: ${updatingGameTemplateId}`
          }
          visible={modalVisible}
          footer={null}
          onCancel={this.closeModal}
        >
          <GameTemplateForm
            onSave={
              actionType === "create"
                ? this.createGameTemplate
                : this.updateGameTemplate
            }
            onCancel={this.closeModal}
            initialValues={initialValue}
          />
        </Modal>
      </div>
    );
  }
}
