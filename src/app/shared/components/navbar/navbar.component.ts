import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categories } from 'src/app/core/categories.enum';
import { TemplateService } from 'src/app/core/services/Template.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  public categories: Array<{ category: string, translatedCategory: string }> = [];


  constructor(private templateService: TemplateService, private router: Router) { }

  ngOnInit(): void {

    Object.values(Categories).forEach(category => {
      this.categories.push(
        {
          category: category as string,
          translatedCategory: this.templateService.mapCategoryToLocale(category)! as string
        })
    })

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
