
import Option from '../BaseClass.js';

class EnumerationOption extends Option {

  constructor (str) {
    super(str);
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
