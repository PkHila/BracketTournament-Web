import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChooseCategoryRoutingModule } from './choose-category-routing.module';
import { ChooseCategoryPageComponent } from './components/choose-category-page/choose-category-page.component';


@NgModule({
  declarations: [
    ChooseCategoryPageComponent
  ],
  imports: [
    CommonModule,
    ChooseCategoryRoutingModule
  ]
})
export class ChooseCategoryModule { }
