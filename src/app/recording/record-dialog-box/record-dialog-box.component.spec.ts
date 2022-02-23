import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordDialogBoxComponent } from './record-dialog-box.component';

describe('RecordDialogBoxComponent', () => {
  let component: RecordDialogBoxComponent;
  let fixture: ComponentFixture<RecordDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
