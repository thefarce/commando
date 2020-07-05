import BooleanOption     from './type/Boolean';
import EnumerationOption from './type/Enumeration';
import NumberOption      from './type/Number';
import StringOption      from './type/String';
import parseStr          from './parse';

function createOption (str) {
  const optStruct = parseStr(str);
  switch (optStruct.final.type) {
    case 'String':
      return new StringOption(optStruct);

    case 'Number':
      return new NumberOption(optStruct);

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
