import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordVideoPopupWindowComponent } from './record-video-popup-window.component';

describe('RecordVideoPopupWindowComponent', () => {
  let component: RecordVideoPopupWindowComponent;
  let fixture: ComponentFixture<RecordVideoPopupWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordVideoPopupWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordVideoPopupWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
