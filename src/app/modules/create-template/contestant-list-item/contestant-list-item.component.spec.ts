import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestantListItemComponent } from './contestant-list-item.component';

describe('ContestantListItemComponent', () => {
  let component: ContestantListItemComponent;
  let fixture: ComponentFixture<ContestantListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContestantListItemComponent]
    });
    fixture = TestBed.createComponent(ContestantListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
