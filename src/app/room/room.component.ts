import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { WebSocketService } from "../services/web-socket.service";
import { PeerService } from "../services/peer.service";
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  roomName: string;
  currentStream: any;
  listUser: Array<any> = [];
  isStudent = this.loginService.user.access === "student";
  constructor(private route: ActivatedRoute, private webSocketService: WebSocketService,
    private peerService: PeerService, private loginService: LoginService) {
    this.roomName = this.route.snapshot.paramMap.get('id');
    console.log(this.roomName)
  }

  ngOnInit(): void {
    this.loginService.ifInLocal()
    this.checkMediaDevices();
    this.initPeer();
    this.initSocket();
    // setInterval(() => {
    //   this.ngOnInit()
    // }, 5000)
  }

  initPeer = () => {
    const { peer } = this.peerService;
    peer.on('open', (id) => {
      const body = {
        idPeer: id,
        roomName: this.roomName
      };

      this.webSocketService.joinRoom(body);
    });


    peer.on('call', callEnter => {
      callEnter.answer(this.currentStream);
      callEnter.on('stream', (streamRemote) => {
        this.addVideoUser(streamRemote);
      });
    }, err => {
      console.log('*** ERROR *** Peer call ', err);
    });
  }

  initSocket = () => {
    this.webSocketService.cbEvent.subscribe(res => {
      if (res.name === 'new-user') {
        const { idPeer } = res.data;
        this.sendCall(idPeer, this.currentStream);
      }
    })
  }

  checkMediaDevices = () => {
    if (navigator && navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
      }).then(stream => {
        this.currentStream = stream;
        this.addVideoUser(stream);

      }).catch(() => {
        console.log('*** ERROR *** Not permissions');
      });
    } else {
      console.log('*** ERROR *** Not media devices');
    }
  }

  addVideoUser = (stream: any) => {
    if(stream===this.currentStream){
      return;
    }
    this.listUser.push(stream);
    const unique = new Set(this.listUser);
    this.listUser = [...unique];
  }

  sendCall = (idPeer, stream) => {
    const newUserCall = this.peerService.peer.call(idPeer, stream);
    if (!!newUserCall) {
      newUserCall.on('stream', (userStream) => {
        this.addVideoUser(userStream);
      })
    }
  }
  ngOnDestroy() {
    this.currentStream.getTracks().forEach(function (track) {
      if (track.readyState == 'live') {
        track.stop();
      }
    })
    this.loginService.ifInLocal()
  }

}
