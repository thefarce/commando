
import BooleanOption     from './type/Boolean.js';
import EnumerationOption from './type/Enumeration.js';
import NumberOption      from './type/Number.js';
import StringOption      from './type/String.js';

import parseStr          from './parse.js';

function createOption (str) {
  var optStruct = parseStr(str);
  switch (optStruct.final.type) {
    case 'String':
      return new StringOption     (optStruct);

    case 'Number':
      return new NumberOption     (optStruct);

    case 'Enum': 
    case 'Enumeration': 
      return new EnumerationOption(optStruct);

    case 'Bool':
    case 'Boolean':
    default:
      return new BooleanOption(optStruct);
  }
}

export default createOption;

