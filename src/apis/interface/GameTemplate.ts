import { BaseEntity } from "./Base";
import User from "./User";

export type GameTemplateCategory = "challenge" | "arena" | "quarter";

export default interface GameTemplate extends BaseEntity {
  category: GameTemplateCategory;
  challenge_count: number;
  challenge_score: number;
  creator: User;
  creator_id: number;
  deleted_at?: string;
  description: string;
  duration: number;
  quarter_ended_at: string;
  quarter_started_at: string;
}
