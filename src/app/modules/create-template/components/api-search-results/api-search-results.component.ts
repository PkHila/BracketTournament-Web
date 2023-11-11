import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contestant } from 'src/app/core/interfaces';

@Component({
  selector: 'app-api-search-results',
  templateUrl: './api-search-results.component.html',
  styleUrls: ['./api-search-results.component.css']
})
export class ApiSearchResultsComponent {

  @Input() contestants!: Array<Contestant>;
  @Output() addContestant: EventEmitter<Contestant> = new EventEmitter();

  public onContestantSelected (selectedContestant: Contestant): void {
    this.addContestant.emit(selectedContestant);
  }
}
