export default interface IOrder {
  _id: string;
  user: string;
  status: string;
  discount: number;
  total_price: number;
  method: string;
  receive_date: Date;
  createdAt: Date;
  updatedAt: Date;
}
