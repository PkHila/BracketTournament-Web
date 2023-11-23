import { Component, Input, OnInit } from '@angular/core';
import { Contestant, Template } from 'src/app/core/interfaces';
import { ActivatedRoute } from '@angular/router';
import { TemplateService } from 'src/app/core/services/Template.service';

@Component({
  selector: 'app-view-template-page',
  templateUrl: './view-template-page.component.html',
  styleUrls: ['./view-template-page.component.scss']
})

export class ViewTemplatePageComponent implements OnInit {
  @Input() template!: Template;
  public roundsInfo: Array<{
    round: number, contestantsCount: number
  }> = []


  constructor(
    private route: ActivatedRoute,
    private templatetService: TemplateService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: params => {
        const templateName = params.get('templateName');
        this.templatetService.getTemplateByName(templateName!).subscribe({
          next: t => {
            this.template = t;
            this.template.coverImg = this.templatetService.searchForCoverImg(this.template);
            const maxRoundCount = this.templatetService.calculateMaxRoundCount(this.template);
            for (let i = 2; i < maxRoundCount + 1; i++) {
              this.roundsInfo.push({ round: i, contestantsCount: 2 ** i });
            }
          },
          error: err => {
            console.log(err);
          }
        })
      },
      error: err => {
        console.log(err);
      }
    })
  }

  public testContestant: Contestant = {
    name: "Test Contestant",
    tournamentsPlayed: 20,
    tournamentsWon: 2,
    matchesPlayed: 15,
    matchesWon: 6
  };
}
