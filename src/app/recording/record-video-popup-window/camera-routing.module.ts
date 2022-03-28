import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordVideoPopupWindowComponent } from './record-video-popup-window.component';

const routes: Routes = [{ path: '', component: RecordVideoPopupWindowComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CameraRoutingModule { }
