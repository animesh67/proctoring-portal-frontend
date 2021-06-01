import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingTestComponent } from './recording-test.component';

describe('RecordingTestComponent', () => {
  let component: RecordingTestComponent;
  let fixture: ComponentFixture<RecordingTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordingTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordingTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
