import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Template } from 'src/app/core/interfaces';

@Component({
  selector: 'app-template-showcase-card',
  templateUrl: './template-showcase-card.component.html',
  styleUrls: ['./template-showcase-card.component.scss']
})
export class TemplateShowcaseCardComponent {
  @Input() template!: Template;

  constructor(private router: Router) {}

  public navigateToTemplateView() {
    this.router.navigate([`/${this.template.templateName}`]);
  }
}
