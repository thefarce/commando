
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
