import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import { ZoomMtg } from '@zoomus/websdk';
import { HttpSuccesFailureResponse } from '../httpwrapper/http-success-fail-listener';
import { ApiService } from '../httpwrapper/api.service';
import { CourseModel } from '../models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiConstants } from '../httpwrapper/app-constant.service';
import { LocalStorageService } from '../httpwrapper/localstorage.service';
import { environment } from 'src/environments/environment';
declare var $: any; 


ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

@Component({
  selector: 'app-live-class',
  templateUrl: './live-class.component.html',
  styleUrls: ['./live-class.component.css']
})
export class LiveClassComponent implements OnInit,HttpSuccesFailureResponse {
  role = environment.roleAudience;
  leaveUrl = environment.courseDetailUrl

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
        this.leaveUrl = environment.courseDetailUrl+"/"+this.courseId;
        this.getSignature();
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
         // window.location.assign(this.leaveUrl);
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

  getSignature() {
      ZoomMtg.generateSignature({
        meetingNumber: this.courseDetail.meeting.meeting_id,
        apiKey: environment.apiKey,
        apiSecret: environment.apiSecret,
        role: this.role,
        success: (res) => {
          console.log(res.result);
          this.startMeeting(res.result)
  
        }
      });
   
 

  }

  startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      isSupportAV: true,
      showMeetingHeader: false, //option
      disableInvite:true,
      isSupportChat: false, //optional,
      disableRecord: true, //optional
      screenShare: this.role ==1?true:false,

      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          meetingNumber: this.courseDetail.meeting.meeting_id,
          userName: LocalStorageService.getUserData().name,
          apiKey: environment.apiKey,
          userEmail: LocalStorageService.getUserData().email,
          passWord: this.courseDetail.meeting.meeting_password,
          success: (success) => {
            console.log(success)
            $('.meeting-info-icon__icon-wrap').hide();
            $('.recording-indication').hide();
            setTimeout(() => {
              let element: HTMLElement = document.getElementsByClassName('zm-btn zm-btn--primary zm-btn__outline--white zm-btn--lg')[0] as HTMLElement;
              element.click();
                 
            }, 4000);
            this.setListenerForZoomMeeting();
            if(this.role==environment.roleHost){
              this.manageMeetingEndAlert();
            }
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  muteUser(){
    ZoomMtg.mute({
      userId: 16797696,
      mute: true
  });
  }
  manageMeetingEndAlert(){
    setTimeout(() => {
      ZoomMtg.leaveMeeting({});

    }, 15000);
  }

  endMeeting(){
    ZoomMtg.endMeeting({});
  }

  setListenerForZoomMeeting(){
    ZoomMtg.inMeetingServiceListener('onUserJoin', function (data) {
      console.log('onUserJoin'+data);
    });
  
    ZoomMtg.inMeetingServiceListener('onUserLeave', function (data) {
      console.log('onUserLeave'+data);
    });
  
    ZoomMtg.inMeetingServiceListener('onUserIsInWaitingRoom', function (data) {
      console.log('onUserIsInWaitingRoom'+data);
    });
  
    ZoomMtg.inMeetingServiceListener('onMeetingStatus', function (data) {
      // {status: 1(connecting), 2(connected), 3(disconnected), 4(reconnecting)}
      console.log('onMeetingStatus'+data);
    });
  }
 onDestroy(){
  

 }

}
