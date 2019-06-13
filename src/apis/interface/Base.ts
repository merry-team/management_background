export default interface Base<T> {
  resource?: T;
  resources?: T;
  pager?: Pager;
}

export interface Pager {
  current_page: number;
  total_page: number;
  total_count: number;
}

export interface BaseEntity {
  id: number;
  created_at: string;
  updated_at: string;
}
