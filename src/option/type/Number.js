
import Option from '../BaseClass.js';

function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

class NumberOption extends Option {

  constructor (str) {
    super(str);
    this.type = "Number";
  }

	matches (flag, value) {
    if (!this.flagMatches(flag)) {
      return false;
    }

    [flag, value] = this.normalizeFlagAndValue(flag, value);

    return isNumeric(value);
  }

}

export default NumberOption;
