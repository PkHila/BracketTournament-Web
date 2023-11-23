import { Component, Input } from '@angular/core';
import { Template } from 'src/app/core/interfaces';
import { TemplateShowcaseCardComponent } from '../template-showcase-card/template-showcase-card.component';

@Component({
  selector: 'app-template-showcase-list',
  templateUrl: './template-showcase-list.component.html',
  styleUrls: ['./template-showcase-list.component.scss']
})
export class TemplateShowcaseListComponent {
  @Input() templateList!: Array<Template>;
}
