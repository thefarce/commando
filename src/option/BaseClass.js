import parseStr from './parse.js';

class Option {
  constructor (options) {
    let params = options;
    if (typeof params === 'string') {
      params = parseStr(params);
    }

    this.raw = {
      source  : params.raw.source,
      char    : params.raw.char,
      long    : params.raw.long,
      type    : params.raw.type,
      name    : params.raw.name,
      enum    : params.raw.enum,
      desc    : params.raw.desc,
      default : params.raw.default,

      // We store this for resetting.
      final: params.final,
    };

    this.reset();
  }

  reset () {
    this.char = this.raw.final.char;
    this.long = this.raw.final.long;
    this.type = this.raw.final.type;
    this.name = this.raw.final.name;
    this.enum = this.raw.final.enum;
    this.desc = this.raw.final.desc;
    this.default = this.raw.final.default;
    this.multiple = this.raw.final.multiple;

    if (this.multiple) {
      this.value = [];
    } else {
      this.value = null;
    }

    this.registered = false;
  }

  // Guarantee we have a flag (string) and a value (string).
  normalizeFlagAndValue (flagStr, valueStr) {
    let flag = flagStr;
    let value = valueStr;

    if (flag && !value) {
      [flag, value] = (`${flag}`).split('=');
    }

    return [flag, value || ''];
  }

  flagMatches (input) {
    let flag = input;
    if (!flag) {
      return false;
    }
    flag = `${flag}`.trim();
    const charTrim = flag.replace(/^-/, '');
    const longTrim = flag.replace(/^--/, '');

    if (this.raw.char === flag
      || this.raw.long === flag
      || this.char === charTrim
      || this.long === longTrim) {
      return true;
    }
    return false;
  }

  setValue (value) {
    if (this.multiple) {
      this.value.push(value);
    } else {
      this.value = value;
    }
  }

  matches (flag) {
    return this.flagMatches(flag);
  }

  interpret (flag, value) {
    if (this.matches(flag, value)) {
      this.value = value || true;
    }
    return this;
  }

  description () {
    const desc = `  ${this.raw.char} ${this.raw.long} [Default: ${this.default}] ${this.raw.desc}`;

    return desc;
  }
}

export default Option;
