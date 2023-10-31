import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedContestantsListComponent } from './selected-contestants-list.component';

describe('SelectedContestantsListComponent', () => {
  let component: SelectedContestantsListComponent;
  let fixture: ComponentFixture<SelectedContestantsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedContestantsListComponent]
    });
    fixture = TestBed.createComponent(SelectedContestantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
