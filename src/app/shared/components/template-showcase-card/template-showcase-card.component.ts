import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categories } from 'src/app/core/categories.enum';
import { Template } from 'src/app/core/interfaces';
import { TemplateService } from 'src/app/core/services/Template.service';

@Component({
  selector: 'app-template-showcase-card',
  templateUrl: './template-showcase-card.component.html',
  styleUrls: ['./template-showcase-card.component.scss']
})
export class TemplateShowcaseCardComponent implements OnInit {
  @Input() template!: Template;

  constructor(private router: Router, private templateService: TemplateService) { }

  ngOnInit(): void {
    this.template.coverImg = this.templateService.searchForCoverImg(this.template);
    const translatedCategory = this.templateService.mapCategoryToLocale(this.template.category as Categories);
    if (translatedCategory) {
      this.template.category = translatedCategory as string;
    }
  }

  public navigateToTemplateView() {
    this.router.navigate([`view-template/${this.template.templateName}`]);
  }
}
