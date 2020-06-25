function isStrNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isStrString (s) {
  if (typeof s === 'string') {
    return true;
  }
  return false;
}

function isStrBoolean (b) {
	return (b === "true" || b === "false");
}

function isStrEnumerated (e) {

	return false;
}

function _flagMatches (option, flag) {
  flag = flag.trim();

  var charTrim = flag.replace(/^-/,  '');
  var longTrim = flag.replace(/^--/, '');

  if (option.raw.char === flag
  ||  option.raw.long === flag
  ||  option.char     === charTrim
  ||  option.long     === longTrim) {
    return true;
  }
  return false;
}

class Option {
  constructor (str) {

    this.raw = {
      source  : str,
      char    : null,
      long    : null,
      type    : null,
      name    : null,
      enum    : null,
      desc    : null,
      default : null,
    };

    this.char    = null;
    this.long    = null;
    this.type    = null;
    this.name    = null;
    this.enum    = null;
    this.desc    = null;
    this.default = null;

    var opt = this.parseStr(str);
  }

  // As flags
  //   option.matches('-c')
  //   option.matches('--color')
  //   option.matches('c')
  //   option.matches('color')
  //
  // Attached values
  //   option.matches('-c=red')
  //   option.matches('c=red')
  //   option.matches('--color=red')
  //   option.matches('color=red')
  //
  // Detached values
  //   option.matches('-c'      , 'red')
  //   option.matches('--color' , 'red')
  //   option.matches('c'       , 'red')
  //   option.matches('color'   , 'red')
  /**
   * Check if an input or pair of inputs matches the option.  Inputs must be
   * passed in as matches(key) or matches(key,value).
   *
   */
  matches (key, value) {
    // If we didn't get a value, try to extract one from an attached-value
    // format.  Either way, we have at the end a definitive morphology
    // (key,value) -- even if value is not present.
    if (key && !value) {
      [key,value] = (key||'').split('=');
    }

    // If there's no type specified, we only need to match the flag.  This
    // is also the case for "Boolean" type, which is true/false based on the
    // mere presence of the flag.
    if ((!this.type || this.type === "Boolean") && _flagMatches(this, key)) {
      let _val = (value || '').toLowerCase();

      // By default, we allow things that look like true|false|yes|no.
      if (
        _val === "true"  || _val === "t" ||
        _val === "false" || _val === "f" ||
        _val === "yes"   || _val === "y" ||
        _val === "no"    || _val === "n" ||
        _val === ''
      ) {
        return true;
      } else {
        return false;
      }
    }

    if (this.type === 'String') {
      // If the flag matches AND we either received a string value or have a
      // default, then return true.
      if (_flagMatches(this, key) && (isStrString(value) || this.default)) {
        return true;
      }
    }

    return false;
  }

  _interpretBoolean (value) {

  }

  // This means we're getting something like:  "--color", "red" (good path)
  interpret (flag, value) {
    if (!this.matches(flag, value)) {
      return;
    }

    this.value = value;
    return this.value;
  }

  // We require a pretty strict format.  We make it forgiving when we can,
  // but our priority is regularity rather than flexibility.
  parseStr (optionStr='') {

    var _optStr = optionStr;

    function _trim (str) {
      return str.replace(/^[, ]+/, '').replace(/[, ]+$/, '');
    }

    // Helper function to extract parts of the string.
    function getPart (str, pattern) {
      var component = null;
      str = ' ' + _trim(str) + ' ';

      var match = str.match(pattern);
      if (match) {
        component = match[0].trim();
        var _arr = str.split('');
        var _arr = str.split('');
        _arr.splice(match.index, match[0].length, ' ');
        str = _arr.join('');
      }

      return [
        str       ? _trim(str)       : '',
        component ? _trim(component) : ''
      ];
    }

    [_optStr, this.raw.char]    = getPart(_optStr, /[, ]-\w[, ]/);
    [_optStr, this.raw.long]    = getPart(_optStr, /[, ]--\w+[, ]/);
    [_optStr, this.raw.type]    = getPart(_optStr, /[, ]\{[\w\s]+\}[, ]/);
    [_optStr, this.raw.name]    = getPart(_optStr, /[, ]\<[^>]+\>[, ]/);
    [_optStr, this.raw.default] = getPart(_optStr, /[, ]\[[^]+\][, ]/);
    [_optStr, this.raw.enum]    = getPart(_optStr, /[, ]\([^\)]+\)[, ]/);
    [_optStr, this.raw.desc]    = getPart(_optStr, /[, ].*[, ]/);

    if (this.raw.char) {
      this.char = this.raw.char.replace(/^-/,'').replace(/[, ]+$/, '');
    }

    if (this.raw.long) {
      this.long = this.raw.long.replace(/^--/,'');
    }

    if (this.raw.type) {
      this.type = this.raw.type.replace(/[{}]/g,'');
    }

    // There are two ways to get a default value.  The latter takes
    // priority.
    if (this.raw.name) {
      var parts = this.raw.name.replace(/[\<\>]/g,'').split('=');
      this.name = parts.shift();
      this.default = parts.join('=') || null;
    }

    if (this.raw.default) {
      this.default = this.raw.default.replace(/^\[/, '').replace(/\]$/,'');
    }

    if (this.raw.enum) {
      this.enum = this.raw.enum.replace(/[\[\]]/g,'').split('|');
    }

    this.desc = this.raw.desc.replace(/[{}]/g,'');
  }
}

export default Option;
