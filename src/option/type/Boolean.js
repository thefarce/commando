
import Option from '../BaseClass.js';

/**
 * Check if the value is on our boolean whitelist.  This list lets users use
 * conventionally boolean values with little surprise.
 *
 * @param {String} value The value to test.
 * @returns {Boolean} Returns true if it is an acceptable value and false
 * otherwise.
 */
function _valueIsAcceptable (value) {
  return (
    value === "true"  || value === "t" ||
    value === "false" || value === "f" ||
    value === "yes"   || value === "y" ||
    value === "no"    || value === "n" ||
    value === "1"     || value === "0" ||
    value === ''
  );
}

function _interpretValue (value) {

  if (
    value === "true"  || value === "t" ||
    value === "yes"   || value === "y" ||
    value === "1"     || 
    value === ''
  ) {
    return true;
  } else if (
    value === "false" || value === "f" ||
    value === "no"    || value === "n" ||
    value === "0"
  ) {
    return false;
  }
  else {
    return;
  }

}

class BooleanOption extends Option {

  constructor (opts) {
    super(opts);
    this.type = "Boolean";

    if (this.default && _valueIsAcceptable(this.default.trim())) {
      this.default = _interpretValue(this.default.trim());
    }

  }

  matches (flag, value) {
    if (!super.matches(flag)) {
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

  interpret (flag, value) {
    if (!this.matches(flag, value)) {
      return this;
    }

    if (value === undefined) {
      this.value = !this.default;
      return this;
    }

    let _val = (value || '').toLowerCase();

    if (
			_val === "true"  || _val === "t" ||
			_val === "yes"   || _val === "y"
    ) {
      this.value = true;
    }
    else if (
			_val === "false" || _val === "f" ||
			_val === "no"    || _val === "n"
    ) {
      this.value = false;
    }
    else if (_val === '') {
      this.value = (this.default === true) ? false : true;
    }

    return this;
  }

}

export default BooleanOption;
