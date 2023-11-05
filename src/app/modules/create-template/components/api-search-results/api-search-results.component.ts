import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TestContestant } from 'src/app/core/models';

@Component({
  selector: 'app-api-search-results',
  templateUrl: './api-search-results.component.html',
  styleUrls: ['./api-search-results.component.css']
})
export class ApiSearchResultsComponent {

  @Input() contestants: Array<TestContestant> = [];
  @Output() addContestant: EventEmitter<TestContestant> = new EventEmitter();

}
