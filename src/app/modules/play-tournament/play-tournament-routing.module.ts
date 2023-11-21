import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayTournamentComponent } from './main-page-component/play-tournament.component';
import { tournamentGuard } from 'src/app/core/guards/tournament.guard';

const routes: Routes = [
  {
    path: ':templateName/:totalRounds',
    component: PlayTournamentComponent,
    canActivate: [tournamentGuard]
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
