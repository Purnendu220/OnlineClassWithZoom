import { UserModel } from '../models/user.model';

export class LocalStorageService {
  
    public static setAuthToken(token){
    localStorage.setItem(LocalStorageConstants.authToken,token);

  }
  public static getAuthToken(){
    return localStorage.getItem(LocalStorageConstants.authToken);

  }
  public static setCourseBook(courseId){
    localStorage.setItem(LocalStorageConstants.courseBook+"_"+LocalStorageService.getUserId()+"_"+courseId,"true");

  }
  public static clearBooking(courseId){
    localStorage.setItem(LocalStorageConstants.courseBook+"_"+LocalStorageService.getUserId()+"_"+courseId,"false");
    localStorage.setItem(LocalStorageConstants.courseBook+"_"+LocalStorageService.getUserId()+"_"+courseId+"_id","");

  }
  public static setCourseBookingId(courseId,bookingId){
    localStorage.setItem(LocalStorageConstants.courseBook+"_"+LocalStorageService.getUserId()+"_"+courseId+"_id",""+bookingId);

  }
  public static getCourseBookingId(courseId){
   return localStorage.getItem(LocalStorageConstants.courseBook+"_"+LocalStorageService.getUserId()+"_"+courseId+"_id");

  }
  public static isCourseBooked(courseId){
    let isBooked = localStorage.getItem(LocalStorageConstants.courseBook+"_"+LocalStorageService.getUserId()+"_"+courseId);
      if(isBooked&&isBooked=="true"){
        return true;
      }
      return false;
  }

  public static setUserData(userData){
    localStorage.setItem(LocalStorageConstants.userData,JSON.stringify(userData));

  }
  public static getUserData():UserModel{
    return JSON.parse(localStorage.getItem(LocalStorageConstants.userData)) ;


  }
  static getUserId(): number {
    const user: UserModel = LocalStorageService.getUserData();
    if (user) {
    return user.id;
      } else {
      return 0;
    }
  }
  static isATeacher():boolean{
    const user: UserModel = LocalStorageService.getUserData();
    if (user) {
      if(user.userType=="TEACHER"){
        return true;
      }
      return false;
        } else {
        return false;
      }
  }
 

  static setIsLoggedIn(isLogin): void {
    localStorage.setItem(LocalStorageConstants.isLoogedIn, String(isLogin));
  }
  static isLoggedIn():boolean{
    if(localStorage.getItem(LocalStorageConstants.isLoogedIn)){
      return Boolean(localStorage.getItem(LocalStorageConstants.isLoogedIn));
         }else{
        return false;
      }

  }

  static clearStorage(): void {
    localStorage.removeItem(LocalStorageConstants.userData);
    localStorage.removeItem(LocalStorageConstants.isLoogedIn);
    localStorage.removeItem(LocalStorageConstants.authToken);

  
  }

}
export class LocalStorageConstants{
   public static authToken="auth-token";
   public static userData = "user-data";
   public static isLoogedIn = "is-loged-in";
   public static courseBook = "course-book";

}
