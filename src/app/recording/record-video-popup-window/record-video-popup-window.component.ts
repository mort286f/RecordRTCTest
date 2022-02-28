import { Component, Inject, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as RecordRTC from 'recordRTC';
import { observable, Observable } from 'rxjs';
import { VideoServiceService } from 'src/app/services/video-service.service';
import { Stream } from 'stream';
import { DomSanitizer } from '@angular/platform-browser';


// import {VideoRecordingService} from '../../services/video-service.service';
// import { VideoRequest, VideoResponse } from 'src/protobuf/generated/transfer_pb';
// import { Status, TransferClient } from 'src/protobuf/generated/transfer_pb_service';

@Component({
  selector: 'app-record-video-popup-window',
  templateUrl: './record-video-popup-window.component.html',
  styleUrls: ['./record-video-popup-window.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class RecordVideoPopupWindowComponent implements OnInit {

@ViewChild('videoElement') videoElement: any;

  video: any;
  displayControls = true;
  isVideoRecording = false;
  videoBlob: any;
  videoTitle: any;
  blobUrl: any;
  private record_RTC: any;
  // videoElement: HTMLVideoElement = {} as HTMLVideoElement;
  videoConf = { video: { facingMode: "user", width: 720}, audio: true};
  private videoSubscription: Observable<any> = new Observable();


  //WebcamModule properties
  public showWebcam = true;
  public deviceId = String;
  public videoOptions: MediaTrackConstraints = {
    width: {ideal: 1024},
    height: {ideal: 576}
  };

  constructor(private dialog: MatDialog, private videoStream: MediaStream, private videoService: VideoServiceService, private ref: ChangeDetectorRef, private sanitizer: DomSanitizer) {

    this.videoService.getRecordedBlob().subscribe((data) => {
      this.videoBlob = data.blob;
      this.videoTitle = data.title;
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(data.url);
      this.ref.detectChanges();
    });

    this.videoService.getStream().subscribe((stream) => {
      this.videoStream = stream;
      this.ref.detectChanges();
   });



  }
  ngOnInit(): void {
  }

  //Error handling method, called with .then after VideoSuccessCallback is called
  handleError(error: any) {
    console.log('Cant play video in the browser. Error: ' + error);
  }


  startRecording() {
    if(!this.isVideoRecording){
      console.log('recording started')
      this.isVideoRecording = true;
      this.videoService.startRecording().subscribe(stream => {
        this.video = this.videoElement = document.querySelector('#videoElement') as HTMLMediaElement;
        this.video.srcObject = stream;
        console.log(stream);
        console.log('video src: ' + this.video.srcObject);
        this.video.play();
      });
      // this.videoSubscription.subscribe(this.VideoSuccessCallback);

      // navigator.mediaDevices
      // .getUserMedia(media)
      // .then(this.VideoSuccessCallback.bind(this), this.handleError.bind(this));
    }
  }

  // VideoSuccessCallback(stream: MediaStream) {
  // console.log('entered video success callback method')
  // this.videoStream = stream;
  // const record = new RecordRTC(stream,
  //   {
  //     mimeType: 'video/webm',
  //     bitsPerSecond: 128000,
  //   });
  //   console.log("right before startRecording")
  //   this.record_RTC.startRecording();
  //   const videoElement: HTMLVideoElement = this.video.nativeElement;
  //   videoElement.srcObject = stream;
  //   const videoObs = {
  //     next:  videoElement.srcObject,
  //     error: console.log('Error occured in videoObs'),
  //     complete: console.log('complete')
  //   }
  //   return videoObs;
  //WRONG AND OUTDATED:
  //video.srcObject = window.URL.createObjectURL(stream);
  //video.srcObject = window.URL.createObjectURL(videoBlob);
  // }

  stopRecording() {
    if(this.isVideoRecording) {
      this.videoService.stopRecording()
      this.video.srcObject = this.blobUrl;
      console.log('blob logged: ' + this.blobUrl);
      this.isVideoRecording = false;
    }
  }

  CloseDialog(){
    this.dialog.closeAll();
  }
}
