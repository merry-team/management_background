import { BaseEntity } from "./Base";
import User from "./User";
import GameTemplate from "apis/interface/GameTemplate";

export default interface Task extends BaseEntity {
  challenge_score: number;
  creator: User;
  creator_id: number;
  // game_template: GameTemplate;
  game_template_id: number;
  lasted: boolean;
  reward_score: number;
}
