
import Option from '../BaseClass.js';

class EnumerationOption extends Option {

  constructor (opts) {
    super(opts);
    this.type = "Enumeration";
  }

  matches (flag, value) {
    if (!this.flagMatches(flag)) {
      return false;
    }

    [flag, value] = this.normalizeFlagAndValue(flag, value);
  }

}

export default EnumerationOption;
