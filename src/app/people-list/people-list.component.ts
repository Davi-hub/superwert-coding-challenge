import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Person } from '../classes/person';
import { MatDialog } from '@angular/material/dialog';
import { PersonDialogComponent } from '../person-dialog/person-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Film } from '../interfaces/film';
import { Planet } from '../interfaces/planet';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})


export class PeopleListComponent implements OnInit, OnDestroy {
  people: Person[] = [];
  count!: number;
  pageIndex: number = 0;
  currentPageIndex: number = 0;

  isLoading: boolean = true;
  isOptionsReady: boolean = false;

  planetOptions: Planet[] = [];
  filmOptions: Film[] = [];
  
  previousUrl: string | null = null;
  nextUrl: string | null = null;

  getPeopleSubscription!: Subscription;
  basicGetSubscription!: Subscription;

  selectedFilm: string = '';
  selectedPlanet: string = '';

  subsArray: Subscription[] =[];

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.setOptions();
    this.getPeopleSubscription = this.apiService.getPeople(1).subscribe((res: any) => {
      this.setList(res);
    });
    this.apiService.planetsAndFilmsSubject.subscribe((res: any) => {
      if (res.planets && res.films) {
        this.planetOptions = res.planets;
        this.filmOptions = res.films;
        this.isOptionsReady = true;
      }
    })
  }

  ngOnDestroy(): void {
    if (this.getPeopleSubscription) {
      this.getPeopleSubscription.unsubscribe();
    }

    if (this.basicGetSubscription) {
      this.basicGetSubscription.unsubscribe();
    }

    if (this.subsArray) {
      this.subsArray.every((subs) => subs.unsubscribe());      
    }
  }

  setList(res: any) {
    this.count = res.count;
    this.previousUrl = res.previous;
    this.nextUrl = res.next;
    this.setPeople(res.results);
    this.isLoading = false;
  }

  setPeople(listOfPeople: any[]): void {
    for (let i = 0; i < listOfPeople.length; i++) {
      const personFromRes = listOfPeople[i];
      const person = new Person(personFromRes.name);

      if (personFromRes.birth_year) {
        person.birthYear = personFromRes.birth_year;
      } else {
        person.birthYear = "no data";
      }

      if (personFromRes.height) {
        person.height = personFromRes.height;
      } else {
        person.height = "no data";
      }

      if (personFromRes.mass) {
        person.mass = personFromRes.mass;
      } else {
        person.mass = "no data";
      }

      if (personFromRes.homeworld) {
        person.homeworld = personFromRes.homeworld;
      } else {
        person.homeworld = "no data";
      }

      if (personFromRes.films) {
        person.films = personFromRes.films;
      }

      let subscription = new Subscription();
      subscription = this.apiService.getPersonImg(person.name).subscribe((res: any) => {
        person.imgSrc = res.src;
      },(error) => {
        console.log(error);
        person.imgSrc = 'https://picsum.photos/240/240';
      });

      this.subsArray.push(subscription);

      this.people.push(person);
    }
  }

  onByName(byName: string) {
    this.currentPageIndex = 0;
    this.people = [];
    this.isLoading = true;
    this.apiService.searchPeopleByName(byName).subscribe((res: any) => {
      this.setList(res);
    })
  }

  openDialog(person: Person) {
    const dialogRef = this.dialog.open(PersonDialogComponent, {
      data: {
        person: person
      }
    });
  }

  handlePageEvent(event: PageEvent) {
    this.people = [];
    this.isLoading = true;
    let prevOrNext;

    if ((+event.pageIndex + 1) > this.currentPageIndex) {
      prevOrNext = this.nextUrl;
      this.currentPageIndex++;
    } else {
      prevOrNext = this.previousUrl;
      this.currentPageIndex--;
    }

    if (prevOrNext != null) {
      this.basicGetSubscription = this.apiService.basicGet(prevOrNext).subscribe((res: any) => {
        this.setList(res)
        this.isLoading = false;
      });
    } else {
      console.log('Something went wrong!');
      this.isLoading = false;
    }
  }

  setOptions(){
    this.apiService.getAllPlanets();
    this.apiService.getAllFilms();
  }

  onPlanetOptChanged(event: MatSelectChange) { 
    this.selectedPlanet = event.value;
  }

  onFilmOptChanged(event: MatSelectChange) { 
    this.selectedFilm = event.value;
  };
}
