
import Option from '../BaseClass.js';
import parseStr from '../parse.js';

class StringOption extends Option {

  constructor (opts) {
    if (typeof opts === "string") {
      var params = parseStr(opts);
    }

    super(opts);
    this.type = "String";
  }

	matches (flag, value) {
    if (!this.flagMatches(flag)) {
      return false;
    }

    [flag, value] = this.normalizeFlagAndValue(flag, value);

    if (!!value || (!value && this.default)) {
      return true;
    }

    return false;
	}

}

export default StringOption;
