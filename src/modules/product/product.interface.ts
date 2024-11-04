export default interface IProduct {
  _id: Object;
  product_name: string;
  price: number;
  description: string;
  brand: string;
  stock_quantity: number;
  min_quantity: number;
  sold_quantity: number;
  categories: Object[];
  stock_update_date: Date;
  status: boolean;
  image: string;
  attributes: {
    key: string;
    value: string[];
  }[];
}
