import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { Observable, Subject } from 'rxjs';
import { RecordedVideoOutput } from '../interfaces/recorded-video-output';
import * as RecordRTC from 'recordrtc';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class VideoServiceService {

  constructor() { }

  private stream: any;
  private recorder: any;
  private interval: any;
  private _stream = new Subject<MediaStream>();
  private _recorded = new Subject<RecordedVideoOutput>();
  private _recordedUrl = new Subject<string>();
  private _recordingFailed = new Subject<string>();

  StartRecording(conf: any): Promise<any>{

    var browser = <any>navigator;
    if (this.recorder){
      //Means recorder is already started or is already recording something. return nothing then
      //TODO: Implement way to return when recorder is already running
    }
    return new Promise((resolve, reject) => {
      browser.mediaDevices.getUserMedia(conf)
      .then((stream: any) => {
        this.stream = stream;
        this.record();
        resolve(this.stream);
      }).catch((error: string) => {
        error = 'error occured in starting the recording: '
        reject;
      })
    })
  }

  record() {
    this.recorder = new RecordRTC(this.stream, {
      type: 'video',
      mimeType: 'video/webm',
      bitsPerSecond: 44000
    });
    this.recorder.startRecording();
    this._stream.next(this.stream);
  }
}
