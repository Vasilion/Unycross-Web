import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackFinderComponent } from './track-finder.component';

describe('TrackFinderComponent', () => {
  let component: TrackFinderComponent;
  let fixture: ComponentFixture<TrackFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackFinderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
