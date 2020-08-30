import { UserModel } from "./user.model";

export interface CourseModel {
  id: number;
  title: string;
  classType: string;
  classDate: string;
  duration: number;
  classSize: number;
  level: string;
  language: string;
  image: string;
  price: number;
  discount: number;
  video?: string;
  createdAt: string;
  updatedAt: string;
  SubCategoryId: number;
  userId: number;
  courseMaterials: CourseMaterial[];
  descriptions: Description[];
  discountedPrice:any;
  user:UserModel;
  duratuionhhmm:any;
  courseTime:any;
  SubCategory:any;
  attendingStudents:any;
  meeting:Meeting

}
export interface Meeting{
  id:number,
  meeting_uuid:string,
  meeting_id:string,
  meeting_host_email:string,
  meeting_password:string,
  createdAt:string,
  updatedAt:string,
  courseId:string

}


export interface Description {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  courseId: number;
}

export interface CourseMaterial {
  id: number;
  createdAt: string;
  updatedAt: string;
  courseId: number;
  uploadId: number;
}