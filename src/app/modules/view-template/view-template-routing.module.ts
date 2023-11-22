import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTemplatePageComponent } from './components/view-template-page/view-template-page.component';

const routes: Routes = [
  {path:'', component: ViewTemplatePageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewTemplateRoutingModule { }
