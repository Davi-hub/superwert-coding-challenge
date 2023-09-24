export class Person {
    imgSrc: string = '';
    birthYear: string = '';
    height: string = '';
    mass: string = '';
    homeworld: string = '';

    constructor(public name: string) {
        this.imgSrc = 'https://picsum.photos/750/600';
    }
}
