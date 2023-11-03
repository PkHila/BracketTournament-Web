import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateTemplateRoutingModule } from './create-template-routing.module';
import { ContestantCardSmallComponent } from './contestant-card-small/contestant-card-small.component';
import { ApiSearchResultsComponent } from './api-search-results/api-search-results.component';
import { ContestantListItemComponent } from './contestant-list-item/contestant-list-item.component';
import { SelectedContestantListComponent } from './selected-contestant-list/selected-contestant-list.component';


@NgModule({
  declarations: [
    ContestantCardSmallComponent,
    ApiSearchResultsComponent,
    ContestantListItemComponent,
    SelectedContestantListComponent
  ],
  imports: [
    CommonModule,
    CreateTemplateRoutingModule
  ]
})
export class CreateTemplateModule { }
