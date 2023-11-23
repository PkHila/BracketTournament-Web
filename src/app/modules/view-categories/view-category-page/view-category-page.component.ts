import { Component, Input } from '@angular/core';
import { Categories } from 'src/app/core/categories.enum';
import { Template } from 'src/app/core/interfaces';
import { TemplateService } from 'src/app/core/services/Template.service';

@Component({
  selector: 'app-view-category-page',
  templateUrl: './view-category-page.component.html',
  styleUrls: ['./view-category-page.component.scss']
})

export class ViewCategoryPageComponent {
  @Input() templates!: Array<Template>;
  @Input() currentCategory!: Categories;

  constructor(private templateService: TemplateService) {}

  ngOnInit(): void {
    this.templateService.getTemplatesByCategory(this.currentCategory).subscribe({
      next: t => {
        this.templates = t;
      }
    })
  }
}
