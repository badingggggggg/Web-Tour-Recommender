export type ReviewType = {
  id?: number;
  user_id?: number;
  post_id?: number;
  rating: number;
  comment: string;
  created_at?: string;
  full_name?: string;
};
