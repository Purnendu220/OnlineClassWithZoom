import { CourseModel } from "./course.model";

export interface BookingModel {
  id: number;
  transactionId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  courseId: number;
  course: CourseModel;
}

