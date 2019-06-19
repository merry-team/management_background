import React, { Component } from "react";
import "./Task.scss";
import { observer, inject } from "mobx-react";
import { Table, Icon, Dropdown, Popconfirm, Menu } from "antd";
import TaskStore from "../../../stores/TaskStore";
import { Link } from "react-router-dom";
import TaskModel from "models/TaskModel";

const MenuItem = Menu.Item;

interface TaskProps {
  taskStore?: TaskStore;
  gameTemplateId: number;
}

interface TaskState {
  loading: boolean;
}

@inject("taskStore")
@observer
export default class Task extends Component<TaskProps, TaskState> {
  constructor(props: TaskProps) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    const { taskList } = this.props.taskStore!;
    if (taskList.length === 0) {
      this.getTasks();
    }
  }

  getTasks = () => {
    const taskStore = this.props.taskStore!;
    const gameTemplateId = this.props.gameTemplateId;
    this.setState({
      loading: true
    });
    taskStore.getTasks(gameTemplateId).then(res => {
      this.setState({
        loading: false
      });
    });
  };

  selectTask = async (task: TaskModel) => {
    const taskStore = this.props.taskStore!;
    taskStore.selectTask(task);
  };

  deleteTask = async (id: number) => {
    const taskStore = this.props.taskStore!;
    taskStore.deleteTask(id).then(async res => {
      await this.getTasks();
    });
  };

  onPageChange = (page: number) => {
    const taskStore = this.props.taskStore!;
    const gameTemplateId = this.props.gameTemplateId;
    this.setState({
      loading: true
    });
    taskStore.getTasks(gameTemplateId, page).then(res => {
      this.setState({
        loading: false
      });
    });
  };

  render() {
    const { loading } = this.state;
    const { taskList, pager } = this.props.taskStore!;
    const gameTemplateId = this.props.gameTemplateId;

    return (
      <div className="task">
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
              title: "创建人",
              dataIndex: "creator",
              key: "creator",
              render: (text: string, record: TaskModel) => (
                <span>{record.creator.name}</span>
              )
            },
            {
              title: "挑战分数",
              dataIndex: "challenge_score",
              key: "challenge_score"
            },
            {
              title: "奖励分数",
              dataIndex: "reward_score",
              key: "reward_score"
            },
            {
              title: "操作",
              dataIndex: "action",
              key: "action",
              render: (text: string, record: TaskModel) => (
                <Dropdown
                  overlay={
                    <Menu>
                      <MenuItem>
                        <Link
                          to={`/game_templates/${gameTemplateId}/tasks/${record.id}`}
                          onClick={() => this.selectTask(record)}
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
                          onConfirm={() => this.deleteTask(record.id)}
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
          dataSource={taskList}
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
