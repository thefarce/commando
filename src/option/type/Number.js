import Option from '../BaseClass.js';

function isNumeric (raw) {
  if (raw === null
  || typeof raw === 'undefined'
  || raw === false
  || raw === true
  || (typeof raw === 'string' && raw.match(/^\s*$/))
  ) {
    return false;
  }

  const value = Number(raw);
  return !Number.isNaN(value) && Number.isFinite(value);
}

function coerceValue (value) {
  return parseFloat(value);
}

class NumberOption extends Option {
  constructor (opts) {
    super(opts);
    this.type = 'Number';

    if (this.default) {
      this.default = parseFloat(this.default);
    }
  }

  matches (flagStr, valueStr) {
    let flag  = flagStr;
    let value = valueStr;

    if (!this.flagMatches(flag)) {
      return false;
    }

    [flag, value] = this.normalizeFlagAndValue(flag, value);

    return isNumeric(value);
  }

  interpret (flag, value) {
    if (!this.matches(flag, value) && !this.default) {
      // This conditional needs to be moved to the base class.
    } else if (value === undefined) {
      this.registered = true;
      this.setValue(coerceValue(this.default));
    } else {
      this.registered = true;
      this.setValue(coerceValue(value));
    }

    return this;
  }
}

export default NumberOption;
