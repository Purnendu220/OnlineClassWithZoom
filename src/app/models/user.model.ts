export interface UserModel {
  status: boolean;
  id: number;
  userType: string;
  name: string;
  email: string;
  password: string;
  userToken: string;
  mobile: number;
  fcmToken: string;
  updatedAt: string;
  createdAt: string;
  image:string;
}