import { Component, OnInit } from '@angular/core';
import { TestContestant } from 'src/app/core/models';
import { OMDbApiService } from '../services/omdb-api.service';

@Component({
  selector: 'app-create-template-page',
  templateUrl: './create-template-page.component.html',
  styleUrls: ['./create-template-page.component.css']
})
export class CreateTemplatePageComponent implements OnInit {

  public contestants: Array<TestContestant> = [];

  constructor(private omdbApiService: OMDbApiService) { }

  ngOnInit(): void {
    this.omdbApiService.getSeries('Star Wars')
      .then((contestants) => { this.contestants = contestants })
      console.log(this.contestants);
      
  }

}
