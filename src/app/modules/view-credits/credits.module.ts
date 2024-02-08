import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditsRoutingModule } from './credits-routing.module';
import { CreditsPageComponent } from './view-credits-page/credits-page/credits-page.component';


@NgModule({
  declarations: [
    CreditsPageComponent
  ],
  imports: [
    CommonModule,
    CreditsRoutingModule
  ]
})
export class CreditsModule { }
