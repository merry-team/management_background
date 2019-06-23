import React, { Component } from "react";
import "./TaskDetail.scss";
import { observer, inject } from "mobx-react";
import TaskStore from "stores/TaskStore";
import { Spin, Icon } from "antd";
import { RouteComponentProps } from "react-router";

interface TaskDetailProps extends RouteComponentProps<{ tid: string }> {
  taskStore?: TaskStore;
}

interface TaskDetailState {
  loading: boolean;
}

@inject("taskStore")
@observer
export default class TaskDetail extends Component<
  TaskDetailProps,
  TaskDetailState
> {
  constructor(props: TaskDetailProps) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    const { selectedTask, getTask } = this.props.taskStore!;
    const tid = this.props.match.params.tid;
    if (!selectedTask) {
      this.setState({
        loading: true
      });
      getTask(Number(tid)).then(res => {
        this.setState({
          loading: false
        });
      });
    }
  }

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { selectedTask } = this.props.taskStore!;
    const { loading } = this.state;

    return (
      <div className="task-detail">
        {loading || !selectedTask ? (
          <Spin />
        ) : (
          <div className="task-detail-container">
            <a className="go-back" onClick={this.goBack}>
              <Icon className="go-back-icon" type="rollback" />
              Go back
            </a>
            <div className="content-container">{selectedTask.id}</div>
          </div>
        )}
      </div>
    );
  }
}
