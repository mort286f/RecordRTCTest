import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as RecordRTC from 'recordRTC';
import { observable, Observable } from 'rxjs';


// import {VideoRecordingService} from '../../services/video-service.service';
// import { VideoRequest, VideoResponse } from 'src/protobuf/generated/transfer_pb';
// import { Status, TransferClient } from 'src/protobuf/generated/transfer_pb_service';

@Component({
  selector: 'app-record-video-popup-window',
  templateUrl: './record-video-popup-window.component.html',
  styleUrls: ['./record-video-popup-window.component.css']
})

export class RecordVideoPopupWindowComponent implements OnInit {

  @ViewChild('videoElement') videoElement: any;

  video: any;
  displayControls = true;
  isVideoRecording = false;
  videoBlobUrl: any;
  videoName: any;
  private record_RTC: any;
  videoConf = { video: { facingMode: "user", width: 720}, audio: true};
  private videoSubscription: Observable<any> = new Observable();

  constructor(private dialog: MatDialog, private videoStream: MediaStream) { }

  ngOnInit(): void {
    console.log('initiated video popup')
  }

  //Error handling method, called with .then after VideoSuccessCallback is called
  handleError(error: any) {
    console.log('Cant play video in the browser. Error: ' + error);
  }


  startRecording() {
    console.log('recording started')
    this.isVideoRecording = true;
    const media = {
      video: true,
      audio: true
    };




    navigator.mediaDevices
    .getUserMedia(media)
    .then(this.VideoSuccessCallback.bind(this), this.handleError.bind(this));
  }

  VideoSuccessCallback(stream: MediaStream) {
  console.log('entered video success callback method')
  this.videoStream = stream;
  const record = new RecordRTC(stream,
    {
      mimeType: 'video/webm',
      bitsPerSecond: 128000,
    });
    console.log("right before startRecording")
  this.record_RTC.startRecording();
  console.log("right after startRecording")
  const videoElement: HTMLVideoElement = this.video.nativeElement;
  videoElement.srcObject = stream;
  console.log('stream blob: ' + videoElement.srcObject)
  //WRONG AND OUTDATED:
  //video.srcObject = window.URL.createObjectURL(stream);
  //video.srcObject = window.URL.createObjectURL(videoBlob);
  }

  processVideo(audioVideoWebMURL: any) {
    console.log('processing video');
    const videoElement: HTMLVideoElement = this.video.nativeElement;
    const recordRTC = this.record_RTC;
    videoElement.src = audioVideoWebMURL;
    const recordedBlob = recordRTC.getBlob();
    recordRTC.getDataURL(function (dataURL: any) { });
  }

  stopRecording() {
    console.log('stopping recording')
    this.isVideoRecording = false;
    const recordRTC = this.record_RTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    const stream = this.videoStream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
  }


  CloseDialog(){
    this.dialog.closeAll();
  }
}
