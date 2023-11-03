import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiSearchResultsComponent } from './api-search-results.component';

describe('ApiSearchResultsComponent', () => {
  let component: ApiSearchResultsComponent;
  let fixture: ComponentFixture<ApiSearchResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiSearchResultsComponent]
    });
    fixture = TestBed.createComponent(ApiSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
