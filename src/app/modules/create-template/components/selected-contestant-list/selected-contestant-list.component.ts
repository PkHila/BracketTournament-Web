import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TestContestant } from 'src/app/core/models';

@Component({
  selector: 'app-selected-contestant-list',
  templateUrl: './selected-contestant-list.component.html',
  styleUrls: ['./selected-contestant-list.component.css']
})
export class SelectedContestantListComponent {

  @Input() selectedContestants: Array<TestContestant> = [];
  @Output() removeContestant: EventEmitter<TestContestant> = new EventEmitter();

}
