import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateTemplateRoutingModule } from './create-template-routing.module';
import { ContestantCardSmallComponent } from './components/contestant-card-small/contestant-card-small.component';
import { ApiSearchResultsComponent } from './components/api-search-results/api-search-results.component';
import { ContestantListItemComponent } from './components/contestant-list-item/contestant-list-item.component';
import { SelectedContestantListComponent } from './components/selected-contestant-list/selected-contestant-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateTemplatePageComponent } from './create-template-page/create-template-page.component';


@NgModule({
  declarations: [
    ContestantCardSmallComponent,
    ApiSearchResultsComponent,
    ContestantListItemComponent,
    SelectedContestantListComponent,
    CreateTemplatePageComponent
  ],
  imports: [
    CommonModule,
    CreateTemplateRoutingModule,
    HttpClientModule
  ]
})
export class CreateTemplateModule { }
