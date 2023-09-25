import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'planetFilter'
})
export class PlanetFilterPipe implements PipeTransform {
  transform(people: any[], selectedPlanet: string): any[] {
    if (!selectedPlanet || selectedPlanet === '') {
      return people;
    }
    
    return people.filter(person => {
      return person.homeworld === selectedPlanet;
    });
  }
}