import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Person } from '../classes/person';
import { MatDialog } from '@angular/material/dialog';
import { PersonDialogComponent } from '../person-dialog/person-dialog.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})


export class PeopleListComponent implements OnInit {
  count!: number;
  people: Person[] = [];
  pageIndex: number = 0;
  isLoading: boolean = true;
  currentPageIndex: number = 0;
  previousUrl: string | null = null;
  nextUrl: string | null = null;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.apiService.getPeople(1).subscribe((res: any) => {
      this.setList(res);
    })
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

      this.people.push(person);
    }
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
      this.apiService.basicGet(prevOrNext).subscribe((res: any) => {
        this.setList(res)
        this.isLoading = false;
      });
    } else {
      console.log('Something went wrong!');
      this.isLoading = false;
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
}
