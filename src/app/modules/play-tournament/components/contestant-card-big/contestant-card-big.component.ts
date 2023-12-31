import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Contestant } from 'src/app/core/interfaces';

@Component({
  selector: 'app-contestant-card-big',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './contestant-card-big.component.html',
  styleUrls: ['./contestant-card-big.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContestantCardBigComponent {

  @Input() contestant!: Contestant;
  @Output() voteContestant = new EventEmitter<Contestant>();

  public onVoteContestant(): void {
    this.voteContestant.emit(this.contestant);
  }
 }
