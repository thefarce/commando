import Option from '../BaseClass';

class EnumerationOption extends Option {
  constructor (opts) {
    super(opts);
    this.type = 'Enumeration';

    if (this.default && !this.isEnumeratedValue(this.default)) {
      throw (new Error('Provided default is not an enumerated value.'));
    }
  }

  matches (flagStr, valueStr) {
    let flag  = flagStr;
    let value = valueStr;

    if (!this.flagMatches(flag)) {
      return false;
    }

    [flag, value] = this.normalizeFlagAndValue(flag, value);

    return this.isEnumeratedValue(value);
  }

  isEnumeratedValue (value) {
    for (let i = 0, len = this.enum.length; i < len; i++) {
      if (value === this.enum[i]) {
        return true;
      }
    }
    return false;
  }

  interpret (flag, value) {
    if (!this.matches(flag, value) && !this.default) {
      // This is in each subclass.  That lets me know its a function that
      // ought to be in the base class.  I should do that ...
    } else if (value === undefined) {
      this.registered = true;
      this.setValue(this.default);
    } else {
      this.registered = true;
      this.setValue(value);
    }
    return this;
  }
}

export default EnumerationOption;
