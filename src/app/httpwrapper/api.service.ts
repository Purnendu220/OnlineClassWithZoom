import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { HttpSuccesFailureResponse } from './http-success-fail-listener';
import { ApiConstants } from './app-constant.service';
import { LocalStorageService } from './localstorage.service';


type ResponseInterceptor = (response: any) => any;
type ErrorInterceptor = (error: any) => any;


const absoluteURLPattern = /^((?:https:\/\/)|(?:http:\/\/)|(?:www))/;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public SERVER_URL = "http://66.42.50.129:7000/api/v1/";

  constructor(private httpClient: HttpClient) { }


  
  public fetchData(url,type,callback:HttpSuccesFailureResponse){  
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this.httpClient.get(url,{ headers: headers}).subscribe(data=>{
        callback.onSuccess(type,data);
    },error=>{
       callback.onFailure(type,error)

    });
  }
  
  public loginUser(email,password,callback:HttpSuccesFailureResponse){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    let request = {email : email, password: password,fcmToken:"NA"}

return this.httpClient.post(this.SERVER_URL+"login",request,{ headers: headers}).subscribe(data=>{
  ""
      callback.onSuccess(ApiConstants.loginApi,data);
  },error=>{
    if(error.error){
      callback.onFailure(ApiConstants.loginApi,error.error.errorMessage)
     }else{
      callback.onFailure(ApiConstants.loginApi,error.statusText)
  
     }

  });


  }
  public registerUser(request,callback:HttpSuccesFailureResponse){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

return this.httpClient.post(this.SERVER_URL+"user",request,{ headers: headers}).subscribe(data=>{
      callback.onSuccess(ApiConstants.registerApi,data);
  },error=>{
    if(error.error){
      callback.onFailure(ApiConstants.registerApi,error.error.errorMessage)
     }else{
      callback.onFailure(ApiConstants.registerApi,error.statusText)
  
     }
  });


  }
  public getFindUser(callback:HttpSuccesFailureResponse){
    let token=LocalStorageService.getAuthToken();
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8','x-auth': token+"" });
 

return this.httpClient.get(this.SERVER_URL+"user",{ headers: headers}).subscribe(data=>{
      callback.onSuccess(ApiConstants.findUserApi,data);
  },error=>{
    if(error.error){
      callback.onFailure(ApiConstants.findUserApi,error.error.errorMessage)
     }else{
      callback.onFailure(ApiConstants.findUserApi,error.statusText)
  
     }
  });


  }

  public createCategory(request,callback:HttpSuccesFailureResponse){
    let token=LocalStorageService.getAuthToken();
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8','x-auth': token+"" });
 
return this.httpClient.post(this.SERVER_URL+"category",request,{ headers: headers}).subscribe(data=>{
      callback.onSuccess(ApiConstants.createCategoryApi,data);
  },error=>{
    if(error.error){
      callback.onFailure(ApiConstants.createCategoryApi,error.error.errorMessage)
     }else{
      callback.onFailure(ApiConstants.createCategoryApi,error.statusText)
  
     }
  });


  }
  public createSubCategory(request,callback:HttpSuccesFailureResponse){
    let token=LocalStorageService.getAuthToken();
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8','x-auth': token+"" });
 
return this.httpClient.post(this.SERVER_URL+"sub-category",request,{ headers: headers}).subscribe(data=>{
      callback.onSuccess(ApiConstants.createSubCategoryApi,data);
  },error=>{
    if(error.error){
      callback.onFailure(ApiConstants.createSubCategoryApi,error.error.errorMessage)
     }else{
      callback.onFailure(ApiConstants.createSubCategoryApi,error.statusText)
  
     }
  });
  

  }
  public createSignature(request,callback:HttpSuccesFailureResponse){
    let token=LocalStorageService.getAuthToken();
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8','x-auth': token+"" });
 
return this.httpClient.post(this.SERVER_URL+"signature",request,{ headers: headers}).subscribe(data=>{
      callback.onSuccess(ApiConstants.createSignature,data);
  },error=>{
    if(error.error){
      callback.onFailure(ApiConstants.createSignature,error.error.errorMessage)
     }else{
      callback.onFailure(ApiConstants.createSignature,error.statusText)
  
     }
  });
  

  }

  public getCategoryList(callback:HttpSuccesFailureResponse){  
    let token=LocalStorageService.getAuthToken();
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8','x-auth': token+"" });
   // headers.append('Authorization',token+"");

         //headers.set('x-auth',token+"");
    return this.httpClient.get(this.SERVER_URL+"category",{ headers: headers}).subscribe(data=>{
        callback.onSuccess(ApiConstants.getCategoryApi,data);
    },error=>{
       callback.onFailure(ApiConstants.getCategoryApi,error)

    });
  }
  public getCompleteCategoryList(callback:HttpSuccesFailureResponse){  
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8' });
   // headers.append('Authorization',token+"");

         //headers.set('x-auth',token+"");
    return this.httpClient.get(this.SERVER_URL+"complete-category",{ headers: headers}).subscribe(data=>{
        callback.onSuccess(ApiConstants.getCompleteCategoryApi,data);
    },error=>{
       callback.onFailure(ApiConstants.getCompleteCategoryApi,error)

    });
  }
  public getSubCategoryList(categoryId,callback:HttpSuccesFailureResponse){  
    let token=LocalStorageService.getAuthToken();
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8','x-auth': token+"" });
 
    return this.httpClient.get(this.SERVER_URL+"sub-category/"+categoryId,{ headers: headers}).subscribe(data=>{
        callback.onSuccess(ApiConstants.getSubCategoryApi,data);
    },error=>{
       callback.onFailure(ApiConstants.getSubCategoryApi,error)

    });
  }
  public getCurrencyList(callback:HttpSuccesFailureResponse){  
    let token=LocalStorageService.getAuthToken();
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8','x-auth': token+"" });
 
    return this.httpClient.get(this.SERVER_URL+"currency",{ headers: headers}).subscribe(data=>{
        callback.onSuccess(ApiConstants.currencyListApi,data);
    },error=>{
       callback.onFailure(ApiConstants.currencyListApi,error)

    });
  }
  currency

  public uploadContents(files,callback:HttpSuccesFailureResponse,name?){ 
   let    uploadedfiles =0;
   let token=LocalStorageService.getAuthToken();
   const headers = new HttpHeaders({'x-auth': token+"" });
                    
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        var formData: any = new FormData();
        if(name&&name.length>0){
          formData.append("name",name)

        }else{
          formData.append("name",new Date().getTime())

        }
        formData.append("file", file);
         this.httpClient.post(this.SERVER_URL+"upload",formData,{ headers: headers}).subscribe(data=>{
            uploadedfiles = uploadedfiles+1;
            callback.onSuccess(ApiConstants.uploadContents,data);
           
      },error=>{
         callback.onFailure(ApiConstants.uploadContents,error)
  
      }); 
      
      }
          
         
    //const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8' });
   // headers.append('Authorization',token+"");

         //headers.set('x-auth',token+"");
   
  }

  public  getCourseMaterialList(callback){
    let token=LocalStorageService.getAuthToken();
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8','x-auth': token+"" });
 
    this.httpClient.get(this.SERVER_URL+"upload",{ headers: headers}).subscribe(data=>{
      callback.onSuccess(ApiConstants.courseMaterialList,data);
     
},error=>{
  if(error.error){
    callback.onFailure(ApiConstants.courseMaterialList,error.error.errorMessage)
   }else{
    callback.onFailure(ApiConstants.courseMaterialList,error.statusText)

   }

}); 


  }
  public createCourse(formData,callback:HttpSuccesFailureResponse){ 
    let token=LocalStorageService.getAuthToken();
    const headers = new HttpHeaders({'x-auth': token+"" });
 
         return this.httpClient.post(this.SERVER_URL+"course?debug=true",formData,{ headers: headers}).subscribe(data=>{
             callback.onSuccess(ApiConstants.createCourse,data);
            
       },error=>{
          callback.onFailure(ApiConstants.createCourse,error)
   
       }); 
       
       
           
          
     //const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8' });
    // headers.append('Authorization',token+"");
 
          //headers.set('x-auth',token+"");
    
   }

   public courseBooking(request,callback:HttpSuccesFailureResponse){ 
    let token=LocalStorageService.getAuthToken();
    const headers = new HttpHeaders({'x-auth': token+"" });
 
         return this.httpClient.post(this.SERVER_URL+"booking",request,{ headers: headers}).subscribe(data=>{
             callback.onSuccess(ApiConstants.courseBookingApi,data);
            
       },error=>{
        if(error.error){
          callback.onFailure(ApiConstants.courseBookingApi,error.error.errorMessage)
         }else{
          callback.onFailure(ApiConstants.courseBookingApi,error.statusText)
      
         }
   
       }); 
      }

      public courseCancel(request,callback:HttpSuccesFailureResponse){ 
        let token=LocalStorageService.getAuthToken();
        const headers = new HttpHeaders({'x-auth': token+"" });
     return this.httpClient.post(this.SERVER_URL+"cancel-booking",request,{ headers: headers}).subscribe(data=>{
                 callback.onSuccess(ApiConstants.courseCancelApi,data);
                
           },error=>{
            if(error.error){
              callback.onFailure(ApiConstants.courseCancelApi,error.error.errorMessage)
             }else{
              callback.onFailure(ApiConstants.courseCancelApi,error.statusText)
          
             }
       
           }); 
          }

      public getBookingList(callback:HttpSuccesFailureResponse){ 
        let token=LocalStorageService.getAuthToken();
        const headers = new HttpHeaders({'x-auth': token+"" });
     
             return this.httpClient.get(this.SERVER_URL+"student-classes",{ headers: headers}).subscribe(data=>{
                 callback.onSuccess(ApiConstants.courseBookingListApi,data);
                
           },error=>{
            if(error.error){
              callback.onFailure(ApiConstants.courseBookingListApi,error.error.errorMessage)
             }else{
              callback.onFailure(ApiConstants.courseBookingListApi,error.statusText)
          
             }
       
           }); 
          } 

      public getCourseList(request,callback:HttpSuccesFailureResponse){ 
        let token=LocalStorageService.getAuthToken();
        const headers = new HttpHeaders({'x-auth': token+"" });
     
             return this.httpClient.post(this.SERVER_URL+"booking",request,{ headers: headers}).subscribe(data=>{
                 callback.onSuccess(ApiConstants.courseBookingApi,data);
                
           },error=>{
            if(error.error){
              callback.onFailure(ApiConstants.courseBookingApi,error.error.errorMessage)
             }else{
              callback.onFailure(ApiConstants.courseBookingApi,error.statusText)
          
             }
       
           }); 
          }    

   public getCouseList(callback:HttpSuccesFailureResponse){ 
    let token=LocalStorageService.getAuthToken();
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8','x-auth': token+"" });
 
         return this.httpClient.get(this.SERVER_URL+"course?debug=true",{ headers: headers}).subscribe(data=>{
             callback.onSuccess(ApiConstants.courseListApi,data);
            
       },error=>{
          callback.onFailure(ApiConstants.courseListApi,error)
   
       }); 
       
       
           
          
     //const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8' });
    // headers.append('Authorization',token+"");
 
          //headers.set('x-auth',token+"");
    
   }
   public getCourseDetail(id,callback:HttpSuccesFailureResponse){ 
    let token=LocalStorageService.getAuthToken();
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8','x-auth': token+"" });
 
         return this.httpClient.get(this.SERVER_URL+"course/"+id,{ headers: headers}).subscribe(data=>{
             callback.onSuccess(ApiConstants.courseDetailApi,data);
            
       },error=>{
          callback.onFailure(ApiConstants.courseDetailApi,error)
   
       }); 

    
   }

   public searchCouseList(callback:HttpSuccesFailureResponse,date,SubCategoryId?,text?,categoryId?){ 
    let token=LocalStorageService.getAuthToken();
    let querryParams = "?date="+date
    if(SubCategoryId){
      querryParams = querryParams+"&SubCategoryId="+SubCategoryId 
    }
    if(text){
      querryParams = querryParams+"&text="+text 
    }
    if(text){
      querryParams = querryParams+"&categoryId="+categoryId 
    }
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8','x-auth': token+"" });
 
         return this.httpClient.get(this.SERVER_URL+"course-search"+querryParams,{ headers: headers}).subscribe(data=>{
             callback.onSuccess(ApiConstants.courseSearchApi,data);
            
       },error=>{
          callback.onFailure(ApiConstants.courseSearchApi,error)
   
       }); 
       
       
           
          
     //const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8' });
    // headers.append('Authorization',token+"");
 
          //headers.set('x-auth',token+"");
    
   }
   public searchCouseListBySubject(callback:HttpSuccesFailureResponse,SubCategoryId?){ 
    let token=LocalStorageService.getAuthToken();
    let querryParams = "?SubCategoryId="+SubCategoryId
    
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8','x-auth': token+"" });
 
         return this.httpClient.get(this.SERVER_URL+"course-search"+querryParams,{ headers: headers}).subscribe(data=>{
             callback.onSuccess(ApiConstants.courseSearchApi,data);
            
       },error=>{
          callback.onFailure(ApiConstants.courseSearchApi,error)
   
       }); 
       
       
           
          
     //const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8' });
    // headers.append('Authorization',token+"");
 
          //headers.set('x-auth',token+"");
    
   }
   public courseFinish(courseId,callback:HttpSuccesFailureResponse,SubCategoryId?){ 
    let token=LocalStorageService.getAuthToken();
    
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8','x-auth': token+"" });
    let request ={"courseId": courseId}
         return this.httpClient.post(this.SERVER_URL+"finish-course",request,{ headers: headers}).subscribe(data=>{
             callback.onSuccess(ApiConstants.courseFinishApi,data);
            
       },error=>{
          callback.onFailure(ApiConstants.courseFinishApi,error)
   
       }); 
       
       
           
          
     //const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8' });
    // headers.append('Authorization',token+"");
 
          //headers.set('x-auth',token+"");
    
   }
}
