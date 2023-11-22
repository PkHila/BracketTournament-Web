import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseCategoryPageComponent } from './components/choose-category-page/choose-category-page.component';

const routes: Routes = [
  {
    path: '',
    component: ChooseCategoryPageComponent,
  },
  {
    path: ':category',
    title: 'Crea un nuevo torneo',
    loadChildren: () => import("../create-template/create-template.module").then(m => m.CreateTemplateModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChooseCategoryRoutingModule { }
