import { Component, OnInit } from '@angular/core';
import * as RecordRTC from 'recordrtc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RecordRTCTest';
  record: any;

  constructor() {}


};
