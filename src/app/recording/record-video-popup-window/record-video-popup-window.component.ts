import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MediaStreamDirective } from './mediastreamDirective/media-stream.directive';


// import {VideoRecordingService} from '../../services/video-service.service';
// import { VideoRequest, VideoResponse } from 'src/protobuf/generated/transfer_pb';
// import { Status, TransferClient } from 'src/protobuf/generated/transfer_pb_service';

@Component({
  selector: 'app-record-video-popup-window',
  templateUrl: './record-video-popup-window.component.html',
  styleUrls: ['./record-video-popup-window.component.css'],
})

export class RecordVideoPopupWindowComponent implements AfterViewInit {

@ViewChild(MediaStreamDirective)
public mediaStream!: MediaStreamDirective;

public videoSrc!: SafeUrl;
constructor(private dialog: MatDialog, private sanitizer: DomSanitizer) { }

ngAfterViewInit(): void {

}

public onVideo(data: Blob): void {
this.videoSrc = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data));
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
