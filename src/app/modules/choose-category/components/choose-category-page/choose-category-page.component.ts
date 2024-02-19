import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './choose-category-page.component.html',
  styleUrls: ['./choose-category-page.component.scss']
})
export class ChooseCategoryPageComponent {

  constructor(private router: Router) {}

  public gotoMovies() {
    this.router.navigate(['/create-template/movie']);
  }

  public gotoSeries() {
    this.router.navigate(['/create-template/series']);
  }

  public gotoGames() {
    this.router.navigate(['create-template/games']);
  }

  public gotoAnime() {
    this.router.navigate(['create-template/anime']);
  }

  public gotoManga() {
    this.router.navigate(['create-template/manga']);
  }

  public gotoAlbums() {
    this.router.navigate(['create-template/albums']);
  }
}
