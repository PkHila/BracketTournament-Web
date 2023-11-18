import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contestant } from 'src/app/core/interfaces';

@Component({
  selector: 'app-api-search-results',
  templateUrl: './api-search-results.component.html',
  styleUrls: ['./api-search-results.component.scss']
})
export class ApiSearchResultsComponent {

  @Input() contestants?: Array<Contestant>;
  @Output() addContestant: EventEmitter<Contestant> = new EventEmitter();
  @Output() search: EventEmitter<string> = new EventEmitter();

  public onContestantSelected (selectedContestant: Contestant): void {
    this.addContestant.emit(selectedContestant);
  }

  public onSearch (searchTerm: string): void {
    this.search.emit(searchTerm);
  }
}
