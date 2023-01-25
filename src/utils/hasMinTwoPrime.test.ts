import { hasMinTwoPrime } from './hasMinTwoPrime';

describe('hasMinTwoPrime function', () => {
  it('returns false if input not valid', () => {
    const invalidInputs = ['test', '13asd', 'asd34'];

    expect(invalidInputs.filter(hasMinTwoPrime).length).toBe(0);
  });

  it('returns false if input number does not have at least 2 prime numbers', () => {
    const notPrimeNumbers = [4, 6, 7, 124, 8548];

    expect(notPrimeNumbers.filter(hasMinTwoPrime).length).toBe(0);
  });

  it('returns true if input number has at least 2 prime numbers', () => {
    const primeNumbers = [22, 314, 37684];

    expect(primeNumbers.every(hasMinTwoPrime)).toBeTruthy();
  });
});
