export type VoucherType = {
  id?: number;
  user_id?: number | any;
  code?: string;
  amount: number | null;
  is_redeemed?: number;
  full_name?: string;
  expiry_date: string;
  is_claimed?: number;
  claimed_at?: string;
};
export type VoucherItems = {
  items: VoucherType[];
  offset: number;
  total_page: number;
  total_items: number;
};
