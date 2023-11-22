import { Component, Input } from '@angular/core';
import { Template } from 'src/app/core/interfaces';

@Component({
  selector: 'app-view-template-page',
  templateUrl: './view-template-page.component.html',
  styleUrls: ['./view-template-page.component.scss']
})

export class ViewTemplatePageComponent {
  @Input() template!: Template;
}
