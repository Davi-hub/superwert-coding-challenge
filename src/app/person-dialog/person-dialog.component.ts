import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from '../classes/person';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-person-dialog',
  templateUrl: './person-dialog.component.html',
  styleUrls: ['./person-dialog.component.scss']
})
export class PersonDialogComponent implements OnInit{
  person!: Person;
  name!: string;
  terrain!: string;
  climate!: string;
  isLoading: boolean = true;
  isNotOk: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {person: Person},
    private apiService: ApiService
  ) {
    this.person = this.data.person
  }

  ngOnInit(): void {
    if (this.person.homeworld != "no data") {
      this.apiService.basicGet(this.person.homeworld).subscribe(
        (res: any) => {
          this.name = res.name;
          this.terrain = res.terrain;
          this.climate = res.climate;
          this.isLoading = false;
        },
        () => {
          this.isNotOk = true;
          this.isLoading = false;
        }
      );
    }
  }
}
