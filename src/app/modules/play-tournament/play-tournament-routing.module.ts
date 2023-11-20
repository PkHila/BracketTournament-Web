import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayTournamentComponent } from './main-page-component/play-tournament.component';

const routes: Routes = [
  {
    path: ':templateName/:totalRounds',
    component: PlayTournamentComponent
  },
  {
    path: '',
    component: PlayTournamentComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayTournamentRoutingModule { }
