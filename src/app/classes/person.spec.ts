import { Person } from './person';

describe('People', () => {
  it('should create an instance', () => {
    expect(new Person('')).toBeTruthy();
  });
});
