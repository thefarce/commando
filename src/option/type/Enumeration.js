
import Option from '../BaseClass.js';

class EnumerationOption extends Option {

  constructor (opts) {
    super(opts);
    this.type = "Enumeration";

    if (this.default && !this.isEnumeratedValue(this.default)) {
      throw(new Error("Provided default is not an enumerated value."));
    }
  }

  matches (flag, value) {
    if (!this.flagMatches(flag)) {
      return false;
    }

    [flag, value] = this.normalizeFlagAndValue(flag, value);

    return this.isEnumeratedValue(value);
  }

  isEnumeratedValue (value) {
    for (var i = 0, len = this.enum.length; i < len; i++) {
      if (value === this.enum[i]) {
        return true;
      }
    }
    return false;
  }

  interpret (flag, value) {
    if (!this.matches(flag, value) && !this.default) {
    }
    else if (value === undefined) {
      this.registered = true;
      this.setValue(this.default);
    }
    else {
      this.registered = true;
      this.setValue(value);
    }
    return this;
  }
}

export default EnumerationOption;
