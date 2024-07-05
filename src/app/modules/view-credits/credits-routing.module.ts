import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditsPageComponent } from './view-credits-page/credits-page/credits-page.component';

const routes: Routes = [
  {
    path: "",
    component: CreditsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditsRoutingModule { }
