export type CategoryType = {
  id?: number;
  category_name: string;
  description: string;
};

export type CategoryItems = {
  items: CategoryType[];
  offset: number;
  total_page: number;
  total_items: number;
};
