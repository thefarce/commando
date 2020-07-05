function trimArg (str) {
  return str.replace(/^[, ]+/, '').replace(/[, ]+$/, '');
}

// Helper function to extract parts of the string.
function getPart (sourceStr, pattern) {
  let str = `${sourceStr}`;

  let component = null;
  str = ` ${trimArg(str)} `;

  const match = str.match(pattern);
  if (match) {
    component = match[0].trim();
    const arr = str.split('');
    arr.splice(match.index, match[0].length, ' ');
    str = arr.join('');
  }

  return [
    trimArg(str),
    component ? trimArg(component) : '',
  ];
}

// We require a pretty strict format.  We make it forgiving when we can,
// but our priority is regularity rather than flexibility.
function parseStr (optionStr = '') {
  const raw = {
    source  : optionStr,
    char    : null,
    long    : null,
    type    : null,
    name    : null,
    enum    : null,
    desc    : null,
    default : null,
  };

  const final = {
    char     : null,
    long     : null,
    type     : null,
    name     : null,
    enum     : null,
    desc     : null,
    default  : null,
    multiple : null,
  };

  let optStr = optionStr;

  [optStr, raw.char] = getPart(optStr, /[, ]-\w[, ]/);
  [optStr, raw.long] = getPart(optStr, /[, ]--\w+[, ]/);
  [optStr, raw.type] = getPart(optStr, /[, ]\{[+\w\s]+\}[, ]/);
  [optStr, raw.name] = getPart(optStr, /[, ]<[^>]+>[, ]/);
  [optStr, raw.default] = getPart(optStr, /[, ]\[[^]+\][, ]/);
  [optStr, raw.enum] = getPart(optStr, /[, ]\([^)]+\)[, ]/);
  [optStr, raw.desc] = getPart(optStr, /[, ].*[, ]/);

  if (raw.char) {
    final.char = raw.char.replace(/^-/, '').replace(/[, ]+$/, '');
  }

  if (raw.long) {
    final.long = raw.long.replace(/^--/, '');
  }

  if (raw.type) {
    final.type = raw.type.replace(/[{}]/g, '');
    if (final.type.match(/\+$/)) {
      final.multiple = true;
      final.type = final.type.replace(/\++$/g, '');
    }
  }

  // There are two ways to get a default value.  The latter takes
  // priority.
  if (raw.name) {
    const parts = raw.name.replace(/[<>]/g, '').split('=');
    final.name = parts.shift();
    final.default = parts.join('=') || null;
  }

  if (raw.default) {
    final.default = raw.default.replace(/^\[/, '').replace(/\]$/, '');
  }

  if (raw.enum) {
    final.enum = raw.enum.replace(/[()]/g, '').split('|');
  }

  final.desc = raw.desc.replace(/[{}]/g, '');

  return {
    raw,
    final,
  };
}

export default parseStr;
export {
  parseStr,
  trimArg,
  getPart,
};
