import { Component, Input } from '@angular/core';
import { Contestant } from 'src/app/core/interfaces';


@Component({
  selector: 'app-contestant-list-item',
  templateUrl: './contestant-list-item.component.html',
  styleUrls: ['./contestant-list-item.component.css']
})
export class ContestantListItemComponent {
  @Input() contestant: Contestant ={
    name:"",
    img: "",
    date: "",
    author: ""
  }
}
