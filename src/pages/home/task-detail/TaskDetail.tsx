import React, { Component } from 'react';
import './TaskDetail.scss';
import { observer, inject } from 'mobx-react';
import TaskStore from '../../../stores/TaskStore';

interface TaskDetailProps {
  taskStore?: TaskStore;
}

@inject('taskStore')
@observer
export default class TaskDetail extends Component<TaskDetailProps> {
  render() {
    return <div className="task-detail">
      Task Detail Works!
    </div>
  }
}