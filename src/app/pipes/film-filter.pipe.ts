import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filmFilter'
})
export class FilmFilterPipe implements PipeTransform {
  transform(people: any[], selectedFilm: string): any[] {
    if (!selectedFilm || selectedFilm === '') {
      return people;
    }
    
    return people.filter(person => {
      return person.films.includes(selectedFilm);
    });
  }
}