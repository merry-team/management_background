import React, { Component } from "react";
import "./GameTemplate.scss";
import { observer, inject } from "mobx-react";
import GameTemplateStore from "stores/GameTemplateStore";
import { Table, Dropdown, Icon, Menu, Popconfirm } from "antd";
import GameTemplateModel from "../../../models/GameTemplateModel";
import { Link } from "react-router-dom";

const MenuItem = Menu.Item;

const columns = [
  {
    title: "游戏类型",
    dataIndex: "category",
    key: "category"
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
      <span>
        <Dropdown
          overlay={
            <Menu>
              <MenuItem>
                <a>View Detail</a>
              </MenuItem>
              <MenuItem>
                <a>Update</a>
              </MenuItem>
              <MenuItem>
                <a>Delete</a>
              </MenuItem>
            </Menu>
          }
        >
          <a>
            actions <Icon type="down" />
          </a>
        </Dropdown>
      </span>
    )
  }
];

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

  deleteGameTemplate = async (id: number) => {
    const gameTemplateStore = this.props.gameTemplateStore!;
    await gameTemplateStore.deleteGameTemplate(id).then(res => {
      this.getGameTemplates();
    });
  };

  render() {
    const { loading } = this.state;
    const { gameTemplateList } = this.props.gameTemplateStore!;

    return (
      <div className="game-template">
        <Table
          columns={[
            {
              title: "游戏类型",
              dataIndex: "category",
              key: "category"
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
                <span>
                  <Dropdown
                    overlay={
                      <Menu>
                        <MenuItem>
                          <Link to={`/game_templates/${record.id}`}>
                            View Detail
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <a>Update</a>
                        </MenuItem>
                        <MenuItem>
                          <Popconfirm
                            title="Are you sure?"
                            onConfirm={() => this.deleteGameTemplate(record.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <a>Delete</a>
                          </Popconfirm>
                        </MenuItem>
                      </Menu>
                    }
                  >
                    <a>
                      actions <Icon type="down" />
                    </a>
                  </Dropdown>
                </span>
              )
            }
          ]}
          dataSource={gameTemplateList}
          loading={loading}
          rowKey={record => record.id.toString()}
        ></Table>
      </div>
    );
  }
}
