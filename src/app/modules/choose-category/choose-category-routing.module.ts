import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseCategoryPageComponent } from './components/choose-category-page/choose-category-page.component';

const routes: Routes = [
  { path:'', component:ChooseCategoryPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChooseCategoryRoutingModule { }
