
function trimArg (str) {
  return str.replace(/^[, ]+/, '').replace(/[, ]+$/, '');
}

// Helper function to extract parts of the string.
function getPart (str, pattern) {
  var component = null;
  str = ' ' + trimArg(str) + ' ';

  var match = str.match(pattern);
  if (match) {
    component = match[0].trim();
    var _arr = str.split('');
    var _arr = str.split('');
    _arr.splice(match.index, match[0].length, ' ');
    str = _arr.join('');
  }

  return [
    str       ? trimArg(str)       : '',
    component ? trimArg(component) : ''
  ];
}

// We require a pretty strict format.  We make it forgiving when we can,
// but our priority is regularity rather than flexibility.
function parseStr (optionStr='') {
  var raw = {
    source  : optionStr,
    char    : null,
    long    : null,
    type    : null,
    name    : null,
    enum    : null,
    desc    : null,
    default : null,
  };

  var final = {
    char    : null,
    long    : null,
    type    : null,
    name    : null,
    enum    : null,
    desc    : null,
    default : null,
  }

  var _optStr = optionStr;

  [_optStr, raw.char]    = getPart(_optStr, /[, ]-\w[, ]/);
  [_optStr, raw.long]    = getPart(_optStr, /[, ]--\w+[, ]/);
  [_optStr, raw.type]    = getPart(_optStr, /[, ]\{[\+\w\s]+\}[, ]/);
  [_optStr, raw.name]    = getPart(_optStr, /[, ]\<[^>]+\>[, ]/);
  [_optStr, raw.default] = getPart(_optStr, /[, ]\[[^]+\][, ]/);
  [_optStr, raw.enum]    = getPart(_optStr, /[, ]\([^\)]+\)[, ]/);
  [_optStr, raw.desc]    = getPart(_optStr, /[, ].*[, ]/);

  if (raw.char) {
    final.char = raw.char.replace(/^-/,'').replace(/[, ]+$/, '');
  }

  if (raw.long) {
    final.long = raw.long.replace(/^--/,'');
  }

  if (raw.type) {
    final.type = raw.type.replace(/[{}]/g,'');
    if (final.type.match(/\+$/)) {
      final.multiple = true;
      final.type = final.type.replace(/\++$/g, '');
    }
  }

  // There are two ways to get a default value.  The latter takes
  // priority.
  if (raw.name) {
    var parts = raw.name.replace(/[\<\>]/g,'').split('=');
    final.name = parts.shift();
    final.default = parts.join('=') || null;
  }

  if (raw.default) {
    final.default = raw.default.replace(/^\[/, '').replace(/\]$/,'');
  }

  if (raw.enum) {
    final.enum = raw.enum.replace(/[\[\]]/g,'').split('|');
  }

  final.desc = raw.desc.replace(/[{}]/g,'');

  return {
    raw, 
    final
  };
}

export default parseStr;

