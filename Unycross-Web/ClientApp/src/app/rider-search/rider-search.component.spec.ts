import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderSearchComponent } from './rider-search.component';

describe('RiderSearchComponent', () => {
  let component: RiderSearchComponent;
  let fixture: ComponentFixture<RiderSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiderSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
