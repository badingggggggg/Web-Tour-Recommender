import { AmenitiesType } from './amenities';

export type PostType = {
  id?: number;
  category_id: any;
  title: string;
  description: string;
  location: string;
  price: number;
  price_per_night: number;
  price_currency: string;
  seasonal_price: number;
  discount_price: number;
  category_name?: string;
  images?: string[];
  image_url?: string;
  rating?: number;
  amenities?: AmenitiesType[];
};

export type PostItems = {
  items: PostType[];
  offset: number;
  total_page: number;
  total_items: number;
};
