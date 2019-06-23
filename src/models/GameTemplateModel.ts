import User from "../apis/interface/User";
import GameTemplate, {
  GameTemplateCategory
} from "apis/interface/GameTemplate";
import moment from "moment";
import { dateFormat } from "../constants/index";

export default class GameTemplateModel {
  id: number;
  category: GameTemplateCategory;
  challenge_count: number;
  challenge_score: number;
  created_at: string;
  creator: User;
  duration: number;
  description: string;
  quarter_ended_at: string;
  quarter_started_at: string;

  constructor(gameTemplate: GameTemplate) {
    this.id = gameTemplate.id;
    this.category = gameTemplate.category;
    this.challenge_count = gameTemplate.challenge_count;
    this.challenge_score = gameTemplate.challenge_score;
    this.created_at = moment(gameTemplate.created_at).format(dateFormat);
    this.creator = gameTemplate.creator;
    this.duration = gameTemplate.duration;
    this.description = gameTemplate.description;
    this.quarter_ended_at =
      gameTemplate.quarter_ended_at != null
        ? moment(gameTemplate.quarter_ended_at).format(dateFormat)
        : "";
    this.quarter_started_at =
      gameTemplate.quarter_started_at != null
        ? moment(gameTemplate.quarter_started_at).format(dateFormat)
        : "";
  }
}
