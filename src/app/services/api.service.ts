import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL: string = 'https://swapi.dev/api/';

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
}
