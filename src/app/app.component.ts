import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // setup your signature endpoint here: https://github.com/zoom/websdk-sample-signature-node.js
  //signatureEndpoint = 'http://localhost:4000'
  apiKey = 'ThjiOETBSr6TGTSZ2NdYWA'
  apiSecret =  'xELagy0IqWra64TDFB7iaU0hy4L0ocCozG5v'
  meetingNumber;
  //meetingNumber = 97506194511
  role = 1
  leaveUrl = 'http://localhost:4200'
  userName = 'Test User'
  userEmail = 'purendu220@gmail.com'
  passWord;
  //passWord = '163098'

  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document) {

  }

  ngOnInit() {

  }

  getSignature() {
    if(this.meetingNumber&&this.meetingNumber+"".length>0&&this.passWord&&this.passWord+"".length>0){
      ZoomMtg.generateSignature({
        meetingNumber: this.meetingNumber,
        apiKey: this.apiKey,
        apiSecret: this.apiSecret,
        role: this.role,
        success: (res) => {
          console.log(res.result);
          this.startMeeting(res.result)
  
        }
      });
    }else{
      alert("Meeting ID and Password is required");
    }
 

  }

  startMeeting(signature) {

    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          meetingNumber: this.meetingNumber,
          userName: this.userName,
          apiKey: this.apiKey,
          userEmail: this.userEmail,
          passWord: this.passWord,
          success: (success) => {
            console.log(success)
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
}
