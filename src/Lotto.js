import ERROR from './constants/error.js';
import CustomError from './errors/error.js';
import Validator from './utils/Validator.js';

class Lotto {
  static #minNumber = 1;

  static #maxNumber = 45;

  static #length = 6;

  #numbers;

  /**
   *
   * @param {string[]} numbers
   */
  constructor(numbers) {
    this.#validate(numbers);

    this.#numbers = numbers;
  }

  get numbers() {
    return this.#numbers;
  }

  #validate(numbers) {
    this.#validateLength(numbers);
    this.#validateLottoNumbers(numbers);
    this.#validateDuplicate(numbers);
  }

  #validateLength(numbers) {
    if (numbers.length !== Lotto.#length) {
      throw CustomError.lotto(ERROR.message.lotto.length);
    }
  }

  #validateDuplicate(numbers) {
    if (new Set(numbers).size !== Lotto.#length) {
      throw CustomError.lotto(CustomError.message.lotto.notUnique);
    }
  }

  isLottoNumber(number) {
    return (
      Validator.isPositiveInteger(number) &&
      number >= Lotto.#minNumber &&
      number <= Lotto.#maxNumber
    );
  }

  #validateLottoNumbers(numbers) {
    const validNumbers = numbers.every(this.isLottoNumber);

    if (!validNumbers) {
      throw CustomError.lotto(ERROR.message.lotto.notInRange);
    }
  }
}

export default Lotto;
