import { CourseModel } from '../models/course.model';

export class UtilService{
public static languageList = ["English","Hindi"];
public static priceList = [{"displayVal":" >$10","filterValMax":10,"filterValMin":0},
{"displayVal":"$10-20","filterValMax":20,"filterValMin":10},
{"displayVal":"$20-30","filterValMax":30,"filterValMin":20},
{"displayVal":"$30-40","filterValMax":40,"filterValMin":30},
{"displayVal":"$40-50","filterValMax":50,"filterValMin":40},
{"displayVal":"$50-60","filterValMax":60,"filterValMin":50},
{"displayVal":"$60-70","filterValMax":70,"filterValMin":60},
{"displayVal":"$70-80","filterValMax":80,"filterValMin":70},
{"displayVal":"$80-90","filterValMax":90,"filterValMin":80},
{"displayVal":"$90-100","filterValMax":100,"filterValMin":90},
{"displayVal":"Above $100","filterValMax":10000,"filterValMin":100}]
public static timeList = ["Morning","Afternoon","Evening","Night"];
public static getformatedDate(date){
  let dateObj =  new Date(date);
  let day = dateObj.getDate()>9?dateObj.getDate():"0"+dateObj.getDate();
  let month = dateObj.getMonth()+1;dateObj.getMonth()+1>9?dateObj.getMonth()+1:"0"+dateObj.getMonth()+1;
  let year = dateObj.getFullYear();

  return year+"-"+month+"-"+day;


}

private getDateTime(date,time){
    let dateObj =  new Date(date);
    let timeObj = new Date(time);
    let day = dateObj.getDate()>9?dateObj.getDate():"0"+dateObj.getDate();
    let month = dateObj.getMonth()+1;dateObj.getMonth()+1>9?dateObj.getMonth()+1:"0"+dateObj.getMonth()+1;
    let year = dateObj.getFullYear();
    let hour = timeObj.getHours()>9?timeObj.getHours():"0"+timeObj.getHours();
    let minutes = timeObj.getMinutes()>9?timeObj.getMinutes():"0"+timeObj.getMinutes();
      
    return year+"-"+month+"-"+day+" "+hour+":"+minutes;
  
  
  }
  public static classPrice(element:CourseModel){
    if(element.discount>0){
      let discountedPrice = element.price;
      let disc = (element.price*element.discount)/100;
       discountedPrice = element.price - disc;
       if(discountedPrice<1){
         return "Free";
       }else{
         return discountedPrice;
       }
      }else{
        if(element.price<1){
          return "Free";
        }else{
          return element.price;
        }
    }

 }

 public static classDuration(courseDetail){
  let d = Number(courseDetail.duration);
   var h = Math.floor(d / 3600);
   var m = Math.floor(d % 3600 / 60);
   var s = Math.floor(d % 3600 % 60);

   var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
   var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
   //var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
   return hDisplay + mDisplay ; 

}

public static getCourseTime(date){
  ""
  let dateObj =  new Date(date);
  let hour = dateObj.getHours();
  if(hour<12){
    return "Morning";

  }
  else if(hour>11&&hour<16){
    return "Afternoon";

  }
  else if(hour>15&&hour<20){
    return "Evening";

  }
  else{
    "Night";
  }

}
}