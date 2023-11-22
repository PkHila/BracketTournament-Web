import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewTemplateRoutingModule } from './view-template-routing.module';
import { ViewTemplatePageComponent } from './components/view-template-page/view-template-page.component';
import { ContestantStatComponent } from './components/contestant-stat/contestant-stat.component';
import { ContestantMinimalComponent } from './components/contestant-minimal/contestant-minimal.component';


@NgModule({
  declarations: [
    ViewTemplatePageComponent,
    ContestantStatComponent,
    ContestantMinimalComponent
  ],
  imports: [
    CommonModule,
    ViewTemplateRoutingModule
  ]
})
export class ViewTemplateModule { }
