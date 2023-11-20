import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { Contestant, Template } from 'src/app/core/interfaces';

@Component({
  selector: 'app-winner-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './winner-card.component.html',
  styleUrls: ['./winner-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WinnerCardComponent {
  @Input() contestant!: Contestant;
  @Input() template!: Template;
 }
