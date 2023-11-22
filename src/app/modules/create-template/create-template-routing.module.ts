import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTemplatePageComponent } from './create-template-page/create-template-page.component';
import { templateGuard } from 'src/app/core/guards/template.guard';

const routes: Routes = [
  {
    path: '',
    component: CreateTemplatePageComponent,
    canActivate: [templateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateTemplateRoutingModule { }
