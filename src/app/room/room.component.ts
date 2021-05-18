import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { WebSocketService } from "../services/web-socket.service";
import { PeerService } from "../services/peer.service";
import { LoginService } from '../services/login.service';
import { InfoDialog } from "../services/infoDialog"
import { HttpClient } from '@angular/common/http';
import { enums } from '../enums/enums';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  @ViewChild("def") vid;
  myId;
  roomName: string;
  currentStream: any;
  listUser: Array<any> = [];
  isStudent=this.loginService.user.access === "student"
  constructor(private route: ActivatedRoute, private webSocketService: WebSocketService,
    private info: InfoDialog, private renderer: Renderer2,
    private peerService: PeerService, private loginService: LoginService,
    private http:HttpClient) {
    this.roomName = this.route.snapshot.paramMap.get('id');
    console.log(this.roomName);
        // window.location.reload()

  }

  ngOnInit(): void {
    this.checkMediaDevices();
    this.initPeer();
    this.initSocket();
  }

  initPeer = () => {
    const { peer } = this.peerService;
    peer.on('open', (id) => {
      const body = {
        idPeer: id,
        roomName: this.roomName
      };
      this.myId = id;

      this.webSocketService.joinRoom(body);
    });


    peer.on('call', callEnter => {
      callEnter.answer(this.currentStream);
      callEnter.on('stream', (streamRemote) => {
        this.addVideoUser(streamRemote, callEnter.metadata.id);
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
      if (res.name === 'bye-user') {
        console.log("yes")
        const { idPeer } = res.data;
        console.log(idPeer);
        let index = 0;
        for (let i in this.listUser) {
          if (this.listUser[i].id === idPeer) {
            index = parseInt(i);
            break;
          }
        }
        console.log(index)
        this.listUser.splice(index, 1)
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

      }).catch(() => {
        this.info.display("Error", "Camera Permissions not Given");
        console.log('*** ERROR *** Not permissions');
      });
    } else {
      console.log('*** ERROR *** Not media devices');
    }
  }

  addVideoUser = (stream: any, id?) => {
    console.log(this.listUser)
    this.listUser.push({ stream, id })
    const unique = new Set(this.listUser);
    this.listUser = [...unique];
    console.log(this.vid)

  }
  onInactive() {
    console.log("yes");
  }

  sendCall = (idPeer, stream) => {
    const newUserCall = this.peerService.peer.call(idPeer, stream, { metadata: { id: this.myId } });
    if (!!newUserCall) {
      newUserCall.on('stream', (userStream) => {
        this.addVideoUser(userStream, idPeer);
      })
    }
  }
  async ngOnDestroy() {

    if(!this.isStudent){
     const r=await  this.http.delete(enums.postuuid).toPromise();
    }

    console.log(this.currentStream.paused)
    this.currentStream.getTracks().forEach(function (track) {
      if (track.readyState === 'live') {
        track.stop();
      }
    })
  }

}
