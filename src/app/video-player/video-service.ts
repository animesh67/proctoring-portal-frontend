import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import {ConfirmDialogModel,VideoPlayerComponent} from "./video-player.component"

@Injectable({
    providedIn: 'root',
  })
export class VideoService {
  constructor(private dialog: MatDialog) {}
  display=(url:string,timestamps:string[])=>{
    const dialogData=new ConfirmDialogModel(url,timestamps)
    this.dialog.open(VideoPlayerComponent,{
      data:dialogData
    });
  }
}
