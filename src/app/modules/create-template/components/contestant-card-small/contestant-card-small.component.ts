import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contestant } from 'src/app/core/interfaces';

@Component({
  selector: 'app-contestant-card-small',
  templateUrl: './contestant-card-small.component.html',
  styleUrls: ['./contestant-card-small.component.scss']
})
export class ContestantCardSmallComponent {
  @Input() contestant!: Contestant;
  @Output() selectContestant = new EventEmitter<Contestant>();

  public onImageClick(): void {
    this.selectContestant.emit(this.contestant);
  }
}
