import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import { ApiService } from './httpwrapper/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpSuccesFailureResponse } from './httpwrapper/http-success-fail-listener';
import { ApiConstants } from './httpwrapper/app-constant.service';
import { LocalStorageService } from './httpwrapper/localstorage.service';
import { CourseModel } from './models/course.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,HttpSuccesFailureResponse {

  // setup your signature endpoint here: https://github.com/zoom/websdk-sample-signature-node.js
  //signatureEndpoint = 'http://localhost:4000'
  apiKey = 'ThjiOETBSr6TGTSZ2NdYWA'
  apiSecret =  'xELagy0IqWra64TDFB7iaU0hy4L0ocCozG5v'
  role = 1
  leaveUrl = 'http://localhost:4200'

authToken;
userId;
courseId;
courseDetail:CourseModel;
private sub: any;

  constructor(private apiService:ApiService, @Inject(DOCUMENT) document,private route: ActivatedRoute,private router:Router) {

  }
  onSuccess(type: any, responsedata: any) {
    switch(type){
      case ApiConstants.courseDetailApi:
        this.courseDetail = responsedata.data;
        break
      case ApiConstants.findUserApi:
        LocalStorageService.setUserData(responsedata.data);
        this.apiService.getCourseDetail(this.courseId,this);

        break

    }
    
  }
  onFailure(type: any, response: any) {
    switch(type){
      case ApiConstants.courseDetailApi:
        case ApiConstants.findUserApi:
        break
    }
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
    this.userId = params['id'];
    this.courseId = params['courseId'];
    this.authToken = params['token'];
    this.role = params['role'];
    LocalStorageService.setAuthToken(this.authToken);
     this.apiService.getFindUser(this);
  });
  }


 onDestroy(){
  

 }

}
