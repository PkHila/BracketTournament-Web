import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateService } from 'src/app/core/services/Template.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  public randomTournament!: string;

  constructor(private templateService: TemplateService, private router: Router) { }

  ngOnInit(): void {

    this.randomTournament = 'Best Star Wars movie ever!';
  }

  public onRandomTournament() {
    this.templateService.getRandomTemplateName().subscribe({
      next: templateName => {
        this.router.navigate([`view-template/${templateName}`]);
      },
      error: err => {
        console.log(err);
        this.router.navigate(['']);
      }
    })
  }
}
