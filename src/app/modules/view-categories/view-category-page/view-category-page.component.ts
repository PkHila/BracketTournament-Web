import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Template } from 'src/app/core/interfaces';
import { TemplateService } from 'src/app/core/services/Template.service';

@Component({
  selector: 'app-view-category-page',
  templateUrl: './view-category-page.component.html',
  styleUrls: ['./view-category-page.component.scss']
})

export class ViewCategoryPageComponent {
  @Input() templates?: Array<Template>;
  @Input() currentCategory!: string;

  constructor(private templateService: TemplateService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: params => {
        this.currentCategory = params.get('category')!;
        this.templateService.getTemplatesByCategory(this.currentCategory).subscribe({
          next: t => {
            this.templates = t;
          },
          error: () => {
            this.templates = undefined;
          }
        })
      }
    });
  }
}
