import { Component, Input } from '@angular/core';
import { Contestant } from 'src/app/core/interfaces';

@Component({
  selector: 'app-contestant-stat',
  templateUrl: './contestant-stat.component.html',
  styleUrls: ['./contestant-stat.component.scss']
})
export class ContestantStatComponent {
  @Input() contestant!: Contestant;
}
