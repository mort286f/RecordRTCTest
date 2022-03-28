import { Component, Inject, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as RecordRTC from 'recordrtc';
import { Observable, of } from 'rxjs';
import { VideoServiceService } from 'src/app/services/video-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ThisReceiver } from '@angular/compiler';


// import {VideoRecordingService} from '../../services/video-service.service';
// import { VideoRequest, VideoResponse } from 'src/protobuf/generated/transfer_pb';
// import { Status, TransferClient } from 'src/protobuf/generated/transfer_pb_service';

@Component({
  selector: 'app-record-video-popup-window',
  templateUrl: './record-video-popup-window.component.html',
  styleUrls: ['./record-video-popup-window.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class RecordVideoPopupWindowComponent implements AfterViewInit {

constructor(private dialog: MatDialog) {

}

ngAfterViewInit(): void {

}

  CloseDialog(){
    this.dialog.closeAll();
  }


  startRecording() {

  }

  stopRecording() {

  }

  clearRecording() {

  }

}
