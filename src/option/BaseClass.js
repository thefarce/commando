class Option {
  constructor (params) {
    this.raw = {
      source   : params.raw.source,
      char     : params.raw.char,
      long     : params.raw.long,
      type     : params.raw.type,
      name     : params.raw.name,
      enum     : params.raw.enum,
      desc     : params.raw.desc,
      default  : params.raw.default,
    };

    this.char     = params.final.char;
    this.long     = params.final.long;
    this.type     = params.final.type;
    this.name     = params.final.name;
    this.enum     = params.final.enum;
    this.desc     = params.final.desc;
    this.default  = params.final.default;
    this.multiple = params.final.multiple;
  }

  flagMatches (flag) {
    let _flag = flag.trim();

    var charTrim = flag.replace(/^-/,  '');
    var longTrim = flag.replace(/^--/, '');

    if ( this.raw.char === flag
      || this.raw.long === flag
      || this.char     === charTrim
      || this.long     === longTrim) {
      return true;
    }
    return false;
  }

  // Guarantee we have a flag (string) and a value (string).
  normalizeFlagAndValue (flag, value) {
    if (flag && !value) {
      [flag, value] = (flag||'').split('=')
    }
    return [flag, value || ''];
  }

  matches (flag, value) {
    return this.flagMatches(flag);
  }

}

export default Option;
