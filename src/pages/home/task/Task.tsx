import React, { Component } from 'react';
import './Task.scss';
import { observer, inject } from 'mobx-react';
import TaskStore from '../../../stores/TaskStore';

interface TaskProps {
  taskStore?: TaskStore;
}

@inject('taskStore')
@observer
export default class Task extends Component<TaskProps> {
  render() {
    return <div className="task">
      Task Works!
    </div>
  }
}