import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"
import { enums } from '../enums/enums';
import { ShowQuizService } from './quiz-service';
import { DomSanitizer } from '@angular/platform-browser';
import { InfoDialog } from '../services/infoDialog';

@Component({
  selector: 'app-show-quiz',
  templateUrl: './show-quiz.component.html',
  styleUrls: ['./show-quiz.component.css']
})
export class ShowQuizComponent implements OnInit {

  @ViewChild('video')
  public video: ElementRef
  vis = true;

  tabInterval;
  tabTimer = 0;
  tabSwitched = 0;
  fullSS = 0;
  audioMute = 0;
  quiz: any = {

  }
  done = false;
  t = {
    m: 0,
    s: 0
  }
  interval;

  constructor(
    private renderer: Renderer2,
    private sanitizer: DomSanitizer,
    private router: Router,
    private http: HttpClient, private route: ActivatedRoute, private service: ShowQuizService,
    private info: InfoDialog) { }
  p = 1;
  fullScreen() {
    let elem = document.documentElement;
    let methodToBeInvoked = elem.requestFullscreen ||
      elem['webkitRequestFullScreen'] || elem['mozRequestFullscreen']
      ||
      elem['msRequestFullscreen'];
    if (methodToBeInvoked) methodToBeInvoked.call(elem);
  }
  lo = -1;
  exitHandler = () => {
    this.fullScreen()
    this.lo++;
    if (this.lo === 0) {
      this.info.display("Info", "Do not exit Full screen mode")
      return;
    }
    if (this.lo % 2 === 0)
      return;
    this.fullSS++;
    this.info.display("Warning", "Full screen mode exited, Flag raised!")

  }
  streamVid=null;
  cha=() => {
    if (this.p == 1) {
      this.p = 0;
      return;
    }
    this.p = 1
    this.tabSwitched++;
    this.info.display("Tab Switched", "Switching tab one more time will lead to auto submission");
    console.log("blur")
  }

  async ngOnInit(): Promise<void> {
    // document.addEventListener('fullscreenchange', this.exitHandler, false);
    // document.addEventListener('mozfullscreenchange', this.exitHandler, false);
    // document.addEventListener('MSFullscreenChange', this.exitHandler, false);
    // document.addEventListener('webkitfullscreenchange', this.exitHandler, false);
    this.fullScreen()
    window.addEventListener('visibilitychange',this.cha );

    if (this.service.isChecked === true) {
      this.service.showInfo("You have already attempted the quiz");
      this.router.navigate(['']);
    }
    this.service.isChecked = true;

    this.quiz = await this.http.get(enums.getQues, {
      params: {
        subject: this.route.snapshot.params.subject,
        id: this.route.snapshot.params.id
      }
    }).toPromise();
    console.log(this.quiz)
    if (this.quiz.ques.type) {
      this.quiz.ques.link = this.quiz.ques.link.split("?")[0] + "?embedded=true";
      this.quiz.ques.link = this.sanitizer.bypassSecurityTrustResourceUrl(this.quiz.ques.link);
    }
    this.t.m = this.quiz.duration;
    this.interval = setInterval(() => {
      if (this.t.m == 0 && this.t.s == 0) {
        this.submit()
      }
      if (this.t.s === 0) {
        this.t.m -= 1;
        this.t.s = 59;
      }
      else {
        this.t.s -= 1;
      }
    }, 1000)

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        this.streamVid = stream;
        console.log(stream)
        if (stream) {
          if (stream.getAudioTracks()[0].muted) {
            this.info.display("Warning", "Your mic has been muted by the system, Please enable it and try again");
            // throw new Error("op")
          }
          setInterval(() => {
            if (stream.getAudioTracks()[0].muted) {
              this.audioMute++;
              this.info.display("Warning", "Your mic has been muted by the system, Please enable it")
            }
          }, 5000)
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
        }
      } catch (err) {
        this.info.display("Error", "Permission Denied: Allow browser to access camera and reload the page")
        this.router.navigate(["quiz", "upcoming-quiz"]);
        if (err = "op") {
          return
        }
        console.log(err)
        throw err;
      }
    }
  }
  submit = async () => {
    this.fullScreen = null;
    this.exitHandler = null;
    if (this.done === true) {
      return;
    }
    this.done = true;
    console.log(document.getElementsByTagName("span"))

    clearInterval(this.interval)
    let pl = await this.http.post(enums.quizResponses, {
      params: {
        subject: this.route.snapshot.params.subject,
        id: this.route.snapshot.params.id
      },
      response: { resp: this.quiz.ques }
    }).toPromise().then(data => data).catch(err => err);
    let p = await this.http.post(`${enums.tab}/${this.route.snapshot.params.id}`, {
      tabsChanged: this.tabSwitched, fullScreenChange: this.fullSS, audioMute: this.audioMute
    }).toPromise();
    this.info.display("Info", "Quiz Submitted");
    this.router.navigate(["quiz", "upcoming-quiz"])
  }
  ngOnDestroy() {
    window.removeEventListener("visibilitychange",this.cha)
    this.fullScreen = null;
    this.exitHandler = null;
    if (this.streamVid) {
      this.streamVid.getTracks().forEach(function (track) {
        if (track.readyState == 'live') {
          track.stop();
        }
      });
    }
  }

  hide() {
    if (this.vis === true) {
      this.video.nativeElement.pause()
      this.vis = false;
    }
    else {
      this.vis = true;
      this.video.nativeElement.play()
    }
  }
}
