import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { observable, Observable, Subject } from 'rxjs';
import { RecordedVideoOutput } from '../interfaces/recorded-video-output';
import * as RecordRTC from 'recordrtc';
import { Url } from 'url';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class VideoServiceService {

  private videoStream = new MediaStream;
  private recorder: any;
  private _videoStream = new Subject<MediaStream>();
  private _recorded = new Subject<RecordedVideoOutput>();
  private _recordedUrl = new Subject<string>();

  constructor() { }

  getRecordedBlob(): Observable<RecordedVideoOutput> {
    return this._recorded.asObservable();
  }

  getRecordedUrl(): Observable<string> {
    return this._recordedUrl.asObservable();
  }

  getStream(): Observable<MediaStream> {
    return this._videoStream.asObservable();
  }

private recordVideo() {
  this.recorder = new RecordRTC(this.videoStream, {
    type: 'video',
    mimeType: 'video/webm',
    bitsPerSecond: 128000,
  });
  this.recorder.startRecording();
}

  startRecording() {
    return new Observable(observer => {
      navigator.mediaDevices
      .getUserMedia({audio: true, video: true})
      .then((_videoStream) => {
        this.recordVideo();
        observer.next(_videoStream);
      })
      .catch((error) => {
        console.log(observer.error(error));
      })
    })
  }

  processVideo(audioVideoWebMURL: any) {
    console.log(audioVideoWebMURL);
    const recordedBlob = this.recorder.getBlob();
    this.recorder.getDataURL(function (dataURL: any) {});
    const recordedName = encodeURIComponent('video_' + new Date().getTime() + '.webm');
    this._recorded.next({blob: recordedBlob, url: audioVideoWebMURL, title: recordedName});
    this.stopMedia();
  }

  stopRecording() {
    if(this.recorder) {

      this.recorder.stopRecording(this.processVideo.bind(this))
    }
  }

  private stopMedia() {
    if (this.recorder) {
      this.recorder = null;
      if (this.videoStream) {
        this.videoStream.getAudioTracks().forEach(track => track.stop());
        this.videoStream.getVideoTracks().forEach(track => track.stop());
        // this.videoStream.stop();
        // this.videoStream = null;
      }
    }
  }

}
