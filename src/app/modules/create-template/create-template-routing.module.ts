import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTemplatePageComponent } from './create-template-page/create-template-page.component';

const routes: Routes = [
  {
    path: '',
    component: CreateTemplatePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateTemplateRoutingModule { }
