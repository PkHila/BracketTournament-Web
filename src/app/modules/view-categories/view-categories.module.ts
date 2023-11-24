import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewCategoriesRoutingModule } from './view-categories-routing.module';
import { ViewCategoryPageComponent } from './view-category-page/view-category-page.component';


@NgModule({
  declarations: [
    ViewCategoryPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ViewCategoriesRoutingModule,
  ]
})
export class ViewCategoriesModule {

 }
