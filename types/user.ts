export type UserType = {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  full_name: string;
  phone: string;
  user_type?: string;
};
export type UserItems = {
  items: UserType[];
  offset: number;
  total_page: number;
  total_items: number;
};
