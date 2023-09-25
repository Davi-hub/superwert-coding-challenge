import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatSelectModule} from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PeopleListComponent } from './people-list/people-list.component';
import { PersonDialogComponent } from './person-dialog/person-dialog.component';
import { FilmFilterPipe } from './pipes/film-filter.pipe';
import { PlanetFilterPipe } from './pipes/planet-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PeopleListComponent,
    PersonDialogComponent,
    FilmFilterPipe,
    PlanetFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatDialogModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
