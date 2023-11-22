import { Component, Input, OnInit } from '@angular/core';
import { OMDbApiService } from '../services/omdb-api.service';
import { ContestantService } from '../services/contestant.service';
import { Contestant, Template } from 'src/app/core/interfaces';
import { TemplateService } from 'src/app/core/services/Template.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-create-template-page',
  templateUrl: './create-template-page.component.html',
  styleUrls: ['./create-template-page.component.scss']
})
export class CreateTemplatePageComponent implements OnInit {

  public contestants?: Array<Contestant>;

  public selectedContestants: Array<Contestant> = [];
  @Input() category!: string;

  constructor(
    private omdbApiService: OMDbApiService,
    private contestantService: ContestantService,
    private templateService: TemplateService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: params => {
        this.category = params.get('category')!;
        console.log(this.category);
        
      }
    })
    /* if (this.category === undefined) {
      this.category = 'movie';
    } */
  }

  public onContestantSelected(selectedContestant: Contestant): void {
    this.contestantService.addContestant(selectedContestant, this.selectedContestants);
  }

  public onRemoveContestant(selectedContestant: Contestant): void {
    this.contestantService.removeContestant(selectedContestant, this.selectedContestants);
  }

  public onSearch(searchTerm: string): void {
    this.omdbApiService.getContestants(searchTerm, this.category).subscribe({
      next: (contestants) => {
        // lower said flag
        this.contestants = contestants;
      },
      error: () => {
        // raise some flag
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
