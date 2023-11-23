import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCategoryPageComponent } from './view-category-page/view-category-page.component';

const routes: Routes = [
  {path:":category", component:ViewCategoryPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewCategoriesRoutingModule { 
}
