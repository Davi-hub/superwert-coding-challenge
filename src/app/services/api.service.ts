import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Film } from '../interfaces/film';
import { Planet } from '../interfaces/planet';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL: string = 'https://swapi.dev/api/';
  private apiUrl: string = environment.apiUrl;
  planets: Planet[] = [];
  films: Film[] = [];
  planetsPageCounter: number = 1;
  filmsPageCounter: number = 1;
  planetsAndFilmsSubject: Subject<{planets: Planet[] | null, films: Film[] | null}> = new Subject();

  constructor(private http: HttpClient) { }

  basicGet(url: string) {
    return this.http.get(url);
  }

  getPeople(pageNumber: number) {
      return this.http.get(this.baseURL + 'people/?page='+pageNumber);
  }

  searchPeopleByName(name: string) {
    return this.http.get(this.baseURL + 'people/?search=' + name)
  }

  getAllPlanets() {
    this.http.get(this.baseURL + 'planets/?page=' + this.planetsPageCounter).subscribe((res: any)=>{
      
      const planetsOnPage = res.results;
      for (let i = 0; i < planetsOnPage.length; i++) {
        const planet = planetsOnPage[i];
        const modifiedPlanet: Planet = {url: planet.url, name: planet.name};
        this.planets.push(modifiedPlanet);
      }
      if (res.next) {
        this.getAllPlanets();
        this.planetsPageCounter++
      } else {
        this.planetsAndFilmsSubject.next({planets: this.planets, films: this.films});
      }
    })
  }

  getAllFilms() {
    this.http.get(this.baseURL + 'films/?page=' + this.filmsPageCounter).subscribe((res: any)=>{
      
      const filmsOnPage = res.results;
      for (let i = 0; i < filmsOnPage.length; i++) {
        const film = filmsOnPage[i];
        const modifiedFilm: Film = {url: film.url, title: film.title};
        this.films.push(modifiedFilm);
      }
      if (res.next) {
        this.getAllFilms();
        this.filmsPageCounter++
      } else {
        this.planetsAndFilmsSubject.next({planets: this.planets, films: this.films});
      }
    })
  }

  getPersonImg(name: string) {
    const param = new URLSearchParams({
      'q': name 
    })
    return this.http.get(this.apiUrl + 'get-image?' + param.toString());
  }

  getTest() {
    this.http.get(this.apiUrl + 'test').subscribe((res: any) => alert(res.message));
  }
}
