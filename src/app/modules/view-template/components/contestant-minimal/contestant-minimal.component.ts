import { Component, Input } from '@angular/core';
import { Contestant } from 'src/app/core/interfaces';

@Component({
  selector: 'app-contestant-minimal',
  templateUrl: './contestant-minimal.component.html',
  styleUrls: ['./contestant-minimal.component.scss']
})
export class ContestantMinimalComponent {
  @Input() contestant!: Contestant;
}
