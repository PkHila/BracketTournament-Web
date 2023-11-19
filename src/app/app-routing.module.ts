import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'create-template',
    loadChildren: () => import("./modules/create-template/create-template.module").then(m => m.CreateTemplateModule)
  },
  {
    path: 'play-tournament',
    loadChildren: () => import("./modules/play-tournament/play-tournament.module").then(m => m.PlayTournamentModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
