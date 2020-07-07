import Option from '../BaseClass.js';

class StringOption extends Option {
  constructor (opts) {
    super(opts);
    this.type = 'String';
  }

  matches (flagStr, valueStr) {
    let flag  = flagStr;
    let value = valueStr;

    if (!this.flagMatches(flag)) {
      return false;
    }

    [flag, value] = this.normalizeFlagAndValue(flag, value);

    if (!!value || (!value && this.default)) {
      return true;
    }

    return false;
  }

  interpret (flag, value) {
    if (!this.matches(flag, value) && !this.default) {
      // If the flag and value don't match, and there's no default, then we
      // don't want to do anything.  But we want to eliminate this option.
      //
      // We could write this with more involved but direct logic, but this
      // has the greatest readability.
    } else if (value === undefined) {
      this.registered = true;
      this.setValue(`${this.default}`);
    } else {
      this.registered = true;
      this.setValue(`${value}`);
    }

    return this;
  }
}

export default StringOption;
