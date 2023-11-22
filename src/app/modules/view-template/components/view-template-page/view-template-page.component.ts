import { Component, Input } from '@angular/core';
import { Contestant, Template } from 'src/app/core/interfaces';
import { ContestantMinimalComponent } from '../contestant-minimal/contestant-minimal.component';

@Component({
  selector: 'app-view-template-page',
  templateUrl: './view-template-page.component.html',
  styleUrls: ['./view-template-page.component.scss']
})

export class ViewTemplatePageComponent {
  @Input() template!: Template;

  public testContestant: Contestant = {
    name: "Test Contestant",
    tournamentsPlayed:20,
    tournamentsWon:2,
    matchesPlayed:15,
    matchesWon:6
  };
}
