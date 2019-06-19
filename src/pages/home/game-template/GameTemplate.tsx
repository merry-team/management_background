import React, { Component } from "react";
import "./GameTemplate.scss";
import { observer, inject } from "mobx-react";
import GameTemplateStore from "stores/GameTemplateStore";
import { Table, Dropdown, Icon, Menu, Popconfirm } from "antd";
import GameTemplateModel from "../../../models/GameTemplateModel";
import { Link } from "react-router-dom";

const MenuItem = Menu.Item;

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
  constructor(props: GameTemplateProps) {
    super(props);
    this.state = {
      loading: false
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

  deleteGameTemplate = async (id: number) => {
    const gameTemplateStore = this.props.gameTemplateStore!;
    gameTemplateStore.deleteGameTemplate(id).then(async res => {
      await this.getGameTemplates();
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
    const { loading } = this.state;
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
                        <span>Update</span>
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
        ></Table>
      </div>
    );
  }
}
