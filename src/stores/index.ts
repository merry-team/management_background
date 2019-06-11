import { RouterStore } from 'mobx-react-router';
import GameTemplateStore from './GameTemplateStore';
import { gameTemplateApi, taskApi } from '../apis/index';
import TaskStore from './TaskStore';

export const routingStore = new RouterStore();
export const gameTemplateStore = new GameTemplateStore(gameTemplateApi);
export const taskStore = new TaskStore(taskApi);