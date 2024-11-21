export default interface IUserInfo {
  _id: string;
  user: Object;
  name: string;
  phone_number?: string | null;
  gender?: "Male" | "Female" | "Other" | null;
  birthday?: Date | null;
  body_shape?: string | null;
  height?: number | null;
  weight?: number | null;
  style_preferences?: string[] | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
