import { Injectable } from '@angular/core';
import "./helper"
import Peer from 'peerjs';

@Injectable({
  providedIn: 'root'
})
export class PeerService {
  peer: any;

  constructor() {
    this.peer = new Peer(undefined, {
      secure:true,
     host:"peer-js-virtual-invigilation.herokuapp.com",
     port:443,
    });
  }
}