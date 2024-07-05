import { Component, Input, OnInit } from '@angular/core';
import { Contestant, Template } from 'src/app/core/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateService } from 'src/app/core/services/Template.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Categories } from 'src/app/core/categories.enum';

@Component({
  selector: 'app-view-template-page',
  templateUrl: './view-template-page.component.html',
  styleUrls: ['./view-template-page.component.scss']
})

export class ViewTemplatePageComponent implements OnInit {
  @Input() template!: Template;
  public roundsInfo: Array<{
    round: number, contestantsCount: number, freePasses?: number
  }> = [];
  public form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private templatetService: TemplateService,
    private router: Router,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      showStatistics: [false],
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: params => {
        const templateName = params.get('templateName');
        this.templatetService.getTemplateByName(templateName!).subscribe({
          next: t => {
            this.roundsInfo = [];
            this.template = t;
            const translatedCategory = this.templatetService.mapCategoryToLocale(this.template.category as Categories);
            if (translatedCategory) {
              this.template.category = translatedCategory;
            }
            this.template.coverImg = this.templatetService.searchForCoverImg(this.template);
            const maxRoundCount = this.templatetService.calculateMaxRoundCount(this.template.contestants!.length);
            for (let i = 2; i < maxRoundCount + 1; i++) {
              this.roundsInfo.push({ round: i, contestantsCount: 2 ** i });
            }
            if (this.template.contestants!.length < 2 ** maxRoundCount) {
              this.roundsInfo.at(-1)!.freePasses = 2 ** maxRoundCount - this.template.contestants!.length;
            }
          },
          error: () => {
            this.router.navigate([`404`]);
          }
        })
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
