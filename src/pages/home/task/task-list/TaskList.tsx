import React, { Component } from "react";
import "./TaskList.scss";
import { observer, inject } from "mobx-react";
import { Table, Icon, Dropdown, Popconfirm, Menu, Modal } from "antd";
import TaskStore from "../../../../stores/TaskStore";
import { Link } from "react-router-dom";
import TaskModel from "models/TaskModel";
import TaskForm from "../task-form/TaskForm";
import { TaskFieldValues } from "../task-form/TaskForm";

const MenuItem = Menu.Item;

interface TaskListProps {
  taskStore?: TaskStore;
  gameTemplateId: number;
}

interface TaskListState {
  loading: boolean;
  modalVisible: boolean;
  actionType?: "create" | "update";
  updatingTaskId?: number;
  initialValue?: TaskFieldValues;
}

@inject("taskStore")
@observer
export default class TaskList extends Component<TaskListProps, TaskListState> {
  constructor(props: TaskListProps) {
    super(props);
    this.state = {
      loading: false,
      modalVisible: false
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

  createTask = async (values: TaskFieldValues) => {
    const taskStore = this.props.taskStore!;
    const gameTemplateId = this.props.gameTemplateId;
    taskStore
      .createTask(gameTemplateId, values.challenge_score!, values.reward_score!)
      .then(async res => {
        await this.getTasks();
        this.setState({
          modalVisible: false,
          actionType: undefined
        });
      });
  };

  updateTask = async (values: TaskFieldValues) => {
    const taskStore = this.props.taskStore!;
    const gameTemplateId = this.props.gameTemplateId;
    const { updatingTaskId } = this.state;

    taskStore
      .updateTask(
        updatingTaskId!,
        gameTemplateId,
        values.challenge_score!,
        values.reward_score!
      )
      .then(async res => {
        await this.getTasks();
        this.setState({
          modalVisible: false,
          actionType: undefined,
          updatingTaskId: undefined,
          initialValue: undefined
        });
      });
  };

  deleteTask = async (id: number) => {
    const taskStore = this.props.taskStore!;
    taskStore.deleteTask(id).then(async res => {
      await this.getTasks();
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false
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
    const {
      loading,
      modalVisible,
      initialValue,
      updatingTaskId,
      actionType
    } = this.state;
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
                        <span
                          onClick={() => {
                            this.setState({
                              modalVisible: true,
                              actionType: "update",
                              updatingTaskId: record.id,
                              initialValue: {
                                challenge_score: record.challenge_score,
                                reward_score: record.reward_score
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
        />
        <Modal
          title={
            actionType === "create"
              ? "Create Task"
              : `Update Task: ${updatingTaskId}`
          }
          visible={modalVisible}
          footer={null}
          onCancel={this.closeModal}
        >
          <TaskForm
            onSave={actionType === "create" ? this.createTask : this.updateTask}
            onCancel={this.closeModal}
            initialValues={initialValue}
          />
        </Modal>
      </div>
    );
  }
}
