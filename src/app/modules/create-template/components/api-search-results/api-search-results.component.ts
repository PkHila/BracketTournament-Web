import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contestant } from 'src/app/core/interfaces';

@Component({
  selector: 'app-api-search-results',
  templateUrl: './api-search-results.component.html',
  styleUrls: ['./api-search-results.component.scss']
})
export class ApiSearchResultsComponent implements OnInit {

  @Input() contestants?: Array<Contestant>;
  @Input() noResultsFound?: boolean;
  @Output() addContestant: EventEmitter<Contestant> = new EventEmitter();
  @Output() search: EventEmitter<string> = new EventEmitter();
  public searchbarPlaceholderText!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const category = params['category'];
      switch (category) {
        case 'movie':
          this.searchbarPlaceholderText = 'Pruebe buscar "Star Wars"...';
          break;
        case 'series':
          this.searchbarPlaceholderText = 'Pruebe buscar "Friends"...';
          break;
        case 'games':
          this.searchbarPlaceholderText = 'Pruebe buscar "Halo"...';
          break;
        case 'anime':
          this.searchbarPlaceholderText = 'Pruebe buscar "Attack on Titan"...';
          break;
        case 'manga':
          this.searchbarPlaceholderText = 'Pruebe buscar "Naruto"...';
          break;
        case 'albums':
          this.searchbarPlaceholderText = 'Pruebe buscar "The Beatles"...';
      }
    })
  }

  public onContestantSelected(selectedContestant: Contestant): void {
    this.addContestant.emit(selectedContestant);
  }

  public onSearch(searchTerm: string): void {
    this.search.emit(searchTerm);
  }
}
