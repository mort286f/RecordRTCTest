import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog/';
import { RecordingComponent } from '../recording.component';
import {RecordVideoPopupWindowComponent} from '../record-video-popup-window/record-video-popup-window.component';

@Component({
  selector: 'app-record-dialog-box',
  templateUrl: './record-dialog-box.component.html',
  styleUrls: ['./record-dialog-box.component.css']
})

export class RecordDialogBoxComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  TestVideoDialog(){
    this.dialog.open(RecordVideoPopupWindowComponent, {
      data:{

      }
    })
  }
}
