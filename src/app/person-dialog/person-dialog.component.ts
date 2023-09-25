import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from '../classes/person';
import { ApiService } from '../services/api.service';
import { Subscription, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-person-dialog',
  templateUrl: './person-dialog.component.html',
  styleUrls: ['./person-dialog.component.scss']
})
export class PersonDialogComponent implements OnInit, OnDestroy {
  person!: Person;
  filmTitles: string[] = [];
  homeWorldName!: string;
  terrain!: string;
  climate!: string;
  
  isHwLoading: boolean = true;
  isHwNotOk: boolean = false;
  isFilmsLoading: boolean = true;
  isFilmsNotOk: boolean = false;

  spinnerValue: number = 0;

  homeWorldSubscription!: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { person: Person },
    private apiService: ApiService
  ) {
    this.person = this.data.person
  }

  ngOnInit(): void {
    this.getHomeWorld();
    this.getFilms();
  }
  
  ngOnDestroy(): void {
    if (this.homeWorldSubscription) {
      this.homeWorldSubscription.unsubscribe();
    }
  }

  getHomeWorld() {
    if (this.person.homeworld != "no data") {
      this.homeWorldSubscription = this.apiService.basicGet(this.person.homeworld).subscribe(
        (res: any) => {
          this.homeWorldName = res.name;
          this.terrain = res.terrain;
          this.climate = res.climate;
          this.isHwLoading = false;
        },
        () => {
          this.isHwNotOk = true;
          this.isHwLoading = false;
        }
      );
    }
  }

  async getFilms() {
    if (this.person.films.length > 0) {
      for (let i = 0; i < this.person.films.length; i++) {
        const film = this.person.films[i];
        try {
          const res: any = await firstValueFrom(this.apiService.basicGet(film));
          const filmTitle = res.title;
          this.filmTitles.push(filmTitle);
          this.spinnerValue = this.spinnerValue + 100/this.person.films.length;
        } catch (error) {
          this.isFilmsLoading = false;
          this.isFilmsNotOk = true;
          return;
        }
      }
      this.isFilmsLoading = false;
      this.spinnerValue = 0;
    }
  }
}
