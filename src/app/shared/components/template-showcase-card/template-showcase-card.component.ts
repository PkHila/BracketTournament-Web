import { Component, Input } from '@angular/core';
import { Template } from 'src/app/core/interfaces';

@Component({
  selector: 'app-template-showcase-card',
  templateUrl: './template-showcase-card.component.html',
  styleUrls: ['./template-showcase-card.component.scss']
})
export class TemplateShowcaseCardComponent {
 @Input() template!: Template;
}
