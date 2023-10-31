import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContestantPoolFrameComponent } from './create-contestant-pool-frame.component';

describe('CreateContestantPoolFrameComponent', () => {
  let component: CreateContestantPoolFrameComponent;
  let fixture: ComponentFixture<CreateContestantPoolFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateContestantPoolFrameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateContestantPoolFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
