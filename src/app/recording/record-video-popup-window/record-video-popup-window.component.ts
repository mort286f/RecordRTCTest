import { Component, Inject, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
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

export class RecordVideoPopupWindowComponent implements OnInit {

@ViewChild('videoElement') videoElement: any;

  // video: any;
  videoStream: any;
  displayControls = true;
  isVideoRecording = false;
  videoBlob: any;
  videoTitle: any;
  blobUrl: any;
  start: HTMLElement | any;
  stop: HTMLElement | any;
  mediaRecorder: MediaRecorder | any;
  // videoElement: HTMLVideoElement = {} as HTMLVideoElement;


  constructor(
    private dialog: MatDialog,
    private videoService: VideoServiceService,
    private ref: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    ) {

  //   this.videoService.getRecordedBlob().subscribe((data) => {
  //     this.videoBlob = data.blob;
  //     this.videoTitle = data.title;
  //     this.blobUrl = data.url;
  //     this.ref.detectChanges();
  //   });

  //   this.videoService.getStream().subscribe((stream) => {
  //     this.videoStream = stream;
  //     this.ref.detectChanges();
  //  });



  }
  ngOnInit(): void {
    this.videoElement = document.querySelector('#videoElement') as HTMLMediaElement;
    this.start = document.getElementById('btnStart') as HTMLElement;
    this.stop = document.getElementById('btnStop') as HTMLElement;

    this.start.addEventListener('click', (ev: any)=>{
      this.mediaRecorder.start();
      console.log(this.mediaRecorder.state);
  })
    this.stop.addEventListener('click', (ev: any)=>{
      console.log(this.mediaRecorder.state);
      this.mediaRecorder.stop();
  });

  }

ngOnDestroy(): void {
    this.videoService.abortRecording();
}

  //Error handling method, called with .then after VideoSuccessCallback is called
  handleError(error: any) {
    console.log('Cant play video in the browser. Error: ' + error);
  }


  startRecording() {
      var constraints = {
        audio: true,
        video: {
          facingMode: "user",
          width: 649,
          height: 420,
        }
      };

navigator.mediaDevices.getUserMedia(constraints)
.then((mediaStreamObj) => {
  var video = document.querySelector('#videoElement') as HTMLMediaElement;
  video.srcObject = mediaStreamObj;
  video.onloadedmetadata = function(e) {
    video.play();
  };
  this.mediaRecorder = new MediaRecorder(mediaStreamObj);
  let chunks: any = [];

this.mediaRecorder.ondataavailable = function(ev: any) {
    chunks.push(ev.data);
}
this.mediaRecorder.ondataavailable = function(ev: any) {
  chunks.push(ev.data);
}
this.mediaRecorder.onstop = (ev: any)=>{
    let blob = new Blob(chunks, { 'type' : 'video/mp4;' });
    chunks = [];
    let videoURL = window.URL.createObjectURL(blob);
    const recordedVid = document.querySelector('#videoShow') as HTMLMediaElement;
    recordedVid.src = videoURL;
    console.log('blob: ' + blob);
    console.log('url: ' + videoURL);
    mediaStreamObj.getTracks()[0].stop();
    mediaStreamObj.getTracks()[1].stop();
    this.isVideoRecording = false;
}});
}

      // let streamChunks: any = [];
      // this.isVideoRecording = true;
      // console.log('recording started')
      // let video = this.videoElement;
      // console.log("data from startRecording: " + this.videoService.startRecording());
      // this.videoService.startRecording().subscribe({

      //   next(stream) {
      //     console.log("stream" + stream);
      //     video.srcObject = stream;
      //     console.log('video: ' + video.srcObject)
      //     // this.video.play();

      //   },
      //   error() {
      //     console.log("error 123");
      //   },
      //   complete() {
      //     console.log('complete' + streamChunks);

      //   }
      // });
  // this.isVideoRecording = true;
  // this.videoService.startRecording().then(stream => {
  //   this.video.srcObject = stream;
  //   this.video.play();
  // }).catch(function (err) {
  //   console.log("err start recording" + err);
  // })

  stopRecording() {
    if(this.isVideoRecording) {
      this.videoService.stopRecording()
      // console.log('blob logged: ' + this.video.srcObject);
      this.isVideoRecording = false;
    }
  }

  CloseDialog(){
    this.dialog.closeAll();
  }
}
