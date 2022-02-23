import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RecordingComponent} from './recording/recording.component';
import { RecordVideoPopupWindowComponent } from './recording/record-video-popup-window/record-video-popup-window.component';

import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule} from '@angular/material/tooltip';
import { AppRoutingModule } from './app-routing.module';
import * as RecordRTC from 'recordrtc';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card';
import { MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { RecordDialogBoxComponent } from './recording/record-dialog-box/record-dialog-box.component';
import { VideoRecorderComponent } from './recording/video-recorder/video-recorder.component';
import { VideoServiceService } from './services/video-service.service';

@NgModule({
  declarations: [
    AppComponent,
    RecordingComponent,
    RecordVideoPopupWindowComponent,
    RecordDialogBoxComponent,
    VideoRecorderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [
    VideoServiceService,
    MediaStream
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
