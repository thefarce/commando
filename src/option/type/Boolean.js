
import Option from '../BaseClass.js';

class BooleanOption extends Option {

  constructor (str) {
    super(str);
    this.type = "Boolean";
  }

  matches (flag, value) {
    if (!this.flagMatches(flag)) {
      return false;
    }

    [flag, value] = this.normalizeFlagAndValue(flag, value);

    // We accept anything that's basically truthy or falsey.  We also take
    // an empty string, because that is truthy, inasmuch as the flag has
    // been set at all and its boolean.
    let _val = value.toLowerCase();
    if (
			_val === "true"  || _val === "t" ||
			_val === "false" || _val === "f" ||
			_val === "yes"   || _val === "y" ||
			_val === "no"    || _val === "n" ||
			_val === ''
    ) {
      return true;
    }

    return false;
  }

}

export default BooleanOption;
