import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTemplatePageComponent } from './components/view-template-page/view-template-page.component';
import { PlayTournamentComponent } from '../play-tournament/main-page-component/play-tournament.component';
import { tournamentGuard } from 'src/app/core/guards/tournament.guard';

const routes: Routes = [
  {
    path: ':templateName',
    component: ViewTemplatePageComponent,
    canActivate: [tournamentGuard],
    loadChildren: () => import("../play-tournament/play-tournament.module").then(m => m.PlayTournamentModule)
  },
  {
    path: ':templateName/play-tournament/:totalRounds',
    component: PlayTournamentComponent,
    canActivate: [tournamentGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewTemplateRoutingModule { }
