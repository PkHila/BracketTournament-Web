import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayTournamentRoutingModule } from './play-tournament-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PlayTournamentRoutingModule,
    SharedModule
  ]
})
export class PlayTournamentModule { }
