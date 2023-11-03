import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedContestantListComponent } from './selected-contestant-list.component';

describe('SelectedContestantListComponent', () => {
  let component: SelectedContestantListComponent;
  let fixture: ComponentFixture<SelectedContestantListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedContestantListComponent]
    });
    fixture = TestBed.createComponent(SelectedContestantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
