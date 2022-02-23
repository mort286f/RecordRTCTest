import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-video-recorder',
  templateUrl: './video-recorder.component.html',
  styleUrls: ['./video-recorder.component.css']
})
export class VideoRecorderComponent implements OnInit, OnDestroy {

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
