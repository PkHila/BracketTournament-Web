import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestantCardSmallComponent } from './contestant-card-small.component';

describe('ContestantCardSmallComponent', () => {
  let component: ContestantCardSmallComponent;
  let fixture: ComponentFixture<ContestantCardSmallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContestantCardSmallComponent]
    });
    fixture = TestBed.createComponent(ContestantCardSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
