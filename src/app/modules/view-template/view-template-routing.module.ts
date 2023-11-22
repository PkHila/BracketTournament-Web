import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTemplatePageComponent } from './components/view-template-page/view-template-page.component';
import { PlayTournamentComponent } from '../play-tournament/main-page-component/play-tournament.component';
import { tournamentGuard } from 'src/app/core/guards/tournament.guard';

const routes: Routes = [
  {
    path: '',
    component: ViewTemplatePageComponent,
    loadChildren: () => import("../play-tournament/play-tournament.module").then(m => m.PlayTournamentModule)
  },
  {
    path: 'play-tournament/:totalRounds',
    component: PlayTournamentComponent,
    canActivate: [tournamentGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewTemplateRoutingModule { }
