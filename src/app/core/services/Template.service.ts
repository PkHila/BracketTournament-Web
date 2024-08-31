import { Injectable } from '@angular/core';
import { Contestant, Template } from '../interfaces';
import { Observable, of, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Categories, LocaleCategories } from '../categories.enum';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private baseUrl: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  public getTemplates(): Observable<Template[]> {
    
    return of(this.templates);
    /* return this.http.get<Template[]>(`${this.baseUrl}/templates`); */
  }

  public getPopularTemplates(): Observable<Template[]> {

    const popularTemplates = this.templates.slice().sort((a, b) => b.timesPlayed! - a.timesPlayed!).slice(0, 6);
    if (popularTemplates.length == 0) {
      return throwError(() => new Error('No templates created yet'));
    }
    return of(JSON.parse(JSON.stringify(popularTemplates)));
    /* return this.http.get<Template[]>(`${this.baseUrl}/templates`).pipe(
      map(templates => {
        templates.sort((a, b) => b.timesPlayed! - a.timesPlayed!);
        return templates.slice(0, 6);
      })
    ); */
  }

  public getTemplatesByCategory(category: string): Observable<Template[]> {

    const templatesByCategory = this.templates.filter(template => template['category'] === category);
    if (templatesByCategory.length == 0) {
      return throwError(() => new Error('No templates created in that category'));
    }
    return of(JSON.parse(JSON.stringify(templatesByCategory)));
    /* return this.http.get<Template[]>(`${this.baseUrl}/templates?category=${category}`).pipe(
      map(response => {
        if (response.length === 0) {
          throw new Error('No templates created in that category')
        }
        else {
          return response;
        }
      })
    ); */
  }

  public getTemplateByName(templateName: string): Observable<Template> {
    const templateByName = this.templates.find(template => template['templateName'] === templateName);

    if (templateByName) {
      return of(JSON.parse(JSON.stringify(templateByName)));
    }
    return throwError(() => new Error('No template with such name'));
    
    /* return this.http.get<Template[]>(`${this.baseUrl}/templates?templateName=${templateName}`).pipe(
      map(response => {
        if (response.length === 1) {
          return response[0];
        }
        else {
          throw new Error('No template with such name');
        }
      })
    ); */
  }

  public postTemplate(template: Template): Observable<Template> {
    return this.http.post<Template>(`${this.baseUrl}/templates`, template);
  }

  public putTemplate(template: Template, templateId: number): Observable<Template> {
    return this.http.put<Template>(`${this.baseUrl}/templates/${templateId}`, template)
  }

  public calculateMaxRoundCount(contestantCount: number): number {
    let maxRoundCount = 2;
    while (contestantCount > 2 ** maxRoundCount) {
      maxRoundCount++;
    }
    if (contestantCount < 2 ** maxRoundCount) { // disables free pass feature
      maxRoundCount--;
    }
    return maxRoundCount;
  }

  public calculateMaxContestants(contestantCount: number): number {
    return 2 ** this.calculateMaxRoundCount(contestantCount);
  }

  public calculateFreebies(contestantCount: number): number {
    return contestantCount - this.calculateMaxContestants(contestantCount);
  }

  public isPowerOfTwo(contestantCount: number): boolean {
    return this.calculateFreebies(contestantCount) === 0;
  }

  public searchForCoverImg(template: Template): string {
    let mostWins = 0;
    let contestantWithMostTournamentsWon: Contestant;
    template.contestants!.forEach(contestant => {
      if (contestant.tournamentsWon && mostWins < contestant.tournamentsWon) {
        mostWins = contestant.tournamentsWon;
        contestantWithMostTournamentsWon = contestant;
      }
    })
    if (mostWins === 0) {
      return template.contestants!.at(0)!.img!;
    }
    return contestantWithMostTournamentsWon!.img!;
  }

  public getRandomTemplateName(): Observable<string> {
    return this.getTemplates().pipe(
      map(templates => {
        const randomIndex = Math.floor(Math.random() * templates.length);
        return templates.at(randomIndex)!.templateName;
      })
    )
  }

  public mapCategoryToLocale(category: Categories): LocaleCategories | undefined {
    switch (category) {
      case Categories.movie:
        return LocaleCategories.movie;
      case Categories.series:
        return LocaleCategories.series;
      case Categories.games:
        return LocaleCategories.games;
      case Categories.anime:
        return LocaleCategories.anime;
      case Categories.manga:
        return LocaleCategories.manga;
      case Categories.albums:
        return LocaleCategories.albums;
      default:
        return undefined;
    }
  }

  private templates = [
    {
      "templateName": "Best Star Wars movie ever!",
      "category": "movie",
      "contestants": [
        {
          "name": "Star Wars: Episode III - Revenge of the Sith",
          "img": "https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SX300.jpg",
          "date": "2005",
          "author": "",
          "id": 6,
          "tournamentsPlayed": 8,
          "matchesPlayed": 14,
          "matchesWon": 8,
          "tournamentsWon": 2
        },
        {
          "name": "Star Wars: Episode VIII - The Last Jedi",
          "img": "https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg",
          "date": "2017",
          "author": "",
          "id": 9,
          "tournamentsPlayed": 7,
          "matchesPlayed": 10,
          "matchesWon": 3
        },
        {
          "name": "Solo: A Star Wars Story",
          "img": "https://m.media-amazon.com/images/M/MV5BOTM2NTI3NTc3Nl5BMl5BanBnXkFtZTgwNzM1OTQyNTM@._V1_SX300.jpg",
          "date": "2018",
          "author": "",
          "id": 11,
          "tournamentsPlayed": 7,
          "matchesPlayed": 17,
          "matchesWon": 13,
          "tournamentsWon": 3
        },
        {
          "name": "Star Wars: Episode VI - Return of the Jedi",
          "img": "https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
          "date": "1983",
          "author": "",
          "id": 3,
          "tournamentsPlayed": 9,
          "matchesPlayed": 17,
          "matchesWon": 8
        },
        {
          "name": "Star Wars: Episode I - The Phantom Menace",
          "img": "https://m.media-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
          "date": "1999",
          "author": "",
          "id": 5,
          "tournamentsPlayed": 6,
          "matchesPlayed": 10,
          "matchesWon": 5,
          "tournamentsWon": 1
        },
        {
          "name": "Star Wars: Episode IX - The Rise of Skywalker",
          "img": "https://m.media-amazon.com/images/M/MV5BMDljNTQ5ODItZmQwMy00M2ExLTljOTQtZTVjNGE2NTg0NGIxXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_SX300.jpg",
          "date": "2019",
          "author": "",
          "id": 10,
          "tournamentsPlayed": 6,
          "matchesPlayed": 9,
          "matchesWon": 3
        },
        {
          "name": "Star Wars: Episode VII - The Force Awakens",
          "img": "https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg",
          "date": "2015",
          "author": "",
          "id": 4,
          "tournamentsPlayed": 4,
          "matchesPlayed": 6,
          "matchesWon": 2
        },
        {
          "name": "Star Wars: Episode V - The Empire Strikes Back",
          "img": "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
          "date": "1980",
          "author": "",
          "id": 2,
          "tournamentsPlayed": 8,
          "matchesPlayed": 15,
          "matchesWon": 8,
          "tournamentsWon": 1
        },
        {
          "name": "Star Wars: Episode IV - A New Hope",
          "img": "https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg",
          "date": "1977",
          "author": "",
          "id": 1,
          "tournamentsPlayed": 8,
          "matchesPlayed": 13,
          "matchesWon": 6,
          "tournamentsWon": 1
        },
        {
          "name": "Rogue One: A Star Wars Story",
          "img": "https://m.media-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg",
          "date": "2016",
          "author": "",
          "id": 8,
          "tournamentsPlayed": 3,
          "matchesPlayed": 12,
          "matchesWon": 12,
          "tournamentsWon": 3
        },
        {
          "name": "Star Wars: Episode II - Attack of the Clones",
          "img": "https://m.media-amazon.com/images/M/MV5BMDAzM2M0Y2UtZjRmZi00MzVlLTg4MjEtOTE3NzU5ZDVlMTU5XkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg",
          "date": "2002",
          "author": "",
          "id": 7,
          "tournamentsPlayed": 7,
          "matchesPlayed": 14,
          "matchesWon": 8,
          "tournamentsWon": 1
        }
      ],
      "id": 1,
      "timesPlayed": 12
    },
    {
      "templateName": "Completely Unbiased RTS Game List",
      "category": "games",
      "contestants": [
        {
          "name": "StarCraft II",
          "img": "https://media.rawg.io/media/games/960/9605c08bf8535c00adbb0a3896f0c484.jpg",
          "author": "",
          "date": "2010-07-27",
          "id": 5,
          "tournamentsPlayed": 2,
          "matchesPlayed": 5,
          "matchesWon": 3
        },
        {
          "name": "Command & Conquer: Tiberian Sun",
          "img": "https://media.rawg.io/media/games/9ab/9ab65947298e8e73a158c9d1961524f9.jpg",
          "author": "",
          "date": "1999-08-27",
          "id": 13,
          "tournamentsPlayed": 2,
          "matchesPlayed": 2
        },
        {
          "name": "Command & Conquer: Generals",
          "img": "https://media.rawg.io/media/games/b8f/b8fc70ec8d35ae13f9609e1b118aa33c.jpg",
          "author": "",
          "date": "2003-02-11",
          "id": 14,
          "tournamentsPlayed": 2,
          "matchesPlayed": 2
        },
        {
          "name": "Sins of a Solar Empire: Rebellion",
          "img": "https://media.rawg.io/media/screenshots/65c/65c9c15e274705b5fe343e424ce76ec8.jpg",
          "author": "",
          "date": "2012-06-12",
          "id": 6,
          "tournamentsPlayed": 2,
          "matchesPlayed": 3,
          "matchesWon": 1
        },
        {
          "name": "Age of Empires III: Definitive Edition",
          "img": "https://media.rawg.io/media/games/f68/f68f04eeeadaa87cf0d2534306f96850.jpg",
          "author": "",
          "date": "2020-10-15",
          "id": 3,
          "tournamentsPlayed": 2,
          "matchesPlayed": 2
        },
        {
          "name": "Warhammer 40,000: Dawn of War",
          "img": "https://media.rawg.io/media/games/16f/16f2f287ad8bbbd654cf76be4da52c04.jpg",
          "author": "",
          "date": "2004-09-20",
          "id": 9,
          "tournamentsPlayed": 2,
          "matchesPlayed": 7,
          "matchesWon": 5
        },
        {
          "name": "Age of Empires: Definitive Edition",
          "img": "https://media.rawg.io/media/screenshots/ee2/ee26304beaa6cda35c53604868164cca.jpg",
          "author": "",
          "date": "2018-02-20",
          "id": 1,
          "tournamentsPlayed": 2,
          "matchesPlayed": 5,
          "matchesWon": 3
        },
        {
          "name": "Warhammer 40,000: Dawn of War III",
          "img": "https://media.rawg.io/media/games/a73/a73e4a34957fe58b505bfef725492778.jpg",
          "author": "",
          "date": "2017-04-27",
          "id": 11,
          "tournamentsPlayed": 2,
          "matchesPlayed": 2
        },
        {
          "name": "Warhammer 40,000: Dawn of War II",
          "img": "https://media.rawg.io/media/screenshots/4d9/4d9afae02fdf2896569b1c7bfeabb8c1.jpg",
          "author": "",
          "date": "2009-02-18",
          "id": 10,
          "tournamentsPlayed": 2,
          "matchesPlayed": 2
        },
        {
          "name": "Age of Empires II: Definitive Edition",
          "img": "https://media.rawg.io/media/games/945/9455733af10406794b0c1b8d117bca76.jpg",
          "author": "",
          "date": "2019-11-14",
          "id": 2,
          "tournamentsPlayed": 2,
          "matchesPlayed": 6,
          "matchesWon": 5,
          "tournamentsWon": 1
        },
        {
          "name": "Command & Conquer: Red Alert",
          "img": "https://media.rawg.io/media/games/e87/e87bbd9feb37b226b1b6a4f11e9492a0.jpg",
          "author": "",
          "date": "1996-10-31",
          "id": 15,
          "tournamentsPlayed": 2,
          "matchesPlayed": 6,
          "matchesWon": 5,
          "tournamentsWon": 1
        },
        {
          "name": "StarCraft",
          "img": "https://media.rawg.io/media/games/68a/68a77a21ec04083f3e6af62cdbed9c0a.jpg",
          "author": "",
          "date": "1998-03-31",
          "id": 4,
          "tournamentsPlayed": 2,
          "matchesPlayed": 2
        },
        {
          "name": "Homeworld: Deserts of Kharak",
          "img": "https://media.rawg.io/media/games/4e1/4e12434f082fc8f2b965a4c950b8836e.jpg",
          "author": "",
          "date": "2016-01-19",
          "id": 8,
          "tournamentsPlayed": 2,
          "matchesPlayed": 3,
          "matchesWon": 1
        },
        {
          "name": "Command & Conquer",
          "img": "https://media.rawg.io/media/games/c62/c62e21b805e3f4c13e99702d2eca6a65.jpg",
          "author": "",
          "date": "1995-08-31",
          "id": 12,
          "tournamentsPlayed": 2,
          "matchesPlayed": 3,
          "matchesWon": 1
        },
        {
          "name": "Command & Conquer: Red Alert 2",
          "img": "https://media.rawg.io/media/games/673/67304bfba37b6a18c50a60ab6ba6cebd.jpg",
          "author": "",
          "date": "2000-10-26",
          "id": 16,
          "tournamentsPlayed": 2,
          "matchesPlayed": 5,
          "matchesWon": 3
        },
        {
          "name": "Homeworld Remastered Collection",
          "img": "https://media.rawg.io/media/screenshots/8fa/8fa13bde20f4a6737145462ec3d0565e.jpg",
          "author": "",
          "date": "2015-02-24",
          "id": 7,
          "tournamentsPlayed": 2,
          "matchesPlayed": 5,
          "matchesWon": 3
        }
      ],
      "id": 2,
      "timesPlayed": 2
    },
    {
      "templateName": "Mejor juego de la saga de mario",
      "category": "games",
      "contestants": [
        {
          "name": "Super Mario Bros.",
          "img": "https://media.rawg.io/media/games/154/154fea9689109f26c49c6a2db6263ef9.jpg",
          "author": "",
          "date": "1985-09-13",
          "id": 7,
          "tournamentsPlayed": 9,
          "matchesPlayed": 12,
          "matchesWon": 4,
          "tournamentsWon": 1
        },
        {
          "name": "Super Mario Bros. 3",
          "img": "https://media.rawg.io/media/screenshots/092/092fc1910f067a95a07c0fbfdbe25f03.jpg",
          "author": "",
          "date": "1988-10-23",
          "id": 9,
          "tournamentsPlayed": 7,
          "matchesPlayed": 9,
          "matchesWon": 3,
          "tournamentsWon": 1
        },
        {
          "name": "Super Mario World 2: Yoshi's Island",
          "img": "https://media.rawg.io/media/games/98d/98d8fbc56c9a322a84ee38128e487bc8.jpg",
          "author": "",
          "date": "1995-08-05",
          "id": 11,
          "tournamentsPlayed": 10,
          "matchesPlayed": 15,
          "matchesWon": 6,
          "tournamentsWon": 1
        },
        {
          "name": "New Super Mario Bros. U",
          "img": "https://media.rawg.io/media/games/5f7/5f74872bea96cb395a0514bbe54e7b5a.jpg",
          "author": "",
          "date": "2012-11-18",
          "id": 13,
          "tournamentsPlayed": 7,
          "matchesPlayed": 10,
          "matchesWon": 4,
          "tournamentsWon": 1
        },
        {
          "name": "Super Mario Bros. 2",
          "img": "https://media.rawg.io/media/screenshots/c9c/c9ce3a67180418f8ef10d04a48d794e5.jpg",
          "author": "",
          "date": "1988-10-09",
          "id": 8,
          "tournamentsPlayed": 6,
          "matchesPlayed": 10,
          "matchesWon": 4
        },
        {
          "name": "New Super Mario Bros. 2",
          "img": "https://media.rawg.io/media/games/785/785b3279c7849b56e5055232fe94d5eb.jpg",
          "author": "",
          "date": "2012-07-28",
          "id": 14,
          "tournamentsPlayed": 9,
          "matchesPlayed": 13,
          "matchesWon": 4
        },
        {
          "name": "Super Mario Bros. Wonder",
          "img": "https://media.rawg.io/media/games/1fd/1fd3f030bee73452d46a0678084a7ed9.jpg",
          "author": "",
          "date": "2023-10-20",
          "id": 15,
          "tournamentsPlayed": 5,
          "matchesPlayed": 10,
          "matchesWon": 6,
          "tournamentsWon": 1
        },
        {
          "name": "Super Mario 64",
          "img": "https://media.rawg.io/media/games/1d5/1d565b99cad46c44b534d9803e27bd49.jpg",
          "author": "",
          "date": "1996-06-23",
          "id": 1,
          "tournamentsPlayed": 8,
          "matchesPlayed": 15,
          "matchesWon": 9,
          "tournamentsWon": 2
        },
        {
          "name": "Super Mario Galaxy 2",
          "img": "https://media.rawg.io/media/games/4e9/4e928ff4b4e3c3f5acfda38b98a4cf65.jpg",
          "author": "",
          "date": "2010-05-23",
          "id": 4,
          "tournamentsPlayed": 5,
          "matchesPlayed": 13,
          "matchesWon": 9,
          "tournamentsWon": 1
        },
        {
          "name": "Super Mario 3D World + Bowser’s Fury",
          "img": "https://media.rawg.io/media/games/cd2/cd22f0dcf8f080086c60f77eed7a8a93.jpg",
          "author": "",
          "date": "2021-02-12",
          "id": 5,
          "tournamentsPlayed": 6,
          "matchesPlayed": 11,
          "matchesWon": 7,
          "tournamentsWon": 2
        },
        {
          "name": "Super Mario World",
          "img": "https://media.rawg.io/media/games/3bb/3bb2c8d774c3a83eb2c17d0d3d51f020.jpg",
          "author": "",
          "date": "1990-11-21",
          "id": 10,
          "tournamentsPlayed": 6,
          "matchesPlayed": 10,
          "matchesWon": 4
        },
        {
          "name": "Super Mario Sunshine",
          "img": "https://media.rawg.io/media/games/0b7/0b746092287560e4ff5a6ceb5faaed8e.jpg",
          "author": "",
          "date": "2002-08-25",
          "id": 2,
          "tournamentsPlayed": 6,
          "matchesPlayed": 12,
          "matchesWon": 7,
          "tournamentsWon": 1
        },
        {
          "name": "Super Mario 3D Land",
          "img": "https://media.rawg.io/media/games/d9c/d9c8b7edc78391619566adfeb52b5a9a.jpg",
          "author": "",
          "date": "2011-11-03",
          "id": 16,
          "tournamentsPlayed": 6,
          "matchesPlayed": 11,
          "matchesWon": 5
        },
        {
          "name": "New Super Mario Bros. Wii",
          "img": "https://media.rawg.io/media/games/19a/19a1814d28ea396b3fd46404b1638a98.jpg",
          "author": "",
          "date": "2009-11-12",
          "id": 12,
          "tournamentsPlayed": 9,
          "matchesPlayed": 12,
          "matchesWon": 4,
          "tournamentsWon": 1
        },
        {
          "name": "Super Mario Galaxy",
          "img": "https://media.rawg.io/media/games/936/936f0ffac0b3c9f5c8d185f610ed2631.jpg",
          "author": "",
          "date": "2007-11-01",
          "id": 3,
          "tournamentsPlayed": 7,
          "matchesPlayed": 13,
          "matchesWon": 7,
          "tournamentsWon": 1
        },
        {
          "name": "Super Mario Odyssey",
          "img": "https://media.rawg.io/media/games/267/267bd0dbc496f52692487d07d014c061.jpg",
          "author": "",
          "date": "2017-10-27",
          "id": 6,
          "tournamentsPlayed": 6,
          "matchesPlayed": 16,
          "matchesWon": 13,
          "tournamentsWon": 3
        }
      ],
      "id": 3,
      "timesPlayed": 16
    },
    {
      "templateName": "Los manga favoritos de Hilario",
      "category": "manga",
      "contestants": [
        {
          "name": "JoJo no Kimyou na Bouken Part 2: Sentou Chouryuu",
          "date": "1987",
          "img": "https://cdn.myanimelist.net/images/manga/2/269908.jpg",
          "author": "Araki, Hirohiko",
          "id": 8,
          "tournamentsPlayed": 4,
          "matchesPlayed": 7,
          "matchesWon": 3
        },
        {
          "name": "Black Paradox",
          "date": "2007",
          "img": "https://cdn.myanimelist.net/images/manga/2/260342.jpg",
          "author": "Itou, Junji",
          "id": 6,
          "tournamentsPlayed": 2,
          "matchesPlayed": 2
        },
        {
          "name": "Bakuman.",
          "date": "2008",
          "img": "https://cdn.myanimelist.net/images/manga/1/208974.jpg",
          "author": "Obata, Takeshi",
          "id": 1,
          "tournamentsPlayed": 4,
          "matchesPlayed": 15,
          "matchesWon": 12,
          "tournamentsWon": 1
        },
        {
          "name": "JoJo no Kimyou na Bouken Part 5: Ougon no Kaze",
          "date": "1995",
          "img": "https://cdn.myanimelist.net/images/manga/1/269912.jpg",
          "author": "Araki, Hirohiko",
          "id": 10,
          "tournamentsPlayed": 3,
          "matchesPlayed": 6,
          "matchesWon": 3
        },
        {
          "name": "One Piece",
          "date": "1997",
          "img": "https://cdn.myanimelist.net/images/manga/2/253146.jpg",
          "author": "Oda, Eiichiro",
          "id": 4,
          "tournamentsPlayed": 3,
          "matchesPlayed": 11,
          "matchesWon": 10,
          "tournamentsWon": 2
        },
        {
          "name": "Jumyou wo Kaitotte Moratta. Ichinen ni Tsuki, Ichimanen de.",
          "date": "2016",
          "img": "https://cdn.myanimelist.net/images/manga/5/260043.jpg",
          "author": "Taguchi, Shouichi",
          "id": 21,
          "tournamentsPlayed": 3,
          "matchesPlayed": 6,
          "matchesWon": 3
        },
        {
          "name": "JoJo no Kimyou na Bouken Part 8: JoJolion",
          "date": "2011",
          "img": "https://cdn.myanimelist.net/images/manga/1/179885.jpg",
          "author": "Araki, Hirohiko",
          "id": 13,
          "tournamentsPlayed": 3,
          "matchesPlayed": 5,
          "matchesWon": 2
        },
        {
          "name": "Chainsaw Man",
          "date": "2018",
          "img": "https://cdn.myanimelist.net/images/manga/3/216464.jpg",
          "author": "Fujimoto, Tatsuki",
          "id": 2,
          "tournamentsPlayed": 2,
          "matchesPlayed": 6,
          "matchesWon": 4
        },
        {
          "name": "Otouto no Otto",
          "date": "2014",
          "img": "https://cdn.myanimelist.net/images/manga/2/158104.jpg",
          "author": "Tagame, Gengorou",
          "id": 17,
          "tournamentsPlayed": 3,
          "matchesPlayed": 5,
          "matchesWon": 2
        },
        {
          "name": "Bastard",
          "date": "2014",
          "img": "https://cdn.myanimelist.net/images/manga/1/205549.jpg",
          "author": "Kim, Carnby",
          "id": 5,
          "tournamentsPlayed": 4,
          "matchesPlayed": 12,
          "matchesWon": 8
        },
        {
          "name": "JoJo no Kimyou na Bouken Part 9: The JoJoLands",
          "date": "2023",
          "img": "https://cdn.myanimelist.net/images/manga/1/286969.jpg",
          "author": "Araki, Hirohiko",
          "id": 14,
          "tournamentsPlayed": 3,
          "matchesPlayed": 3
        },
        {
          "name": "Dandadan",
          "date": "2021",
          "img": "https://cdn.myanimelist.net/images/manga/2/248746.jpg",
          "author": "Tatsu, Yukinobu",
          "id": 3,
          "tournamentsPlayed": 4,
          "matchesPlayed": 6,
          "matchesWon": 2
        },
        {
          "name": "JoJo no Kimyou na Bouken Part 7: Steel Ball Run",
          "date": "2004",
          "img": "https://cdn.myanimelist.net/images/manga/3/179882.jpg",
          "author": "Araki, Hirohiko",
          "id": 12,
          "tournamentsPlayed": 2,
          "matchesPlayed": 5,
          "matchesWon": 4,
          "tournamentsWon": 1
        },
        {
          "name": "Kishibe Rohan Louvre e Iku",
          "date": "2010",
          "img": "https://cdn.myanimelist.net/images/manga/2/175983.jpg",
          "author": "Araki, Hirohiko",
          "id": 20,
          "tournamentsPlayed": 4,
          "matchesPlayed": 8,
          "matchesWon": 4
        },
        {
          "name": "JoJo no Kimyou na Bouken Part 3: Stardust Crusaders",
          "date": "1989",
          "img": "https://cdn.myanimelist.net/images/manga/3/269909.jpg",
          "author": "Araki, Hirohiko",
          "id": 9,
          "tournamentsPlayed": 1,
          "matchesPlayed": 2,
          "matchesWon": 1
        },
        {
          "name": "Pluto",
          "date": "2003",
          "img": "https://cdn.myanimelist.net/images/manga/1/264496.jpg",
          "author": "Urasawa, Naoki",
          "id": 25,
          "tournamentsPlayed": 3,
          "matchesPlayed": 3
        },
        {
          "name": "Uzumaki",
          "date": "1998",
          "img": "https://cdn.myanimelist.net/images/manga/3/185972.jpg",
          "author": "Itou, Junji",
          "id": 22,
          "tournamentsPlayed": 1,
          "matchesPlayed": 1
        },
        {
          "name": "Metroid",
          "date": "2002",
          "img": "https://cdn.myanimelist.net/images/manga/2/153968.jpg",
          "author": "Tazawa, Kouji",
          "id": 16,
          "tournamentsPlayed": 3,
          "matchesPlayed": 3
        },
        {
          "name": "Kishibe Rohan wa Ugokanai",
          "date": "1997",
          "img": "https://cdn.myanimelist.net/images/manga/3/210302.jpg",
          "author": "Araki, Hirohiko",
          "id": 19,
          "tournamentsPlayed": 2,
          "matchesPlayed": 2
        },
        {
          "name": "Homunculus",
          "date": "2003",
          "img": "https://cdn.myanimelist.net/images/manga/1/318.jpg",
          "author": "Yamamoto, Hideo",
          "id": 24,
          "tournamentsPlayed": 2,
          "matchesPlayed": 3,
          "matchesWon": 1
        },
        {
          "name": "JoJo no Kimyou na Bouken Part 1: Phantom Blood",
          "date": "1986",
          "img": "https://cdn.myanimelist.net/images/manga/2/269907.jpg",
          "author": "Araki, Hirohiko",
          "id": 7,
          "tournamentsPlayed": 2,
          "matchesPlayed": 2
        },
        {
          "name": "Itou Junji no Neko Nikki: Yon & Muu",
          "date": "2007",
          "img": "https://cdn.myanimelist.net/images/manga/1/182059.jpg",
          "author": "Itou, Junji",
          "id": 15,
          "tournamentsPlayed": 2,
          "matchesPlayed": 2
        },
        {
          "name": "JoJo no Kimyou na Bouken Part 6: Stone Ocean",
          "date": "1999",
          "img": "https://cdn.myanimelist.net/images/manga/2/255379.jpg",
          "author": "Araki, Hirohiko",
          "id": 11
        },
        {
          "name": "Sabishisugite Lesbian Fuuzoku ni Ikimashita Report",
          "date": "2016",
          "img": "https://cdn.myanimelist.net/images/manga/2/180846.jpg",
          "author": "Nagata, Kabi",
          "id": 18,
          "tournamentsPlayed": 2,
          "matchesPlayed": 2
        },
        {
          "name": "Fire Punch",
          "date": "2016",
          "img": "https://cdn.myanimelist.net/images/manga/2/180430.jpg",
          "author": "Fujimoto, Tatsuki",
          "id": 23,
          "tournamentsPlayed": 2,
          "matchesPlayed": 3,
          "matchesWon": 1
        }
      ],
      "id": 4,
      "timesPlayed": 4
    },
    {
      "templateName": "Sitcoms",
      "category": "series",
      "contestants": [
        {
          "name": "The Big Bang Theory",
          "img": "https://m.media-amazon.com/images/M/MV5BY2FmZTY5YTktOWRlYy00NmIyLWE0ZmQtZDg2YjlmMzczZDZiXkEyXkFqcGdeQXVyNjg4NzAyOTA@._V1_SX300.jpg",
          "date": "2007–2019",
          "author": "",
          "id": 4,
          "tournamentsPlayed": 5,
          "matchesPlayed": 5
        },
        {
          "name": "Modern Family",
          "img": "https://m.media-amazon.com/images/M/MV5BNzRhNWIxYTEtYjc2NS00YWFlLWFhOGEtMDZiMWM1M2RkNDkyXkEyXkFqcGdeQXVyNjc0MjkzNjc@._V1_SX300.jpg",
          "date": "2009–2020",
          "author": "",
          "id": 3,
          "tournamentsPlayed": 3,
          "matchesPlayed": 7,
          "matchesWon": 5,
          "tournamentsWon": 1
        },
        {
          "name": "The Office",
          "img": "https://m.media-amazon.com/images/M/MV5BMDNkOTE4NDQtMTNmYi00MWE0LWE4ZTktYTc0NzhhNWIzNzJiXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_SX300.jpg",
          "date": "2005–2013",
          "author": "",
          "id": 6,
          "tournamentsPlayed": 3,
          "matchesPlayed": 5,
          "matchesWon": 4,
          "tournamentsWon": 2
        },
        {
          "name": "Curb Your Enthusiasm",
          "img": "https://m.media-amazon.com/images/M/MV5BMzE3ZDA4OWItOGY2ZC00MzVmLTk0Y2QtNzEzMjc5YWI5ZWFiXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg",
          "date": "2000–",
          "author": "",
          "id": 10,
          "tournamentsPlayed": 4,
          "matchesPlayed": 5,
          "matchesWon": 1
        },
        {
          "name": "How I Met Your Mother",
          "img": "https://m.media-amazon.com/images/M/MV5BNjg1MDQ5MjQ2N15BMl5BanBnXkFtZTYwNjI5NjA3._V1_SX300.jpg",
          "date": "2005–2014",
          "author": "",
          "id": 5,
          "tournamentsPlayed": 4,
          "matchesPlayed": 6,
          "matchesWon": 3,
          "tournamentsWon": 1
        },
        {
          "name": "Parks and Recreation",
          "img": "https://m.media-amazon.com/images/M/MV5BYWNkOTg0OTMtZTcyNy00MWU1LWJhZDQtYjQzMjU1NjBhYzI2XkEyXkFqcGdeQXVyOTE4NzcwNzI@._V1_SX300.jpg",
          "date": "2009–2015",
          "author": "",
          "id": 1,
          "tournamentsPlayed": 3,
          "matchesPlayed": 5,
          "matchesWon": 2
        },
        {
          "name": "Friends",
          "img": "https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
          "date": "1994–2004",
          "author": "",
          "id": 2,
          "tournamentsPlayed": 2,
          "matchesPlayed": 5,
          "matchesWon": 5,
          "tournamentsWon": 2
        },
        {
          "name": "Community",
          "img": "https://m.media-amazon.com/images/M/MV5BNDQ5NDZiYjktZmFmMy00MjAxLTk1MDktOGZjYTY5YTE1ODdmXkEyXkFqcGdeQXVyNjcwMzEzMTU@._V1_SX300.jpg",
          "date": "2009–2015",
          "author": "",
          "id": 8,
          "tournamentsPlayed": 3,
          "matchesPlayed": 5,
          "matchesWon": 4,
          "tournamentsWon": 2
        },
        {
          "name": "Two and a Half Men",
          "img": "https://m.media-amazon.com/images/M/MV5BOTI2MjIzN2ItZDg0OS00MTlhLWIzMTMtYWI4ZTA0NGE4NDJlXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
          "date": "2003–2015",
          "author": "",
          "id": 11,
          "tournamentsPlayed": 5,
          "matchesPlayed": 6,
          "matchesWon": 2,
          "tournamentsWon": 1
        },
        {
          "name": "That '70s Show",
          "img": "https://m.media-amazon.com/images/M/MV5BN2RkZGE0MjAtZGVkOS00MzVhLTg0OWItZTc4OGRjOTQ1ZTM4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
          "date": "1998–2006",
          "author": "",
          "id": 12,
          "tournamentsPlayed": 5,
          "matchesPlayed": 7,
          "matchesWon": 2
        },
        {
          "name": "30 Rock",
          "img": "https://m.media-amazon.com/images/M/MV5BMTQ4NDQ4OTUzOV5BMl5BanBnXkFtZTcwMjMzMTUyNw@@._V1_SX300.jpg",
          "date": "2006–2013",
          "author": "",
          "id": 7,
          "tournamentsPlayed": 4,
          "matchesPlayed": 7,
          "matchesWon": 3
        },
        {
          "name": "Malcolm in the Middle",
          "img": "https://m.media-amazon.com/images/M/MV5BNTc2MzM2N2YtZDdiOS00M2I2LWFjOGItMDM3OTA3YjUwNjAxXkEyXkFqcGdeQXVyNzA5NjUyNjM@._V1_SX300.jpg",
          "date": "2000–2006",
          "author": "",
          "id": 9,
          "tournamentsPlayed": 3,
          "matchesPlayed": 5,
          "matchesWon": 3,
          "tournamentsWon": 1
        }
      ],
      "id": 5,
      "timesPlayed": 10
    },
    {
      "templateName": "Los mejores juegos de la play 1",
      "category": "games",
      "contestants": [
        {
          "name": "Crash Bandicoot",
          "img": "https://media.rawg.io/media/crop/600/400/games/bc1/bc141ec3f4ca8d1d14f0ab4e4f9e654d.jpg",
          "author": "",
          "date": "1996-09-09",
          "id": 8,
          "tournamentsPlayed": 2,
          "matchesPlayed": 4,
          "matchesWon": 2
        },
        {
          "name": "Spider-Man (2000)",
          "img": "https://media.rawg.io/media/crop/600/400/games/1cf/1cf9e301f1d27172546dcabc2f6cb597.jpg",
          "author": "",
          "date": "2000-09-15",
          "id": 1,
          "tournamentsPlayed": 2,
          "matchesPlayed": 10,
          "matchesWon": 9,
          "tournamentsWon": 1
        },
        {
          "name": "Chrono Cross",
          "img": "https://media.rawg.io/media/crop/600/400/games/2ad/2ad33347237cdc941ba5312787dbe3f8.jpg",
          "author": "",
          "date": "1999-11-18",
          "id": 27,
          "tournamentsPlayed": 2,
          "matchesPlayed": 2
        },
        {
          "name": "Spyro 2: Ripto's Rage!",
          "img": "https://media.rawg.io/media/crop/600/400/games/8da/8da6960974c2348585e6e99603c52126.jpg",
          "author": "",
          "date": "1999-10-31",
          "id": 25,
          "tournamentsPlayed": 2,
          "matchesPlayed": 4,
          "matchesWon": 2
        },
        {
          "name": "FINAL FANTASY VIII",
          "img": "https://media.rawg.io/media/crop/600/400/games/f77/f77510051b6a61decc35c5257193fc9e.jpg",
          "author": "",
          "date": "1999-02-11",
          "id": 5,
          "tournamentsPlayed": 2,
          "matchesPlayed": 3,
          "matchesWon": 1
        },
        {
          "name": "Ape Escape",
          "img": "https://media.rawg.io/media/crop/600/400/games/eb7/eb752b66d0060b832e5037c743850ab7.jpg",
          "author": "",
          "date": "1999-05-31",
          "id": 21,
          "tournamentsPlayed": 2,
          "matchesPlayed": 3,
          "matchesWon": 1
        },
        {
          "name": "Gran Turismo",
          "img": "https://media.rawg.io/media/crop/600/400/games/5ac/5ac568dcf73aedba140bcca2a8a5eb09.jpg",
          "author": "",
          "date": "1997-12-22",
          "id": 12,
          "tournamentsPlayed": 2,
          "matchesPlayed": 3,
          "matchesWon": 1
        },
        {
          "name": "Castlevania: Symphony of the Night",
          "img": "https://media.rawg.io/media/crop/600/400/games/45d/45da4dc311d84b79230317d7b24a3dec.jpg",
          "author": "",
          "date": "1997-03-20",
          "id": 20,
          "tournamentsPlayed": 2,
          "matchesPlayed": 5,
          "matchesWon": 3
        },
        {
          "name": "Twisted Metal 2",
          "img": "https://media.rawg.io/media/crop/600/400/games/d62/d62e9a590eef5ce07d4358be3854ae00.jpg",
          "author": "",
          "date": "1996-10-31",
          "id": 24,
          "tournamentsPlayed": 2,
          "matchesPlayed": 3,
          "matchesWon": 1
        },
        {
          "name": "Spyro the Dragon",
          "img": "https://media.rawg.io/media/crop/600/400/games/243/2434639122ce19d4811048cd11ab5ba0.jpg",
          "author": "",
          "date": "1998-09-09",
          "id": 2,
          "tournamentsPlayed": 2,
          "matchesPlayed": 7,
          "matchesWon": 5
        },
        {
          "name": "Metal Gear Solid",
          "img": "https://media.rawg.io/media/crop/600/400/games/bbc/bbce6f1659d35ffc16aed8b66e9990a1.jpg",
          "author": "",
          "date": "1998-09-03",
          "id": 6,
          "tournamentsPlayed": 2,
          "matchesPlayed": 7,
          "matchesWon": 5
        },
        {
          "name": "Resident Evil 3: Nemesis",
          "img": "https://media.rawg.io/media/crop/600/400/games/1b2/1b28e8ecb335bfdfbb85510d82810fbb.jpg",
          "author": "",
          "date": "1999-09-22",
          "id": 19,
          "tournamentsPlayed": 2,
          "matchesPlayed": 3,
          "matchesWon": 1
        },
        {
          "name": "Oddworld: Abe's Oddysee",
          "img": "https://media.rawg.io/media/crop/600/400/games/2ae/2aedae90b1377a0f3e5ce54d24f8e41a.jpg",
          "author": "",
          "date": "1997-09-19",
          "id": 4,
          "tournamentsPlayed": 2,
          "matchesPlayed": 4,
          "matchesWon": 2
        },
        {
          "name": "Tony Hawk's Pro Skater",
          "img": "https://media.rawg.io/media/crop/600/400/screenshots/fd2/fd22fcd8470c96a6cf30051c3d249a6b.jpg",
          "author": "",
          "date": "1999-08-31",
          "id": 13,
          "tournamentsPlayed": 2,
          "matchesPlayed": 4,
          "matchesWon": 2
        },
        {
          "name": "Tekken 2 (1995)",
          "img": "https://media.rawg.io/media/crop/600/400/games/c9f/c9fbbde8236fbefa330658166eba8419.jpg",
          "author": "",
          "date": "1995-09-29",
          "id": 15,
          "tournamentsPlayed": 2,
          "matchesPlayed": 2
        },
        {
          "name": "Crash Bandicoot 2: Cortex Strikes Back",
          "img": "https://media.rawg.io/media/crop/600/400/games/a84/a84dc4980063ce934705ea5d8d241939.jpg",
          "author": "",
          "date": "1997-11-01",
          "id": 9,
          "tournamentsPlayed": 2,
          "matchesPlayed": 7,
          "matchesWon": 6,
          "tournamentsWon": 1
        },
        {
          "name": "Resident Evil",
          "img": "https://media.rawg.io/media/crop/600/400/games/510/51039d0ec5dc8c3e08ae4374dfceecec.jpg",
          "author": "",
          "date": "1996-03-22",
          "id": 17,
          "tournamentsPlayed": 2,
          "matchesPlayed": 2
        },
        {
          "name": "Resident Evil 2 (1998)",
          "img": "https://media.rawg.io/media/crop/600/400/games/d64/d646810b629081cc12aec49ed9f49441.jpg",
          "author": "",
          "date": "1998-01-21",
          "id": 18,
          "tournamentsPlayed": 2,
          "matchesPlayed": 2
        },
        {
          "name": "Final Fantasy VII (1997)",
          "img": "https://media.rawg.io/media/crop/600/400/games/6c0/6c00ee85d1344f58c469e8e47fd8ae7c.jpg",
          "author": "",
          "date": "1997-01-31",
          "id": 3,
          "tournamentsPlayed": 2,
          "matchesPlayed": 6,
          "matchesWon": 4
        },
        {
          "name": "Final Fantasy IX",
          "img": "https://media.rawg.io/media/crop/600/400/games/826/82626e2d7ee7d96656fb9838c2ef7302.jpg",
          "author": "",
          "date": "2000-07-07",
          "id": 11,
          "tournamentsPlayed": 2,
          "matchesPlayed": 3,
          "matchesWon": 1
        },
        {
          "name": "Crash Bandicoot 3: Warped",
          "img": "https://media.rawg.io/media/crop/600/400/games/837/837a609b0584db5d03534c8e767861b1.jpg",
          "author": "",
          "date": "1998-10-31",
          "id": 10,
          "tournamentsPlayed": 2,
          "matchesPlayed": 2
        },
        {
          "name": "PaRappa the Rapper",
          "img": "https://media.rawg.io/media/crop/600/400/games/985/9852f17322124be2aa0be1307b1b75a1.jpg",
          "author": "",
          "date": "1996-12-06",
          "id": 28,
          "tournamentsPlayed": 2,
          "matchesPlayed": 7,
          "matchesWon": 5
        },
        {
          "name": "Crash Team Racing",
          "img": "https://media.rawg.io/media/crop/600/400/screenshots/f8c/f8c6b111e074502aa8da71476885eec8.jpg",
          "author": "",
          "date": "1999-09-30",
          "id": 7,
          "tournamentsPlayed": 2,
          "matchesPlayed": 5,
          "matchesWon": 3
        },
        {
          "name": "Medal of Honor (1999)",
          "img": "https://media.rawg.io/media/crop/600/400/games/adb/adbbb53b574aae53145f9909d050a722.jpg",
          "author": "",
          "date": "1999-10-31",
          "id": 30,
          "tournamentsPlayed": 2,
          "matchesPlayed": 3,
          "matchesWon": 1
        },
        {
          "name": "FIFA 2002",
          "img": "https://media.rawg.io/media/crop/600/400/games/d28/d282e0d48092a577345c4b5bd7715e0f.jpg",
          "author": "",
          "date": "2001-01-01",
          "id": 32,
          "tournamentsPlayed": 2,
          "matchesPlayed": 2
        },
        {
          "name": "Tekken 3",
          "img": "https://media.rawg.io/media/crop/600/400/games/4aa/4aa1440932f4a12d9d0ea70a5e2164f6.jpg",
          "author": "",
          "date": "1997-03-20",
          "id": 16,
          "tournamentsPlayed": 2,
          "matchesPlayed": 2
        },
        {
          "name": "Street Fighter Alpha 3 (1998)",
          "img": "https://media.rawg.io/media/crop/600/400/screenshots/321/321da692849a96bf61ac07b28fd7d023.jpg",
          "author": "",
          "date": "1998-06-29",
          "id": 29,
          "tournamentsPlayed": 2,
          "matchesPlayed": 3,
          "matchesWon": 1
        },
        {
          "name": "Tomb Raider",
          "img": "https://media.rawg.io/media/crop/600/400/games/44f/44f1fd0d156a5a6ee47ec00b90441b15.jpg",
          "author": "",
          "date": "1996-10-25",
          "id": 31,
          "tournamentsPlayed": 2,
          "matchesPlayed": 2
        },
        {
          "name": "Silent Hill",
          "img": "https://media.rawg.io/media/crop/600/400/games/15d/15db2360d1130ba8c10573586588b0bd.jpg",
          "author": "",
          "date": "1999-01-31",
          "id": 22,
          "tournamentsPlayed": 2,
          "matchesPlayed": 3,
          "matchesWon": 1
        },
        {
          "name": "Spyro: Year of the Dragon",
          "img": "https://media.rawg.io/media/crop/600/400/games/4b8/4b823c94b723f1dc99b6f0d1cf00349d.jpg",
          "author": "",
          "date": "2000-10-24",
          "id": 26,
          "tournamentsPlayed": 2,
          "matchesPlayed": 3,
          "matchesWon": 1
        },
        {
          "name": "Tony Hawk's Pro Skater 2",
          "img": "https://media.rawg.io/media/crop/600/400/screenshots/c21/c2123c3dea40946f705a54772ed6238b.jpg",
          "author": "",
          "date": "2000-09-19",
          "id": 14,
          "tournamentsPlayed": 2,
          "matchesPlayed": 6,
          "matchesWon": 4
        },
        {
          "name": "Twisted Metal (1995)",
          "img": "https://media.rawg.io/media/crop/600/400/games/964/96468700967b2cf3ce9267936bc7dfbb.jpg",
          "author": "",
          "date": "1995-11-05",
          "id": 23,
          "tournamentsPlayed": 2,
          "matchesPlayed": 2
        }
      ],
      "id": 6,
      "timesPlayed": 2
    },
    {
      "templateName": "Top 16 Animes de MyAnimeList 2023",
      "category": "anime",
      "contestants": [
        {
          "name": "Sousou no Frieren",
          "date": "2023",
          "img": "https://cdn.myanimelist.net/images/anime/1015/138006.jpg",
          "author": "Madhouse"
        },
        {
          "name": "Fullmetal Alchemist: Brotherhood",
          "date": "2009",
          "img": "https://cdn.myanimelist.net/images/anime/1208/94745.jpg",
          "author": "Bones"
        },
        {
          "name": "Steins;Gate",
          "date": "2011",
          "img": "https://cdn.myanimelist.net/images/anime/1935/127974.jpg",
          "author": "White Fox"
        },
        {
          "name": "Gintama°",
          "date": "2015",
          "img": "https://cdn.myanimelist.net/images/anime/3/72078.jpg",
          "author": "Bandai Namco Pictures"
        },
        {
          "name": "Shingeki no Kyojin: Ano Hi Kara",
          "date": "2013",
          "img": "https://cdn.myanimelist.net/images/anime/3/51715.jpg",
          "author": "Wit Studio"
        },
        {
          "name": "Kaguya-sama wa Kokurasetai: Ultra Romantic",
          "date": "2022",
          "img": "https://cdn.myanimelist.net/images/anime/1160/122627.jpg",
          "author": "A-1 Pictures"
        },
        {
          "name": "Fruits Basket: The Final",
          "date": "2021",
          "img": "https://cdn.myanimelist.net/images/anime/1085/114792.jpg",
          "author": "TMS Entertainment"
        },
        {
          "name": "Clannad: After Story",
          "date": "2008",
          "img": "https://cdn.myanimelist.net/images/anime/1299/110774.jpg",
          "author": "Kyoto Animation"
        },
        {
          "name": "Koe no Katachi",
          "date": "2016",
          "img": "https://cdn.myanimelist.net/images/anime/1122/96435.jpg",
          "author": "Kyoto Animation"
        },
        {
          "name": "3-gatsu no Lion",
          "date": "2016",
          "img": "https://cdn.myanimelist.net/images/anime/3/82899.jpg",
          "author": "Shaft"
        },
        {
          "name": "Code Geass: Hangyaku no Lelouch",
          "date": "2006",
          "img": "https://cdn.myanimelist.net/images/anime/1032/135088.jpg",
          "author": "Sunrise"
        },
        {
          "name": "Monster",
          "date": "2004",
          "img": "https://cdn.myanimelist.net/images/anime/10/18793.jpg",
          "author": "Madhouse"
        },
        {
          "name": "Violet Evergarden Movie",
          "date": "2020",
          "img": "https://cdn.myanimelist.net/images/anime/1825/110716.jpg",
          "author": "Kyoto Animation"
        },
        {
          "name": "Kimi no Na wa.",
          "date": "2016",
          "img": "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
          "author": "CoMix Wave Films"
        },
        {
          "name": "Jujutsu Kaisen",
          "date": "2020",
          "img": "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
          "author": "MAPPA"
        },
        {
          "name": "Hunter x Hunter (2011)",
          "date": "2011",
          "img": "https://cdn.myanimelist.net/images/anime/1337/99013.jpg",
          "author": "Madhouse"
        }
      ],
      "id": 7
    },
    {
      "templateName": "Discos de los Beatles",
      "category": "albums",
      "contestants": [
        {
          "name": "Please Please Me",
          "author": "The Beatles",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/a70b31d8b03b4dad4ece1bcdebcf6ad9.png"
        },
        {
          "name": "With The Beatles",
          "author": "The Beatles",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/00997fb73afdfbb21fdd0afcc1112148.png"
        },
        {
          "name": "A Hard Day's Night",
          "author": "The Beatles",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/cad2c302e53c41350e0df2c16903e1f9.png"
        },
        {
          "name": "Beatles for Sale",
          "author": "The Beatles",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/d175bc2bc01f65a34431174ebbb84558.png"
        },
        {
          "name": "Help!",
          "author": "The Beatles",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/03b748a208cb2cc2aacb32965539efbf.png"
        },
        {
          "name": "Rubber Soul",
          "author": "The Beatles",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/fe86d0172acc17ce7adb5bd637631f5b.png"
        },
        {
          "name": "Revolver",
          "author": "The Beatles",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/deaec2d4735bea0d1c45fc75261624ae.png"
        },
        {
          "name": "Sgt. Pepper's Lonely Hearts Club Band",
          "author": "The Beatles",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/ed01ed43bba8defd5c9f74e8b69c647f.png"
        },
        {
          "name": "The Beatles",
          "author": "The Beatles",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/0e17c97cccf44f7a85bb6c1c4029c0c9.png"
        },
        {
          "name": "Yellow Submarine",
          "author": "The Beatles",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/8d942b9fff5ee7e3675c4f1e392be3ef.png"
        },
        {
          "name": "Abbey Road",
          "author": "The Beatles",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/f304ba0296794c6fc9d0e1cccd194ed0.png"
        },
        {
          "name": "Let It Be",
          "author": "The Beatles",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/fccba11223ed63f59013e3a1e851e7f3.png"
        }
      ],
      "id": 8
    },
    {
      "templateName": "Los juegos más vendidos de todos los tiempos",
      "category": "games",
      "contestants": [
        {
          "name": "Minecraft",
          "img": "https://media.rawg.io/media/crop/600/400/games/b4e/b4e4c73d5aa4ec66bbf75375c4847a2b.jpg",
          "author": "",
          "date": "2009-05-10"
        },
        {
          "name": "Grand Theft Auto V",
          "img": "https://media.rawg.io/media/crop/600/400/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
          "author": "",
          "date": "2013-09-17"
        },
        {
          "name": "Tetris (1984)",
          "img": "https://media.rawg.io/media/crop/600/400/games/637/637d7dc2f44d0f6ddd3ee2c0b1366962.jpg",
          "author": "",
          "date": "1984-06-06"
        },
        {
          "name": "Wii Sports",
          "img": "https://media.rawg.io/media/crop/600/400/games/173/1739bdc5c33e85a0fa54b499a173690b.jpg",
          "author": "",
          "date": "2006-11-19"
        },
        {
          "name": "Mario Kart 8 Deluxe",
          "img": "https://media.rawg.io/media/crop/600/400/games/6f8/6f846e941c78cfbabe53cd67e55ced83.jpg",
          "author": "",
          "date": "2017-04-27"
        },
        {
          "name": "Red Dead Redemption 2",
          "img": "https://media.rawg.io/media/crop/600/400/games/511/5118aff5091cb3efec399c808f8c598f.jpg",
          "author": "",
          "date": "2018-10-26"
        },
        {
          "name": "Super Mario Bros.",
          "img": "https://media.rawg.io/media/crop/600/400/games/154/154fea9689109f26c49c6a2db6263ef9.jpg",
          "author": "",
          "date": "1985-09-13"
        },
        {
          "name": "Overwatch",
          "img": "https://media.rawg.io/media/crop/600/400/games/4ea/4ea507ceebeabb43edbc09468f5aaac6.jpg",
          "author": "",
          "date": "2016-05-24"
        },
        {
          "name": "Human: Fall Flat",
          "img": "https://media.rawg.io/media/crop/600/400/games/74d/74dafeb9a442b87b9dd4a1d4a2faa37b.jpg",
          "author": "",
          "date": "2016-07-22"
        },
        {
          "name": "The Witcher 3: Wild Hunt",
          "img": "https://media.rawg.io/media/crop/600/400/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
          "author": "",
          "date": "2015-05-18"
        },
        {
          "name": "Pokémon Red, Blue, Yellow",
          "img": "https://media.rawg.io/media/crop/600/400/games/356/3566c06f8e5d3b45f4163dec1d9968a2.jpg",
          "author": "",
          "date": "1996-02-27"
        },
        {
          "name": "Animal Crossing: New Horizons",
          "img": "https://media.rawg.io/media/crop/600/400/games/42f/42fe1abd4d7c11ca92d93a0fb0f8662b.jpg",
          "author": "",
          "date": "2020-03-20"
        },
        {
          "name": "Terraria",
          "img": "https://media.rawg.io/media/crop/600/400/games/f46/f466571d536f2e3ea9e815ad17177501.jpg",
          "author": "",
          "date": "2011-05-16"
        },
        {
          "name": "Wii Fit",
          "img": "https://media.rawg.io/media/crop/600/400/screenshots/3de/3de5cba7c06045fa9139be3a2196cadf.jpg",
          "author": "",
          "date": "2008-05-21"
        },
        {
          "name": "Pac-Man",
          "img": "https://media.rawg.io/media/crop/600/400/games/b21/b21555abc69d04d9b5d7663d478ca81e.jpg",
          "author": "",
          "date": "1980-05-22"
        },
        {
          "name": "Mario Kart Wii",
          "img": "https://media.rawg.io/media/crop/600/400/screenshots/68a/68a5dfb584c006bb3064b83881669aaf.jpg",
          "author": "",
          "date": "2008-04-27"
        },
        {
          "name": "Super Smash Bros. Ultimate",
          "img": "https://media.rawg.io/media/crop/600/400/games/9f3/9f3c513b301d8d7250a64dd7e73c62df.jpg",
          "author": "",
          "date": "2018-12-07"
        },
        {
          "name": "The Legend of Zelda: Breath of the Wild",
          "img": "https://media.rawg.io/media/crop/600/400/games/cc1/cc196a5ad763955d6532cdba236f730c.jpg",
          "author": "",
          "date": "2017-03-03"
        },
        {
          "name": "Wii Sports Resort",
          "img": "https://media.rawg.io/media/crop/600/400/screenshots/472/472c6954864d52a7681e7c8ef3d3a94b.jpg",
          "author": "",
          "date": "2009-07-26"
        },
        {
          "name": "Call of Duty 4: Modern Warfare",
          "img": "https://media.rawg.io/media/crop/600/400/games/9fb/9fbaea2168caea1f806546dfdaaeb1da.jpg",
          "author": "",
          "date": "2007-11-05"
        }
      ],
      "id": 9
    },
    {
      "templateName": "Torneo de peliculas de Tarantino",
      "category": "movie",
      "contestants": [
        {
          "name": "Reservoir Dogs",
          "img": "https://m.media-amazon.com/images/M/MV5BZmExNmEwYWItYmQzOS00YjA5LTk2MjktZjEyZDE1Y2QxNjA1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
          "date": "1992",
          "author": ""
        },
        {
          "name": "Pulp Fiction",
          "img": "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
          "date": "1994",
          "author": ""
        },
        {
          "name": "Jackie Brown",
          "img": "https://m.media-amazon.com/images/M/MV5BNmY5ODRmYTItNWU0Ni00MWE3LTgyYzUtYjZlN2Q5YTcyM2NmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
          "date": "1997",
          "author": ""
        },
        {
          "name": "Death Proof",
          "img": "https://m.media-amazon.com/images/M/MV5BYTdmZmY3Y2QtNjU5NC00OGUxLTg3MWQtMmE2ODM5Mzg3MzcyL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
          "date": "2007",
          "author": ""
        },
        {
          "name": "The Inglorious Bastards",
          "img": "https://m.media-amazon.com/images/M/MV5BYzRmZmJiODktMTVlMC00YzQ4LTkyYmMtYTAwODdmOTFlODNmL2ltYWdlXkEyXkFqcGdeQXVyMTYxNjkxOQ@@._V1_SX300.jpg",
          "date": "1978",
          "author": ""
        },
        {
          "name": "Django Unchained",
          "img": "https://m.media-amazon.com/images/M/MV5BMjIyNTQ5NjQ1OV5BMl5BanBnXkFtZTcwODg1MDU4OA@@._V1_SX300.jpg",
          "date": "2012",
          "author": ""
        },
        {
          "name": "The Hateful Eight",
          "img": "https://m.media-amazon.com/images/M/MV5BMjA1MTc1NTg5NV5BMl5BanBnXkFtZTgwOTM2MDEzNzE@._V1_SX300.jpg",
          "date": "2015",
          "author": ""
        },
        {
          "name": "Once Upon a Time... in Hollywood",
          "img": "https://m.media-amazon.com/images/M/MV5BOTg4ZTNkZmUtMzNlZi00YmFjLTk1MmUtNWQwNTM0YjcyNTNkXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_SX300.jpg",
          "date": "2019",
          "author": ""
        },
        {
          "name": "Kill Bill: Vol. 1",
          "img": "https://m.media-amazon.com/images/M/MV5BNzM3NDFhYTAtYmU5Mi00NGRmLTljYjgtMDkyODQ4MjNkMGY2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
          "date": "2003",
          "author": ""
        },
        {
          "name": "Kill Bill: Vol. 2",
          "img": "https://m.media-amazon.com/images/M/MV5BNmFiYmJmN2QtNWQwMi00MzliLThiOWMtZjQxNGRhZTQ1MjgyXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_SX300.jpg",
          "date": "2004",
          "author": ""
        }
      ],
      "id": 10
    },
    {
      "templateName": "Oscars a mejor pelicula del año (2000 - 2024)",
      "category": "movie",
      "contestants": [
        {
          "name": "Gladiator",
          "img": "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
          "date": "2000",
          "author": ""
        },
        {
          "name": "A Beautiful Mind",
          "img": "https://m.media-amazon.com/images/M/MV5BMzcwYWFkYzktZjAzNC00OGY1LWI4YTgtNzc5MzVjMDVmNjY0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
          "date": "2001",
          "author": ""
        },
        {
          "name": "Chicago",
          "img": "https://m.media-amazon.com/images/M/MV5BN2E3NDU1ZTktNzZjNy00MWU3LWI4YmMtMjdjNTIzMDU0MDdiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
          "date": "2002",
          "author": ""
        },
        {
          "name": "The Lord of the Rings: The Return of the King",
          "img": "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
          "date": "2003",
          "author": ""
        },
        {
          "name": "Million Dollar Baby",
          "img": "https://m.media-amazon.com/images/M/MV5BMTkxNzA1NDQxOV5BMl5BanBnXkFtZTcwNTkyMTIzMw@@._V1_SX300.jpg",
          "date": "2004",
          "author": ""
        },
        {
          "name": "Crash",
          "img": "https://m.media-amazon.com/images/M/MV5BOTk1OTA1MjIyNV5BMl5BanBnXkFtZTcwODQxMTkyMQ@@._V1_SX300.jpg",
          "date": "2004",
          "author": ""
        },
        {
          "name": "The Departed",
          "img": "https://m.media-amazon.com/images/M/MV5BMTI1MTY2OTIxNV5BMl5BanBnXkFtZTYwNjQ4NjY3._V1_SX300.jpg",
          "date": "2006",
          "author": ""
        },
        {
          "name": "No Country for Old Men",
          "img": "https://m.media-amazon.com/images/M/MV5BMjA5Njk3MjM4OV5BMl5BanBnXkFtZTcwMTc5MTE1MQ@@._V1_SX300.jpg",
          "date": "2007",
          "author": ""
        },
        {
          "name": "Slumdog Millionaire",
          "img": "https://m.media-amazon.com/images/M/MV5BZmNjZWI3NzktYWI1Mi00OTAyLWJkNTYtMzUwYTFlZDA0Y2UwXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
          "date": "2008",
          "author": ""
        },
        {
          "name": "The Hurt Locker",
          "img": "https://m.media-amazon.com/images/M/MV5BYWYxZjU2MmQtMmMzYi00ZWUwLTg2ZWQtMDExZTVlYjM3ZWM1XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
          "date": "2008",
          "author": ""
        },
        {
          "name": "The King's Speech",
          "img": "https://m.media-amazon.com/images/M/MV5BMzU5MjEwMTg2Nl5BMl5BanBnXkFtZTcwNzM3MTYxNA@@._V1_SX300.jpg",
          "date": "2010",
          "author": ""
        },
        {
          "name": "The Artist",
          "img": "https://m.media-amazon.com/images/M/MV5BNzYxMjBkNzAtY2M2YS00YjRhLTgzOTYtY2FiOGM2OTBlZjdiXkEyXkFqcGdeQXVyMTU3NDU4MDg2._V1_SX300.jpg",
          "date": "2011",
          "author": ""
        },
        {
          "name": "Argo",
          "img": "https://m.media-amazon.com/images/M/MV5BNzljNjY3MDYtYzc0Ni00YjU0LWIyNDUtNTE0ZDRiMGExMjZlXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
          "date": "2012",
          "author": ""
        },
        {
          "name": "12 Years a Slave",
          "img": "https://m.media-amazon.com/images/M/MV5BMjExMTEzODkyN15BMl5BanBnXkFtZTcwNTU4NTc4OQ@@._V1_SX300.jpg",
          "date": "2013",
          "author": ""
        },
        {
          "name": "Birdman or (The Unexpected Virtue of Ignorance)",
          "img": "https://m.media-amazon.com/images/M/MV5BODAzNDMxMzAxOV5BMl5BanBnXkFtZTgwMDMxMjA4MjE@._V1_SX300.jpg",
          "date": "2014",
          "author": ""
        },
        {
          "name": "Spotlight",
          "img": "https://m.media-amazon.com/images/M/MV5BMjIyOTM5OTIzNV5BMl5BanBnXkFtZTgwMDkzODE2NjE@._V1_SX300.jpg",
          "date": "2015",
          "author": ""
        },
        {
          "name": "Moonlight",
          "img": "https://m.media-amazon.com/images/M/MV5BNzQxNTIyODAxMV5BMl5BanBnXkFtZTgwNzQyMDA3OTE@._V1_SX300.jpg",
          "date": "2016",
          "author": ""
        },
        {
          "name": "The Shape of Water",
          "img": "https://m.media-amazon.com/images/M/MV5BNGNiNWQ5M2MtNGI0OC00MDA2LWI5NzEtMmZiYjVjMDEyOWYzXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SX300.jpg",
          "date": "2017",
          "author": ""
        },
        {
          "name": "Green Book",
          "img": "https://m.media-amazon.com/images/M/MV5BYzIzYmJlYTYtNGNiYy00N2EwLTk4ZjItMGYyZTJiOTVkM2RlXkEyXkFqcGdeQXVyODY1NDk1NjE@._V1_SX300.jpg",
          "date": "2018",
          "author": ""
        },
        {
          "name": "Parasite",
          "img": "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
          "date": "2019",
          "author": ""
        },
        {
          "name": "CODA",
          "img": "https://m.media-amazon.com/images/M/MV5BYzkyNzNiMDItMGU1Yy00NmEyLWE4N2ItMjkzMDZmMmVhNDU4XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
          "date": "2021",
          "author": ""
        },
        {
          "name": "Everything Everywhere All at Once",
          "img": "https://m.media-amazon.com/images/M/MV5BYTdiOTIyZTQtNmQ1OS00NjZlLWIyMTgtYzk5Y2M3ZDVmMDk1XkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_SX300.jpg",
          "date": "2022",
          "author": ""
        },
        {
          "name": "Oppenheimer",
          "img": "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
          "date": "2023",
          "author": ""
        }
      ],
      "id": 11
    },
    {
      "templateName": "Top series de HBO",
      "category": "series",
      "contestants": [
        {
          "name": "The Sopranos",
          "img": "https://m.media-amazon.com/images/M/MV5BZTZkMWVkNTEtYzMxMC00MzQzLTg5NjUtNTNmN2M2NzEwNzI0XkEyXkFqcGdeQXVyMTY3MDE5MDY1._V1_SX300.jpg",
          "date": "1999–2007",
          "author": ""
        },
        {
          "name": "The Wire",
          "img": "https://m.media-amazon.com/images/M/MV5BZmY5ZDMxODEtNWIwOS00NjdkLTkyMjktNWRjMDhmYjJjN2RmXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
          "date": "2002–2008",
          "author": ""
        },
        {
          "name": "Game of Thrones",
          "img": "https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg",
          "date": "2011–2019",
          "author": ""
        },
        {
          "name": "Sex and the City",
          "img": "https://m.media-amazon.com/images/M/MV5BNGEyNDRjM2QtY2VlYy00OWRhLWI4N2UtZTM4NDc0MGM0YzBkXkEyXkFqcGdeQXVyNjk1Njg5NTA@._V1_SX300.jpg",
          "date": "1998–2004",
          "author": ""
        },
        {
          "name": "Silicon Valley",
          "img": "https://m.media-amazon.com/images/M/MV5BM2Q5YjNjZWMtYThmYy00N2ZjLWE2NDctNmZjMmZjYWE2NjEwXkEyXkFqcGdeQXVyMTAzMDM4MjM0._V1_SX300.jpg",
          "date": "2014–2019",
          "author": ""
        },
        {
          "name": "True Detective",
          "img": "https://m.media-amazon.com/images/M/MV5BNTEzMzBiNGYtYThiZS00MzBjLTk5ZWItM2FmMzU3Y2RjYTVlXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SX300.jpg",
          "date": "2014–",
          "author": ""
        },
        {
          "name": "The Last of Us",
          "img": "https://m.media-amazon.com/images/M/MV5BZGUzYTI3M2EtZmM0Yy00NGUyLWI4ODEtN2Q3ZGJlYzhhZjU3XkEyXkFqcGdeQXVyNTM0OTY1OQ@@._V1_SX300.jpg",
          "date": "2023–",
          "author": ""
        },
        {
          "name": "Watchmen",
          "img": "https://m.media-amazon.com/images/M/MV5BOWU3ODM4ZTEtNjI5Ni00ODc0LTg3MTctOTNmZDVkNzU5YzA3XkEyXkFqcGdeQXVyNTI2MzI4NTU@._V1_SX300.jpg",
          "date": "2019",
          "author": ""
        },
        {
          "name": "Succession",
          "img": "https://m.media-amazon.com/images/M/MV5BODY5YjA3ZDgtM2EwYy00ZGVmLWFhNWItMTMxMWRkMWFiOTlkXkEyXkFqcGdeQXVyMTMzNDExODE5._V1_SX300.jpg",
          "date": "2018–2023",
          "author": ""
        },
        {
          "name": "House of the Dragon",
          "img": "https://m.media-amazon.com/images/M/MV5BM2QzMGVkNjUtN2Y4Yi00ODMwLTg3YzktYzUxYjJlNjFjNDY1XkEyXkFqcGc@._V1_SX300.jpg",
          "date": "2022–",
          "author": ""
        },
        {
          "name": "Euphoria",
          "img": "https://m.media-amazon.com/images/M/MV5BMDMzZDkyNzEtYTY5Ni00NzlhLWI4MzUtY2UzNjNmMjI1YzIzXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg",
          "date": "2019–",
          "author": ""
        },
        {
          "name": "The Leftovers",
          "img": "https://m.media-amazon.com/images/M/MV5BNTE3MDc1MjY4NV5BMl5BanBnXkFtZTgwMDg4MjQ4MTE@._V1_SX300.jpg",
          "date": "2014–2017",
          "author": ""
        }
      ],
      "id": 12
    },
    {
      "templateName": "Cuál es el mejor Shonen de batalla?",
      "category": "anime",
      "contestants": [
        {
          "name": "Dragon Ball Z",
          "date": "1989",
          "img": "https://cdn.myanimelist.net/images/anime/1277/142022.jpg",
          "author": "Toei Animation"
        },
        {
          "name": "Naruto",
          "date": "2002",
          "img": "https://cdn.myanimelist.net/images/anime/1141/142503.jpg",
          "author": "Pierrot"
        },
        {
          "name": "One Piece",
          "date": "1999",
          "img": "https://cdn.myanimelist.net/images/anime/1244/138851.jpg",
          "author": "Toei Animation"
        },
        {
          "name": "Bleach",
          "date": "2004",
          "img": "https://cdn.myanimelist.net/images/anime/3/40451.jpg",
          "author": "Pierrot"
        },
        {
          "name": "Yuu☆Yuu☆Hakusho",
          "date": "1992",
          "img": "https://cdn.myanimelist.net/images/anime/1228/111372.jpg",
          "author": "Pierrot"
        },
        {
          "name": "Hunter x Hunter (2011)",
          "date": "2011",
          "img": "https://cdn.myanimelist.net/images/anime/1337/99013.jpg",
          "author": "Madhouse"
        },
        {
          "name": "Kimetsu no Yaiba",
          "date": "2019",
          "img": "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
          "author": "ufotable"
        },
        {
          "name": "Jujutsu Kaisen",
          "date": "2020",
          "img": "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
          "author": "MAPPA"
        },
        {
          "name": "Boku no Hero Academia",
          "date": "2016",
          "img": "https://cdn.myanimelist.net/images/anime/10/78745.jpg",
          "author": "Bones"
        },
        {
          "name": "Black Clover",
          "date": "2017",
          "img": "https://cdn.myanimelist.net/images/anime/2/88336.jpg",
          "author": "Pierrot"
        },
        {
          "name": "Nanatsu no Taizai",
          "date": "2014",
          "img": "https://cdn.myanimelist.net/images/anime/8/65409.jpg",
          "author": "A-1 Pictures"
        },
        {
          "name": "Fairy Tail",
          "date": "2009",
          "img": "https://cdn.myanimelist.net/images/anime/5/18179.jpg",
          "author": "Satelight"
        },
        {
          "name": "JoJo no Kimyou na Bouken Part 3: Stardust Crusaders 2nd Season",
          "date": "2015",
          "img": "https://cdn.myanimelist.net/images/anime/11/75045.jpg",
          "author": "David Production"
        },
        {
          "name": "Enen no Shouboutai",
          "date": "2019",
          "img": "https://cdn.myanimelist.net/images/anime/1664/103275.jpg",
          "author": "David Production"
        },
        {
          "name": "Mob Psycho 100",
          "date": "2016",
          "img": "https://cdn.myanimelist.net/images/anime/8/80356.jpg",
          "author": "Bones"
        },
        {
          "name": "Fullmetal Alchemist: Brotherhood",
          "date": "2009",
          "img": "https://cdn.myanimelist.net/images/anime/1208/94745.jpg",
          "author": "Bones"
        }
      ],
      "id": 13
    },
    {
      "templateName": "El mejor disco de hip-hop (Clásicos y modernos)",
      "category": "albums",
      "contestants": [
        {
          "name": "Ready to Die",
          "author": "The Notorious B.I.G.",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/30d08ef0c53a4f6ea7c323b086a7b5ed.png"
        },
        {
          "name": "Stankonia",
          "author": "OutKast",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/28229f48f77f2c5f648055c3b6273099.png"
        },
        {
          "name": "The Blueprint",
          "author": "Jay-Z",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/49362c4c015bbe093a8401e223bf5149.png"
        },
        {
          "name": "To Pimp a Butterfly",
          "author": "Kendrick Lamar",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/86b35c4eb3c479da49c915d8771bbd1a.png"
        },
        {
          "name": "My Beautiful Dark Twisted Fantasy",
          "author": "Kanye West",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/8a071c4b073625018de5f0ac58727511.png"
        },
        {
          "name": "Enter the Wu-Tang (36 Chambers)",
          "author": "Wu-Tang Clan",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/c95372b82e09e3b8f441bc6a89eeb9c1.png"
        },
        {
          "name": "The Low End Theory",
          "author": "A Tribe Called Quest",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/9ab8ee8d7a7ff8bfb0c00afb89a38c16.png"
        },
        {
          "name": "The Miseducation Of Lauryn Hill",
          "author": "Ms. Lauryn Hill",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/2f5034a01b4098f50c7859912b18e233.png"
        },
        {
          "name": "Take Care",
          "author": "Drake",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/87079d08fe90541db827b7ddd08a30c7.png"
        },
        {
          "name": "2001",
          "author": "Dr. Dre",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/d8a6417d7c1d30ed4a211bdceb0e8cf9.png"
        },
        {
          "name": "Invasion Of Privacy",
          "author": "Cardi B",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/e75d6a3d4a858d9617cbbd4c653416e1.png"
        },
        {
          "name": "Madvillainy",
          "author": "Madvillain",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/893fce336634c600b2bab31de7bbc9bd.png"
        },
        {
          "name": "DS2",
          "author": "Future",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/07d33207ea692f56516a17f1be670683.png"
        },
        {
          "name": "Illmatic",
          "author": "Nas",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/8dce63c224a643b78b39caeb27aadf8b.png"
        },
        {
          "name": "The Marshall Mathers LP",
          "author": "Eminem",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/a38c6a72117f413ec11534c214947b13.png"
        },
        {
          "name": "Aquemini",
          "author": "OutKast",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/d525b9724ca5ccbb3aebf48918bd632b.png"
        },
        {
          "name": "All Eyez on Me",
          "author": "2Pac",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/8bd696cbd4aa4d4eb6d35393232f55e4.png"
        },
        {
          "name": "Paul's Boutique",
          "author": "Beastie Boys",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/95934412225606fabf370de5f7d7e02e.png"
        },
        {
          "name": "3 Feet High & Rising",
          "author": "De La Soul",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/f0a4858e2e934ec3901eb6ac272f6ce7.png"
        },
        {
          "name": "Doggystyle",
          "author": "Snoop Dogg",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/1f56d238345e49e8c9906e892984c187.png"
        },
        {
          "name": "Acid Rap",
          "author": "Chance the Rapper",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/728667fa86834854c88d6cfd5b7de594.png"
        },
        {
          "name": "good kid, m.A.A.d city",
          "author": "Kendrick Lamar",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/48628c6af67db437b0b9ff156b2c1085.png"
        },
        {
          "name": "The Chronic",
          "author": "Dr. Dre",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/6d49060026f44d69cd67a7cffa6e3092.png"
        },
        {
          "name": "The College Dropout",
          "author": "Kanye West",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/61d5e94c9aa712b29e283325bc5ae87f.png"
        },
        {
          "name": "RUN-DMC",
          "author": "Run-D.M.C.",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/d608b8f515128a97ff51e79dba75ea7c.png"
        },
        {
          "name": "Mama Said Knock You Out",
          "author": "LL Cool J",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/94ee18b1bad5a6b65ee8abefec2166f2.png"
        },
        {
          "name": "Donuts",
          "author": "J Dilla",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/8f5eb95d8de4652a2b8d5b5e26719a22.png"
        },
        {
          "name": "Straight Outta Compton",
          "author": "N.W.A.",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/dc504dbf0d2e442d8f69ddc6148a43b5.png"
        },
        {
          "name": "Hot, Cool & Vicious",
          "author": "Salt-N-Pepa",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/53a63ab368e7352df7e7aee1aa8e39df.png"
        },
        {
          "name": "Culture",
          "author": "Migos",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/15522d0175145dbea00c553c7bd338f1.png"
        },
        {
          "name": "Midnight Marauders",
          "author": "A Tribe Called Quest",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/b7cee68317254937c1612322f8faf796.png"
        },
        {
          "name": "Room 25",
          "author": "NoName",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/11147bae290d4f34ad724d6406ef6b7a.png"
        },
        {
          "name": "Licensed to Ill",
          "author": "Beastie Boys",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/19ddf1d0392ef60551b836dd5ba3c94e.png"
        },
        {
          "name": "AmeriKKKa's Most Wanted",
          "author": "Ice Cube",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/ef1aa597670c9900a678c08205d5e986.png"
        },
        {
          "name": "Life After Death",
          "author": "The Notorious B.I.G.",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/c3665b255284482d956cb73aa1dd00e8.png"
        },
        {
          "name": "DAMN.",
          "author": "Kendrick Lamar",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/8a59ed3a9c71cb5113325e2026889e4a.png"
        },
        {
          "name": "Operation: Doomsday",
          "author": "MF DOOM",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/5520cd4c7fff46bbe8baaa1fd31a9867.png"
        },
        {
          "name": "Get Rich Or Die Tryin'",
          "author": "50 Cent",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/64a0380297074b359ae77c3ea8f1cdd2.png"
        },
        {
          "name": "Fear of a Black Planet",
          "author": "Public Enemy",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/a3c29d3ad50b4d0da35eb6c95c5f1ef2.png"
        },
        {
          "name": "Fever",
          "author": "Megan Thee Stallion",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/7f04d506db621910d4a345c25f65bd61.png"
        },
        {
          "name": "Watch The Throne",
          "author": "Jay-Z",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/9214d5c1bdd0b4be8af01192eae7401d.png"
        },
        {
          "name": "Some Rap Songs",
          "author": "Earl Sweatshirt, Standing On The Corner",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/4069a1ed2dc94400989100f18b92266f.png"
        },
        {
          "name": "Flower Boy",
          "author": "Tyler, the Creator",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/8598727f88a5b52d53b843a9c4b6f2dd.png"
        },
        {
          "name": "The Great Adventures of Slick Rick",
          "author": "Slick Rick",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/dee78af76ed1450a86245bfe3479ac99.png"
        },
        {
          "name": "The Slim Shady LP",
          "author": "Eminem",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/6b71796a5a734c2f97a0daddd12115fe.png"
        },
        {
          "name": "Man on the Moon: The End of Day",
          "author": "Kid Cudi",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/8ca0fd6e84a14317a7d21eaebc81320a.png"
        },
        {
          "name": "Black On Both Sides",
          "author": "Mos Def",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/12098b07c2774f8ccf8fa2f7b5b832e3.png"
        },
        {
          "name": "Coloring Book",
          "author": "Chance the Rapper",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/15b37232ffad3490370868c68f76c730.png"
        },
        {
          "name": "DAYTONA",
          "author": "Pusha T",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/15df301898a48aa2a8c13632e38f6ca9.png"
        },
        {
          "name": "People's Instinctive Travels and the Paths of Rhythm",
          "author": "A Tribe Called Quest",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/0d8ec317039ed406e69437d1e9028f79.png"
        },
        {
          "name": "Speakerboxxx/ The Love Below",
          "author": "OutKast",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/28243384aefb4220a56513d95dbbe7b2.png"
        },
        {
          "name": "If You're Reading This It's Too Late",
          "author": "Drake",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/89117b736cebb7b4c129e37d3e94c340.png"
        },
        {
          "name": "2014 Forest Hills Drive",
          "author": "J. Cole",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/1e35fab5d284a3e5b7b54596227f2c2e.png"
        },
        {
          "name": "Planet Her",
          "author": "Doja Cat",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/2321c0b23c484ab566746c0dddfc777b.png"
        },
        {
          "name": "It Was Written",
          "author": "Nas",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/6f31f2812b854b228bf9f03f4c0cbf28.png"
        },
        {
          "name": "Be",
          "author": "Common",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/f3ae3b066c4e97e51a8363321f73d889.png"
        },
        {
          "name": "Run the Jewels 2",
          "author": "Run the Jewels",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/5591506667b045aac54e13f41def97b2.png"
        },
        {
          "name": "MONTERO",
          "author": "Lil Nas X",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/2d4c04914fe4eac2ebf5363c7dad0d0c.png"
        },
        {
          "name": "Saturation III",
          "author": "BROCKHAMPTON",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/d6fdbf180b3432a2d7672aaa35749ce7.png"
        },
        {
          "name": "Saturation II",
          "author": "BROCKHAMPTON",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/5c50b8fb0d6073befc75e62e3aa938cf.png"
        },
        {
          "name": "Eazy-Duz-It",
          "author": "Eazy-E",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/21371b8b61b144c05f13695743c2f7b5.png"
        },
        {
          "name": "Because the Internet",
          "author": "Childish Gambino",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/0f636525495f1458c7c55f238eb8e27d.png"
        },
        {
          "name": "Swimming",
          "author": "Mac Miller",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/4ffccd2c839f30143a348dbcc57f5522.png"
        },
        {
          "name": "ASTROWORLD",
          "author": "Travis Scott",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/4386a469e620103f8436b3e969075959.png"
        }
      ],
      "id": 14
    },
    {
      "templateName": "Best of Pink Floyd",
      "category": "albums",
      "contestants": [
        {
          "name": "Ummagumma",
          "author": "Pink Floyd",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/8a6081bf37b112bc22a1691791db73f4.png"
        },
        {
          "name": "Atom Heart Mother",
          "author": "Pink Floyd",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/d5c32bd61b744deccd79d60d793becf5.png"
        },
        {
          "name": "Meddle",
          "author": "Pink Floyd",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/55dc29cfc3264ee3cee981181ddead2a.png"
        },
        {
          "name": "Obscured by Clouds",
          "author": "Pink Floyd",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/66092948eafe43ffc331bfd6f13c875a.png"
        },
        {
          "name": "The Dark Side Of The Moon",
          "author": "Pink Floyd",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/d4bdd038cacbec705e269edb0fd38419.png"
        },
        {
          "name": "Wish You Were Here",
          "author": "Pink Floyd",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/394cfbc6b2a74766a4364778c641ca51.png"
        },
        {
          "name": "Animals",
          "author": "Pink Floyd",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/903616162a8a4f1ca1ac63497e551c07.png"
        },
        {
          "name": "The Wall",
          "author": "Pink Floyd",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/9df683f1e084692ef7764076323ad3f8.png"
        },
        {
          "name": "The Final Cut",
          "author": "Pink Floyd",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/dda5563fd9b0e9131bbc90836638494a.png"
        },
        {
          "name": "A Momentary Lapse of Reason",
          "author": "Pink Floyd",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/c93ba7040cd94cafccc9d80d30cd9259.png"
        },
        {
          "name": "The Division Bell",
          "author": "Pink Floyd",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/322025b870b64e8cced4e68728238022.png"
        },
        {
          "name": "The Endless River",
          "author": "Pink Floyd",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/9c96e92b6b494f95cf278ad5c6b36d7e.png"
        }
      ],
      "id": 15
    },
    {
      "templateName": "Clásicos de los 2000's",
      "category": "albums",
      "contestants": [
        {
          "name": "Kid A",
          "author": "Radiohead",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/2ed343318c844d19cd897ec67fad11c4.png"
        },
        {
          "name": "Is This It",
          "author": "The Strokes",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/29c98431ed68a10f110cf47c89f174b3.png"
        },
        {
          "name": "Elephant",
          "author": "The White Stripes",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/8a06f79b16db7d90add1e4cb9afcd5c4.png"
        },
        {
          "name": "Modern Times",
          "author": "Bob Dylan",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/531c17bc256597b56c3082780f8c0b00.png"
        },
        {
          "name": "Sound Of Silver",
          "author": "LCD Soundsystem",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/62e79d7331b34ea9ced494570a2fe797.png"
        },
        {
          "name": "All That You Can't Leave Behind",
          "author": "U2",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/08903e8de53947859fbac649e3d011e1.png"
        },
        {
          "name": "A Rush of Blood to the Head",
          "author": "Coldplay",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/3d3d6d2b41544f42b8f750b6abdbd180.png"
        },
        {
          "name": "American Idiot",
          "author": "Green Day",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/5bcb675866706c229ad9f77188b8ac44.png"
        },
        {
          "name": "In Rainbows",
          "author": "Radiohead",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/9dbcd9399ac3e622b4f508323155b644.png"
        },
        {
          "name": "Discovery",
          "author": "Daft Punk",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/1340e9e1082cf0dc748583b7eefce6d5.png"
        },
        {
          "name": "Figure 8",
          "author": "Elliott Smith",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/ae904af5b6dc42fcc230582cdda2c304.png"
        },
        {
          "name": "Hot Fuss",
          "author": "The Killers",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/fae9c99bbb6ae827b508a97328551912.png"
        },
        {
          "name": "Toxicity",
          "author": "System of a Down",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/faa79372c53139010902e67938ccf78e.png"
        },
        {
          "name": "Graduation",
          "author": "Kanye West",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/8ddd1959a2bef460a5149b3e0cf5e18a.png"
        },
        {
          "name": "Stadium Arcadium",
          "author": "Red Hot Chili Peppers",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/fb7d1a6c6e5240c48159d08b17ea022b.png"
        },
        {
          "name": "Viva la Vida",
          "author": "Coldplay",
          "date": "",
          "img": "https://lastfm.freetls.fastly.net/i/u/300x300/612dcc8aeb13634b5fadee3f47f9abb0.png"
        }
      ],
      "id": 16
    },
    {
      "templateName": "¿Cuál fue la mejor Spider-Man?",
      "category": "movie",
      "contestants": [
        {
          "name": "Spider-Man",
          "img": "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg",
          "date": "2002",
          "author": ""
        },
        {
          "name": "Spider-Man 2",
          "img": "https://m.media-amazon.com/images/M/MV5BMzY2ODk4NmUtOTVmNi00ZTdkLTlmOWYtMmE2OWVhNTU2OTVkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
          "date": "2004",
          "author": ""
        },
        {
          "name": "Spider-Man 3",
          "img": "https://m.media-amazon.com/images/M/MV5BYTk3MDljOWQtNGI2My00OTEzLTlhYjQtOTQ4ODM2MzUwY2IwXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
          "date": "2007",
          "author": ""
        },
        {
          "name": "The Amazing Spider-Man",
          "img": "https://m.media-amazon.com/images/M/MV5BMjMyOTM4MDMxNV5BMl5BanBnXkFtZTcwNjIyNzExOA@@._V1_SX300.jpg",
          "date": "2012",
          "author": ""
        },
        {
          "name": "The Amazing Spider-Man 2",
          "img": "https://m.media-amazon.com/images/M/MV5BOTA5NDYxNTg0OV5BMl5BanBnXkFtZTgwODE5NzU1MTE@._V1_SX300.jpg",
          "date": "2014",
          "author": ""
        },
        {
          "name": "Spider-Man: Homecoming",
          "img": "https://m.media-amazon.com/images/M/MV5BODY2MTAzOTQ4M15BMl5BanBnXkFtZTgwNzg5MTE0MjI@._V1_SX300.jpg",
          "date": "2017",
          "author": ""
        },
        {
          "name": "Spider-Man: Far from Home",
          "img": "https://m.media-amazon.com/images/M/MV5BODA5MTY0OWUtNjdlOC00NDI5LWE3NjYtNDM4MDI2MzE4OWUxXkEyXkFqcGdeQXVyOTAzODkzMjI@._V1_SX300.jpg",
          "date": "2019",
          "author": ""
        },
        {
          "name": "Spider-Man: No Way Home",
          "img": "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg",
          "date": "2021",
          "author": ""
        }
      ],
      "id": 17
    },
    {
      "templateName": "Torneo: La mejor parte de JoJo's",
      "category": "manga",
      "contestants": [
        {
          "name": "JoJo no Kimyou na Bouken Part 2: Sentou Chouryuu",
          "date": "1987",
          "img": "https://cdn.myanimelist.net/images/manga/2/269908.jpg",
          "author": "Araki, Hirohiko",
          "id": 2,
          "tournamentsPlayed": 1,
          "matchesPlayed": 1
        },
        {
          "name": "JoJo no Kimyou na Bouken Part 7: Steel Ball Run",
          "date": "2004",
          "img": "https://cdn.myanimelist.net/images/manga/3/179882.jpg",
          "author": "Araki, Hirohiko",
          "id": 7,
          "tournamentsPlayed": 1,
          "matchesPlayed": 3,
          "matchesWon": 3,
          "tournamentsWon": 1
        },
        {
          "name": "JoJo no Kimyou na Bouken Part 3: Stardust Crusaders",
          "date": "1989",
          "img": "https://cdn.myanimelist.net/images/manga/3/269909.jpg",
          "author": "Araki, Hirohiko",
          "id": 3,
          "tournamentsPlayed": 1,
          "matchesPlayed": 1
        },
        {
          "name": "JoJo no Kimyou na Bouken Part 6: Stone Ocean",
          "date": "1999",
          "img": "https://cdn.myanimelist.net/images/manga/2/255379.jpg",
          "author": "Araki, Hirohiko",
          "id": 6,
          "tournamentsPlayed": 1,
          "matchesPlayed": 3,
          "matchesWon": 2
        },
        {
          "name": "JoJo no Kimyou na Bouken Part 4: Diamond wa Kudakenai",
          "date": "1992",
          "img": "https://cdn.myanimelist.net/images/manga/3/269910.jpg",
          "author": "Araki, Hirohiko",
          "id": 4,
          "tournamentsPlayed": 1,
          "matchesPlayed": 2,
          "matchesWon": 1
        },
        {
          "name": "JoJo no Kimyou na Bouken Part 5: Ougon no Kaze",
          "date": "1995",
          "img": "https://cdn.myanimelist.net/images/manga/1/269912.jpg",
          "author": "Araki, Hirohiko",
          "id": 5,
          "tournamentsPlayed": 1,
          "matchesPlayed": 1
        },
        {
          "name": "JoJo no Kimyou na Bouken Part 8: JoJolion",
          "date": "2011",
          "img": "https://cdn.myanimelist.net/images/manga/1/179885.jpg",
          "author": "Araki, Hirohiko",
          "id": 8,
          "tournamentsPlayed": 1,
          "matchesPlayed": 2,
          "matchesWon": 1
        },
        {
          "name": "JoJo no Kimyou na Bouken Part 1: Phantom Blood",
          "date": "1986",
          "img": "https://cdn.myanimelist.net/images/manga/2/269907.jpg",
          "author": "Araki, Hirohiko",
          "id": 1,
          "tournamentsPlayed": 1,
          "matchesPlayed": 1
        }
      ],
      "id": 18,
      "timesPlayed": 1
    },
    {
      "templateName": "Ranking de peliculas de Studio Ghibli",
      "category": "anime",
      "contestants": [
        {
          "name": "Kaze no Tani no Nausicaä",
          "date": "1984",
          "img": "https://cdn.myanimelist.net/images/anime/10/75914.jpg",
          "author": "Topcraft"
        },
        {
          "name": "Tenkuu no Shiro Laputa",
          "date": "1986",
          "img": "https://cdn.myanimelist.net/images/anime/5/37799.jpg",
          "author": "Studio Ghibli"
        },
        {
          "name": "Tonari no Totoro",
          "date": "1988",
          "img": "https://cdn.myanimelist.net/images/anime/4/75923.jpg",
          "author": "Studio Ghibli"
        },
        {
          "name": "Hotaru no Haka",
          "date": "1988",
          "img": "https://cdn.myanimelist.net/images/anime/1485/141208.jpg",
          "author": "Studio Ghibli"
        },
        {
          "name": "Majo no Takkyuubin",
          "date": "1989",
          "img": "https://cdn.myanimelist.net/images/anime/1579/140483.jpg",
          "author": "Studio Ghibli"
        },
        {
          "name": "Omoide Poroporo",
          "date": "1991",
          "img": "https://cdn.myanimelist.net/images/anime/1289/138708.jpg",
          "author": "Studio Ghibli"
        },
        {
          "name": "Kurenai no Buta",
          "date": "1992",
          "img": "https://cdn.myanimelist.net/images/anime/1728/138709.jpg",
          "author": "Studio Ghibli"
        },
        {
          "name": "Umi ga Kikoeru",
          "date": "1993",
          "img": "https://cdn.myanimelist.net/images/anime/1498/131411.jpg",
          "author": "Studio Ghibli"
        },
        {
          "name": "Mimi wo Sumaseba",
          "date": "1995",
          "img": "https://cdn.myanimelist.net/images/anime/1764/138714.jpg",
          "author": "Studio Ghibli"
        },
        {
          "name": "Mononoke Hime",
          "date": "1997",
          "img": "https://cdn.myanimelist.net/images/anime/7/75919.jpg",
          "author": "Studio Ghibli"
        },
        {
          "name": "Sen to Chihiro no Kamikakushi",
          "date": "2001",
          "img": "https://cdn.myanimelist.net/images/anime/6/79597.jpg",
          "author": "Studio Ghibli"
        },
        {
          "name": "Neko no Ongaeshi",
          "date": "2002",
          "img": "https://cdn.myanimelist.net/images/anime/1176/138720.jpg",
          "author": "Studio Ghibli"
        },
        {
          "name": "Howl no Ugoku Shiro",
          "date": "2004",
          "img": "https://cdn.myanimelist.net/images/anime/1470/138723.jpg",
          "author": "Studio Ghibli"
        },
        {
          "name": "Gake no Ue no Ponyo",
          "date": "2008",
          "img": "https://cdn.myanimelist.net/images/anime/1331/138727.jpg",
          "author": "Studio Ghibli"
        },
        {
          "name": "Karigurashi no Arrietty",
          "date": "2010",
          "img": "https://cdn.myanimelist.net/images/anime/1974/116417.jpg",
          "author": "Studio Ghibli"
        },
        {
          "name": "Coquelicot-zaka kara",
          "date": "2011",
          "img": "https://cdn.myanimelist.net/images/anime/8/32547.jpg",
          "author": "Studio Ghibli"
        },
        {
          "name": "Kaze Tachinu",
          "date": "2013",
          "img": "https://cdn.myanimelist.net/images/anime/8/52353.jpg",
          "author": "Studio Ghibli"
        },
        {
          "name": "Kaguya-hime no Monogatari",
          "date": "2013",
          "img": "https://cdn.myanimelist.net/images/anime/1935/93606.jpg",
          "author": "Studio Ghibli"
        },
        {
          "name": "Omoide no Marnie",
          "date": "2014",
          "img": "https://cdn.myanimelist.net/images/anime/7/64293.jpg",
          "author": "Studio Ghibli"
        },
        {
          "name": "Aya to Majo",
          "date": "2020",
          "img": "https://cdn.myanimelist.net/images/anime/1242/110170.jpg",
          "author": "Studio Ghibli"
        }
      ],
      "id": 19
    },
    {
      "templateName": "¿Qué anime tiene los fans más molestos?",
      "category": "anime",
      "contestants": [
        {
          "name": "Boku no Hero Academia",
          "date": "2016",
          "img": "https://cdn.myanimelist.net/images/anime/10/78745.jpg",
          "author": "Bones"
        },
        {
          "name": "Shingeki no Kyojin: The Final Season Part 2",
          "date": "2022",
          "img": "https://cdn.myanimelist.net/images/anime/1948/120625.jpg",
          "author": "MAPPA"
        },
        {
          "name": "Chainsaw Man",
          "date": "2022",
          "img": "https://cdn.myanimelist.net/images/anime/1806/126216.jpg",
          "author": "MAPPA"
        },
        {
          "name": "JoJo no Kimyou na Bouken (TV)",
          "date": "2012",
          "img": "https://cdn.myanimelist.net/images/anime/3/40409.jpg",
          "author": "David Production"
        },
        {
          "name": "Shinseiki Evangelion Movie: Air/Magokoro wo, Kimi ni",
          "date": "1997",
          "img": "https://cdn.myanimelist.net/images/anime/1404/98182.jpg",
          "author": "Gainax"
        },
        {
          "name": "Jujutsu Kaisen",
          "date": "2020",
          "img": "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
          "author": "MAPPA"
        },
        {
          "name": "Kimetsu no Yaiba",
          "date": "2019",
          "img": "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
          "author": "ufotable"
        },
        {
          "name": "One Piece",
          "date": "1999",
          "img": "https://cdn.myanimelist.net/images/anime/1244/138851.jpg",
          "author": "Toei Animation"
        },
        {
          "name": "Dragon Ball Super",
          "date": "2015",
          "img": "https://cdn.myanimelist.net/images/anime/7/74606.jpg",
          "author": "Toei Animation"
        },
        {
          "name": "Re:Zero kara Hajimeru Isekai Seikatsu",
          "date": "2016",
          "img": "https://cdn.myanimelist.net/images/anime/1522/128039.jpg",
          "author": "White Fox"
        }
      ],
      "id": 20
    },
    {
      "templateName": "Top 16 Manga Ranking en MyAnimeList",
      "category": "manga",
      "contestants": [
        {
          "name": "Berserk",
          "date": "1989",
          "img": "https://cdn.myanimelist.net/images/manga/1/157897.jpg",
          "author": "Miura, Kentarou"
        },
        {
          "name": "JoJo no Kimyou na Bouken Part 7: Steel Ball Run",
          "date": "2004",
          "img": "https://cdn.myanimelist.net/images/manga/3/179882.jpg",
          "author": "Araki, Hirohiko"
        },
        {
          "name": "Vagabond",
          "date": "1998",
          "img": "https://cdn.myanimelist.net/images/manga/1/259070.jpg",
          "author": "Inoue, Takehiko"
        },
        {
          "name": "One Piece",
          "date": "1997",
          "img": "https://cdn.myanimelist.net/images/manga/2/253146.jpg",
          "author": "Oda, Eiichiro"
        },
        {
          "name": "Monster",
          "date": "1994",
          "img": "https://cdn.myanimelist.net/images/manga/3/258224.jpg",
          "author": "Urasawa, Naoki"
        },
        {
          "name": "Slam Dunk",
          "date": "1990",
          "img": "https://cdn.myanimelist.net/images/manga/2/258749.jpg",
          "author": "Inoue, Takehiko"
        },
        {
          "name": "Vinland Saga",
          "date": "2005",
          "img": "https://cdn.myanimelist.net/images/manga/2/188925.jpg",
          "author": "Yukimura, Makoto"
        },
        {
          "name": "Fullmetal Alchemist",
          "date": "2001",
          "img": "https://cdn.myanimelist.net/images/manga/3/243675.jpg",
          "author": "Arakawa, Hiromu"
        },
        {
          "name": "Grand Blue",
          "date": "2014",
          "img": "https://cdn.myanimelist.net/images/manga/2/166124.jpg",
          "author": "Inoue, Kenji"
        },
        {
          "name": "Oyasumi Punpun",
          "date": "2007",
          "img": "https://cdn.myanimelist.net/images/manga/3/266834.jpg",
          "author": "Asano, Inio"
        },
        {
          "name": "Kingdom",
          "date": "2006",
          "img": "https://cdn.myanimelist.net/images/manga/2/171872.jpg",
          "author": "Hara, Yasuhisa"
        },
        {
          "name": "Houseki no Kuni",
          "date": "2012",
          "img": "https://cdn.myanimelist.net/images/manga/1/115443.jpg",
          "author": "Ichikawa, Haruko"
        },
        {
          "name": "20th Century Boys",
          "date": "1999",
          "img": "https://cdn.myanimelist.net/images/manga/5/260006.jpg",
          "author": "Urasawa, Naoki"
        },
        {
          "name": "Real",
          "date": "1999",
          "img": "https://cdn.myanimelist.net/images/manga/2/115969.jpg",
          "author": "Inoue, Takehiko"
        },
        {
          "name": "Ashita no Joe",
          "date": "1968",
          "img": "https://cdn.myanimelist.net/images/manga/1/268827.jpg",
          "author": "Kajiwara, Ikki"
        },
        {
          "name": "Kaguya-sama wa Kokurasetai: Tensai-tachi no Renai Zunousen",
          "date": "2015",
          "img": "https://cdn.myanimelist.net/images/manga/3/188896.jpg",
          "author": "Akasaka, Aka"
        }
      ],
      "id": 21
    },
    {
      "templateName": "Los mangas mejor ilustrados",
      "category": "manga",
      "contestants": [
        {
          "name": "Gantz",
          "date": "2000",
          "img": "https://cdn.myanimelist.net/images/manga/1/278020.jpg",
          "author": "Oku, Hiroya"
        },
        {
          "name": "Inuyashiki",
          "date": "2014",
          "img": "https://cdn.myanimelist.net/images/manga/2/156353.jpg",
          "author": "Oku, Hiroya"
        },
        {
          "name": "Uzumaki",
          "date": "1998",
          "img": "https://cdn.myanimelist.net/images/manga/3/185972.jpg",
          "author": "Itou, Junji"
        },
        {
          "name": "Berserk",
          "date": "1989",
          "img": "https://cdn.myanimelist.net/images/manga/1/157897.jpg",
          "author": "Miura, Kentarou"
        },
        {
          "name": "Oyasumi Punpun",
          "date": "2007",
          "img": "https://cdn.myanimelist.net/images/manga/3/266834.jpg",
          "author": "Asano, Inio"
        },
        {
          "name": "Vagabond",
          "date": "1998",
          "img": "https://cdn.myanimelist.net/images/manga/1/259070.jpg",
          "author": "Inoue, Takehiko"
        },
        {
          "name": "One Punch-Man",
          "date": "2012",
          "img": "https://cdn.myanimelist.net/images/manga/3/80661.jpg",
          "author": "Murata, Yusuke"
        },
        {
          "name": "Vinland Saga",
          "date": "2005",
          "img": "https://cdn.myanimelist.net/images/manga/2/188925.jpg",
          "author": "Yukimura, Makoto"
        },
        {
          "name": "Akira",
          "date": "1982",
          "img": "https://cdn.myanimelist.net/images/manga/3/271629.jpg",
          "author": "Otomo, Katsuhiro"
        },
        {
          "name": "Planetes",
          "date": "1999",
          "img": "https://cdn.myanimelist.net/images/manga/3/170572.jpg",
          "author": "Yukimura, Makoto"
        },
        {
          "name": "Dragon Ball",
          "date": "1984",
          "img": "https://cdn.myanimelist.net/images/manga/1/267793.jpg",
          "author": "Toriyama, Akira"
        }
      ],
      "id": 22
    },
    {
      "templateName": "series epicas",
      "category": "series",
      "contestants": [
        {
          "name": "Breaking Bad",
          "img": "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_SX300.jpg",
          "date": "2008–2013",
          "author": ""
        },
        {
          "name": "Better Call Saul",
          "img": "https://m.media-amazon.com/images/M/MV5BZDA4YmE0OTYtMmRmNS00Mzk2LTlhM2MtNjk4NzBjZGE1MmIyXkEyXkFqcGdeQXVyMTMzNDExODE5._V1_SX300.jpg",
          "date": "2015–2022",
          "author": ""
        },
        {
          "name": "Stranger Things",
          "img": "https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
          "date": "2016–2025",
          "author": ""
        },
        {
          "name": "The Sopranos",
          "img": "https://m.media-amazon.com/images/M/MV5BZTZkMWVkNTEtYzMxMC00MzQzLTg5NjUtNTNmN2M2NzEwNzI0XkEyXkFqcGdeQXVyMTY3MDE5MDY1._V1_SX300.jpg",
          "date": "1999–2007",
          "author": ""
        },
        {
          "name": "Lost",
          "img": "https://m.media-amazon.com/images/M/MV5BNzhlY2E5NDUtYjJjYy00ODg3LWFkZWQtYTVmMzU4ZWZmOWJkXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
          "date": "2004–2010",
          "author": ""
        },
        {
          "name": "Prison Break",
          "img": "https://m.media-amazon.com/images/M/MV5BMTg3NTkwNzAxOF5BMl5BanBnXkFtZTcwMjM1NjI5MQ@@._V1_SX300.jpg",
          "date": "2005–2017",
          "author": ""
        },
        {
          "name": "Cobra Kai",
          "img": "https://m.media-amazon.com/images/M/MV5BYWU4ZmI0NTItZjcyNy00MzQ5LThiNDQtZDZkNjg1NWUwN2RhXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg",
          "date": "2018–2025",
          "author": ""
        },
        {
          "name": "Mad Men",
          "img": "https://m.media-amazon.com/images/M/MV5BNTgxNDZlODQtNDcwOC00NWQ5LTljNWMtMDhjY2U5YTUzMTc4XkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_SX300.jpg",
          "date": "2007–2015",
          "author": ""
        }
      ],
      "id": 23
    }
  ];
}
