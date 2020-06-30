
import BaseClass from '../../src/option/BaseClass.js';

/*
  {
    raw: {
      source: '-c {Boolean}',
      char: '-c',
      long: '',
      type: '{Boolean}',
      name: '',
      enum: '',
      desc: '',
      default: ''
    },
    final: {
      char: 'c',
      long: null,
      type: 'Boolean',
      name: null,
      enum: null,
      desc: '',
      default: null
    }
  }
*/

describe('Test string construction', () => {

  let optStr = '-c --color {Enum} <style> [red]';
  test(optStr, () => {

    let opt    = new BaseClass(optStr);

    expect(opt).toMatchObject({
      raw: {
        source  : optStr,
        char    : '-c',
        long    : '--color',
        type    : '{Enum}',
        name    : '<style>',
        enum    : '',
        desc    : '',
        default : '[red]'
      },
      char     : 'c',
      long     : 'color',
      type     : 'Enum',
      name     : 'style',
      enum     : null,
      desc     : '',
      default  : 'red',
      multiple : null,
    });

    expect(opt.flagMatches('-c'))               .toBe(true);
    expect(opt.flagMatches('-f'))               .toBe(false);
    expect(opt.normalizeFlagAndValue('-c'))     .toMatchObject(['-c','']);
    expect(opt.normalizeFlagAndValue('-c=f'))   .toMatchObject(['-c','f']);
    expect(opt.normalizeFlagAndValue('-c','f')) .toMatchObject(['-c','f']);
    expect(opt.normalizeFlagAndValue(''))       .toMatchObject(['','']);
    expect(opt.matches('-c'))                   .toBe(true);
    expect(opt.matches('-f'))                   .toBe(false);
    expect(opt.interpret('-c').value)           .toBe(true);
    opt.reset();
    expect(opt.interpret('-f','squid').value)   .toBe(null);
    expect(opt.description())                   .toBe('  -c --color [Default: red] ');
  });

});

describe('Test structured construction', () => {
  let optStruct = {
    raw: {
      source  : '-c {Boolean}',
      char    : '-c',
      long    : '--color',
      type    : '{Enum}',
      name    : '<style>',
      enum    : '',
      desc    : '',
      default : '[red]'
    },
    final: {
      char    : 'c',
      long    : 'color',
      type    : 'Enum',
      name    : 'style',
      enum    : null,
      desc    : '',
      default : 'red',
      multiple: null,
    }
  };

  test("option from structure", () => {

    let opt    = new BaseClass(optStruct);

    expect(opt).toMatchObject({
      raw: {
        source  : "-c {Boolean}",
        char    : '-c',
        long    : '--color',
        type    : '{Enum}',
        name    : '<style>',
        enum    : '',
        desc    : '',
        default : '[red]'
      },
      char     : 'c',
      long     : 'color',
      type     : 'Enum',
      name     : 'style',
      enum     : null,
      desc     : '',
      default  : 'red',
      multiple : null,
    });

  });

});
