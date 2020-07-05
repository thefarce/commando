import Option from '../BaseClass';

class BooleanOption extends Option {
  constructor (opts) {
    super(opts);
    this.type = 'Boolean';

    if (this.default && BooleanOption.isValueAcceptable(this.default)) {
      this.default = BooleanOption.interpretValue(this.default);
    }
  }

  reset () {
    super.reset();
    if (this.default && BooleanOption.isValueAcceptable(this.default)) {
      this.default = BooleanOption.interpretValue(this.default);
    }
  }

  matches (rawFlag, rawValue) {
    let flag  = rawFlag;
    let value = rawValue;

    if (!super.matches(flag)) {
      return false;
    }

    [flag, value] = this.normalizeFlagAndValue(flag, value);

    // We accept anything that's basically truthy or falsey.  We also take
    // an empty string, because that is truthy, inasmuch as the flag has
    // been set at all and its boolean.
    if (BooleanOption.isValueAcceptable(value)) {
      return true;
    }

    return false;
  }

  interpret (flag, value) {
    // If the flag and value don't match, skip this-- the interpretation
    // is that its meaningless.
    if (!this.matches(flag, value)) {
      return this;
    }

    // If there's no value but the flag matches, then the value here is the
    // inversion of the default.  This means a default false becomes true
    // and a default true becomes false.
    if (value === undefined) {
      this.setValue(!this.default);
      this.registered = true;
      return this;
    }

    // Finally, if we have a value, let's interpret it as intended.
    if (BooleanOption.isValueAcceptable(value)) {
      this.setValue(BooleanOption.interpretValue(value));
    } else {
      this.setValue(!this.default);
    }

    this.registered = true;
    return this;
  }

  static isValueAcceptable (rawValue) {
    const value = BooleanOption.interpretValue(rawValue);
    return (value === true || value === false);
  }

  static interpretValue (raw) {
    const value = (`${raw}`).trim().toLowerCase();

    if (
      value === 'true' || value === 't'
      || value === 'yes' || value === 'y'
      || value === '1'
      || value === ''
    ) {
      return true;
    }

    if (
      value === 'false' || value === 'f'
      || value === 'no' || value === 'n'
      || value === '0'
    ) {
      return false;
    }

    return undefined;
  }
}

export default BooleanOption;
