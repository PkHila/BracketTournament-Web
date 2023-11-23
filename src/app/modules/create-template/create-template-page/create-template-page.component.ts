import { Component, Input, OnInit, inject } from '@angular/core';
import { OMDbApiService } from '../services/omdb-api.service';
import { ContestantService } from '../../../core/services/Contestant.service';
import { Contestant, Template } from 'src/app/core/interfaces';
import { TemplateService } from 'src/app/core/services/Template.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { RawgIoApiService } from '../services/rawg-io-api.service';
import { ApiService, QueryParams } from '../services/types/interfaces';
import { JikanAnimeApiService } from '../services/jikan-anime-api.service';
import { JikanMangaApiService } from '../services/jikan-manga-api.service';

@Component({
  selector: 'app-create-template-page',
  templateUrl: './create-template-page.component.html',
  styleUrls: ['./create-template-page.component.scss']
})
export class CreateTemplatePageComponent {

  public contestants?: Array<Contestant>;
  public selectedContestants: Array<Contestant> = [];
  @Input() category!: string;
  private apiService!: ApiService;
  private queryParams: QueryParams = {};
  public noResultsFound: boolean = false;

  constructor(
    private contestantService: ContestantService,
    private templateService: TemplateService,
    private route: ActivatedRoute) {
    this.route.paramMap.subscribe({
      next: params => {
        this.category = params.get('category')!;
        switch (this.category) {
          case 'movie':
          case 'series':
            this.apiService = inject(OMDbApiService);
            this.queryParams.category = this.category;
            break;
          case 'games':
            this.apiService = inject(RawgIoApiService);
            break;
          case 'anime':
            this.apiService = inject(JikanAnimeApiService);
            this.queryParams.category = this.category;
            break;
          case 'manga':
            this.apiService = inject(JikanMangaApiService);
            this.queryParams.category = this.category;
            break;
        }
      }
    })
  }

  public onContestantSelected(selectedContestant: Contestant): void {
    this.contestantService.addContestant(selectedContestant, this.selectedContestants);
  }

  public onRemoveContestant(selectedContestant: Contestant): void {
    this.contestantService.removeContestant(selectedContestant, this.selectedContestants);
  }

  public onSearch(searchTerm: string): void {
    this.queryParams.query = searchTerm;
    this.apiService.getContestants(this.queryParams).subscribe({
      next: (contestants) => {
        this.noResultsFound = false;
        this.contestants = contestants;
      },
      error: () => {
        this.noResultsFound = true;
        this.contestants = [];
      }
    })
  }

  public createTemplate(templateName: string) {
    const template: Template = {
      templateName: templateName,
      category: this.category,
      contestants: this.selectedContestants
    }
    this.templateService.postTemplate(template).subscribe({
      next: resp => {
        console.log('agregado con exito');
      },
      error: () => {
        console.log('error');
      }
    });
  }
}
