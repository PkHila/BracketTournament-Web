import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contestant } from 'src/app/core/interfaces';

@Component({
  selector: 'app-contestant-list-item',
  templateUrl: './contestant-list-item.component.html',
  styleUrls: ['./contestant-list-item.component.scss']
})
export class ContestantListItemComponent {
  @Input() contestant!: Contestant;
  @Output() selectContestant = new EventEmitter<Contestant>();

  public onImageClick(): void {
    this.selectContestant.emit(this.contestant);
  }
}
