import { Component, Input, OnInit } from '@angular/core';
import { Template } from 'src/app/core/interfaces';
import { TemplateService } from 'src/app/core/services/Template.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  @Input() templates?: Array<Template>;

  constructor(private templateService: TemplateService) {}

  ngOnInit(): void {
    this.templateService.getTemplates().subscribe({
      next: t => {
        this.templates = t;
      }
    })
  }
}
