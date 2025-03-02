export type AmenitiesType = {
  id?: number;
  amenity_name: string;
};
export type AmenityItems = {
  items: AmenitiesType[];
  offset: number;
  total_page: number;
  total_items: number;
};
