const isPrime = (num: number) => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
};

export const hasMinTwoPrime = (input: number | string) => {
  const convertedNumber = Number(input);

  if (isNaN(convertedNumber)) {
    return false;
  }

  const numbers = convertedNumber.toString().split('').map(Number);
  let primeCount = 0;

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i; j < numbers.length; j++) {
      const numbersSum = Number(numbers.slice(i, j + 1).join(''));
      if (isPrime(numbersSum)) {
        primeCount++;
      }

      if (primeCount > 1) {
        return true;
      }
    }
  }

  return false;
};
