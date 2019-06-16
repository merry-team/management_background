import Task from "../apis/interface/Task";
import User from "apis/interface/User";

export default class TaskModel {
  challenge_score: number;
  creator: User;
  game_template_id: number;
  // game_template: GameTemplateModel;
  lasted: boolean;
  reward_score: number;

  constructor(task: Task) {
    this.challenge_score = task.challenge_score;
    this.creator = task.creator;
    this.game_template_id = task.game_template_id;
    // this.game_template = new GameTemplateModel(task.game_template);
    this.lasted = task.lasted;
    this.reward_score = task.reward_score;
  }
}
