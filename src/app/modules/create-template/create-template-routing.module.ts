import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTemplatePageComponent } from './create-template-page/create-template-page.component';
import { templateGuard } from 'src/app/core/guards/template.guard';
import { canDeactivateGuard } from './guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: CreateTemplatePageComponent,
    canDeactivate: [canDeactivateGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateTemplateRoutingModule { }
