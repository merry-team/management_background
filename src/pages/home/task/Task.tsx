import React, { Component } from "react";
import "./Task.scss";
import { observer, inject } from "mobx-react";
import TaskStore from "../../../stores/TaskStore";

interface TaskProps {
  taskStore?: TaskStore;
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
      loading: true
    };
  }

  componentDidMount() {
    const taskStore = this.props.taskStore!;
    taskStore.getTasks().then(res => {
      this.setState({
        loading: false
      });
    });
  }

  render() {
    return <div className="task">Task Works!</div>;
  }
}
