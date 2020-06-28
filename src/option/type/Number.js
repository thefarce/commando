
import Option from '../BaseClass.js';

function isNumeric (value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

function coerceValue (value) {
  return parseFloat(value);
}

class NumberOption extends Option {

  constructor (opts) {
    super(opts);
    this.type = "Number";

    if (this.default) {
      this.default = parseFloat(this.default);
    }
  }

	matches (flag, value) {
    if (!this.flagMatches(flag)) {
      return false;
    }

    [flag, value] = this.normalizeFlagAndValue(flag, value);

    return isNumeric(value);
  }

  interpret (flag, value) {
    if (!this.matches(flag, value) && !this.default) {
    }
    else if (value === undefined) {
      this.value = coerceValue(this.default);
    }
    else {
      this.value = coerceValue(value);
    }

    return this;
  }
}

export default NumberOption;
