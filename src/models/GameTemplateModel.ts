import GameTemplate, {
  GameTemplateCategory
} from "apis/interface/GameTemplate";

export default class GameTemplateModel {
  category: GameTemplateCategory;
  challenge_count: number;
  challenge_score: number;
  created_at: string;
  creator_id: number;
  duration: number;
  description: string;
  quarter_ended_at: string;
  quarter_started_at: string;

  constructor(gameTemplate: GameTemplate) {
    this.category = gameTemplate.category;
    this.challenge_count = gameTemplate.challenge_count;
    this.challenge_score = gameTemplate.challenge_score;
    this.created_at = gameTemplate.created_at;
    this.creator_id = gameTemplate.creator_id;
    this.duration = gameTemplate.duration;
    this.description = gameTemplate.description;
    this.quarter_ended_at = gameTemplate.quarter_ended_at;
    this.quarter_started_at = gameTemplate.quarter_started_at;
  }
}
