export default interface IDiscount extends Document {
  discount_id: Object;
  code: string;
  type: string;
  value: number;
  minimum_value?: number;
  max_discount?: number;
  apply_items: Object[];
  start_date: Date;
  end_date: Date;
  usage_limit?: number;
  used_count: number;
  status: boolean;
  create_date: Date;
  update_date: Date;
}
