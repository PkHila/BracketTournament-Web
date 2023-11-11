import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contestant } from 'src/app/core/interfaces';

@Component({
  selector: 'app-selected-contestant-list',
  templateUrl: './selected-contestant-list.component.html',
  styleUrls: ['./selected-contestant-list.component.css']
})
export class SelectedContestantListComponent {

  @Input() selectedContestants!: Array<Contestant>;
  @Output() removeContestant: EventEmitter<Contestant> = new EventEmitter();

  public onRemoveContestant (selectedContestant: Contestant): void {
    this.removeContestant.emit(selectedContestant);
  }

}
