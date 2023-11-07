import { Component, Input } from '@angular/core';
import { Contestant } from 'src/app/core/interfaces';

@Component({
  selector: 'app-contestant-card-small',
  templateUrl: './contestant-card-small.component.html',
  styleUrls: ['./contestant-card-small.component.css']
})
export class ContestantCardSmallComponent {
  @Input() contestant: Contestant ={
    name:"",
    img: "",
    date: "",
    author: ""
  }
}
