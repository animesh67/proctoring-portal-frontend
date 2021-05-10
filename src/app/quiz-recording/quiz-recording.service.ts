import { Injectable } from '@angular/core';
import * as RecordRTC from 'recordrtc';
@Injectable({
  providedIn: 'root'
})
export class QuizRecordingService {

  public isMicWebCamEnabled:boolean=false;
  private stream=new MediaStream();
  private recorder: RecordRTC = new RecordRTC(this.stream);
  private timeDur=1000;
  constructor() { }
  startRecording(): any {
    this.recorder = new RecordRTC(this.stream, {
      type: 'video',
      mimeType: 'video/webm',
      bitsPerSecond: 44000
    });
    this.recorder.startRecording();
    this.processRec(this.timeDur);
  }
  processRec(timeDur: number) {
    setTimeout(() => {
      this.recorder.stopRecording(()=>{
        const recording=this.recorder.getBlob();
    console.log(recording);
    this.recorder.save("rec");
      })
    }, 5000);
  }
  enableMicWebCamAccess():any{
    navigator.mediaDevices.getUserMedia({audio:true}).then((mediaStream)=>{
      this.stream=mediaStream;
      console.log(this.stream);
      this.isMicWebCamEnabled=true;
    }).catch((failureReason)=>{
        alert("Please enable microphone and WebCam access!");
        this.isMicWebCamEnabled=false;
    });
  }
 
}