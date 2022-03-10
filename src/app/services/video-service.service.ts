import { Injectable } from '@angular/core';
import { from, observable, Observable, of, Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { RecordedVideoOutput } from '../interfaces/recorded-video-output';
import * as RecordRTC from 'recordrtc';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class VideoServiceService {

  private recorder: any;
  private interval: any;
  private startTime: any;
  private _videoStream = new Subject<MediaStream>();
  private _recorded = new Subject<any>();
  private _recordedUrl = new Subject<string>();
  private _recordedTime = new Subject<string>();
  private _recordingFailed = new Subject<string>();

  constructor() { }

  // getRecordedBlob(): Observable<RecordedVideoOutput> {
  //   return this._recorded.asObservable();
  // }

  // getRecordedTime(): Observable<string> {
  //   return this._recordedTime.asObservable();
  // }

  // recordingFailed(): Observable<string> {
  //   return this._recordingFailed.asObservable();
  // }

  // getRecordedUrl(): Observable<string> {
  //   return this._recordedUrl.asObservable();
  // }

  // getStream(): Observable<MediaStream> {
  //   return this._videoStream.asObservable();
  // }

private recordVideo() {
  // this.recorder = new RecordRTC(this.stream, {
  //   type: 'video',
  //   mimeType: 'video/webm',
  //   bitsPerSecond: 128000,
  // });
  this.recorder.startRecording();
  this.startTime = moment();
  this.interval = setInterval(() => {
    const currentTime = moment();

  }, 1000);
}


  startRecording(): Observable<any> {
    if(this.recorder) {
    }
    const dataToSend = of("steven", "åse", "børge", "lis");
    console.log(navigator.mediaDevices.getUserMedia({audio: true, video: true}))
    return from(navigator.mediaDevices.getUserMedia({audio: true, video: true}));

    // return new Observable(observer => {
    //   navigator.mediaDevices.getUserMedia({video: true, audio: true})
    //   .then((stream: MediaStream) => {
    //     observer.next(stream);
    //     console.log(stream)
    //   })
    //   .catch(() => {
    //     console.log('error occured in VideoService.getUserMedia: ');
    //   })
    // })
  }

  abortRecording() {
    this.stopMedia();
  }


  stopRecording() {
    if(this.recorder) {

      this.recorder.stopRecording(this.processVideo.bind(this));
    }
  }

  private processVideo(audioVideoWebMURL: any) {
    const recordedBlob = this.recorder.getBlob();
    this.recorder.getDataURL(function (dataURL: any) { });
    const recordedName = encodeURIComponent('video_' + new Date().getTime() + '.webm');
    this._recorded.next({ blob: recordedBlob, url: audioVideoWebMURL, title: recordedName });
    this.stopMedia();
  }

  private stopMedia() {
    if (this.recorder) {
      this.recorder = null;
      clearInterval(this.interval);
      this.startTime = null;
      // if (this.stream) {
      //   this.stream.getAudioTracks().forEach((track: MediaStreamTrack) => track.stop());
      //   this.stream.getVideoTracks().forEach((track: MediaStreamTrack) => track.stop());
      //   this.stream = null;
      // }
    }
  }
}

