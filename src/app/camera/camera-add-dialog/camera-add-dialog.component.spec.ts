import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraAddDialogComponent } from './camera-add-dialog.component';

describe('CameraAddDialogComponent', () => {
  let component: CameraAddDialogComponent;
  let fixture: ComponentFixture<CameraAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
