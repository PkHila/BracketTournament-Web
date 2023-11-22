import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseCategoryPageComponent } from './components/choose-category-page/choose-category-page.component';

const routes: Routes = [
  {
    path: '',
    component: ChooseCategoryPageComponent,
    loadChildren: () => import("../create-template/create-template.module").then(m => m.CreateTemplateModule)
  },
  {
    path: ':category',
    title: 'Crea un nuevo torneo'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChooseCategoryRoutingModule { }
