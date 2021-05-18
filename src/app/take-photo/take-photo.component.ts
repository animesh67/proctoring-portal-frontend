import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { enums } from '../enums/enums';
import { InfoDialog } from '../services/infoDialog';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-take-photo',
  templateUrl: './take-photo.component.html',
  styleUrls: ['./take-photo.component.css']
})
export class TakePhotoComponent implements OnInit {

  s:any=true;
  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  public captures: Array<any>;

  public constructor(private dialog:InfoDialog,private http:HttpClient,
    private loginService:LoginService,private router:Router) {
    this.captures = [];
  }

  public ngOnInit() { }
  streamVid=null;

  public async ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.streamVid=stream
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
        }
      } catch (err) {
        this.dialog.display("Error","Permission Denied: Allow browser to access camera and reload the page")
        console.log(err)
      }
    }
  }
  ngOnDestroy(){
    this.streamVid.getTracks().forEach(function(track) {
      if (track.readyState == 'live') {
          track.stop();
      }
  });
  }

  retry=()=>{
    this.video.nativeElement.play();
    this.s=true;
  }
  image;

  public capture() {
    this.video.nativeElement.pause();
    let context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0,640 ,480);
    context=this.canvas.nativeElement.toDataURL("image/png");
    this.image=context;
    this.s=false
  }
  async upload(){
   const res:any= await this.http.post(enums.postImage,{img:this.image}).toPromise();
   if(res.status===200){
    this.dialog.display("Success","Image Upload Successful");
    this.loginService.user.isImage=true;
    this.loginService.saveSession();
    this.loginService.imaa=true;
    this.router.navigate(["/profile"])
   }
   else{
    this.dialog.display("Error","Image Upload Unsuccessful")
   }

  }
}
