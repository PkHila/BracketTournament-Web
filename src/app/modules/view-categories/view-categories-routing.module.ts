import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCategoryPageComponent } from './view-category-page/view-category-page.component';
import { templateGuard } from 'src/app/core/guards/template.guard';

const routes: Routes = [
  {
    path: ":category",
    canActivate: [templateGuard],
    component: ViewCategoryPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewCategoriesRoutingModule {
}
