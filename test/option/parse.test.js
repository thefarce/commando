
import {
	parseStr,
  trimArg,
  getPart,
} from '../../src/option/parse.js';

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

describe('trimArg()', () => {
  test(', pickles ', () => {
    let value = trimArg(', pickles ');
    expect(value).toBe('pickles');
  });
});

describe('getPart()', () => {
  test('', () => {
  let value = getPart('', /x/);
  expect(value).toMatchObject(['','']);
  expect(value[0]).toBe('');
  });
});

describe('Test basic construction', () => {

	test('no construction args', () => {
		let opt = parseStr();
		expect(opt).toMatchObject({
			raw: {
				source  : '' ,
				char    : '' ,
				long    : '' ,
				type    : '' ,
				name    : '' ,
				enum    : '' ,
				desc    : '' ,
				default : '' ,
			},

			final      : {
				char     : null,
				long     : null,
				type     : null,
				name     : null,
				enum     : null,
				desc     : '',
				default  : null,
				multiple : null,
			}
		});
	});

});

describe('Test basic construction', () => {

	let optStr = '-c --color {Enum} <style> [red]';
	test(optStr, () => {
		let opt = parseStr(optStr);
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
		});
	});

});


describe('Test basic construction', () => {
	let optStr = '-c --color {Boolean+}';
	test(optStr, () => {
		let opt = parseStr(optStr);
		expect(opt).toMatchObject({
			raw: {
				source  : optStr,
				char    : '-c',
				long    : '--color',
				type    : '{Boolean+}',
				name    : '',
				enum    : '',
				desc    : '',
				default : ''
			},
			final: {
				char    : 'c',
				long    : 'color',
				type    : 'Boolean',
				name    : null,
				enum    : null,
				desc    : '',
				default : null,
				multiple: true,
			}
		});
	});
});


describe('Test basic construction', () => {
	let optStr = '-c --color {Enum} <style> (a|b)';
	test(optStr, () => {
		let opt = parseStr(optStr);
		expect(opt).toMatchObject({
			raw: {
				source  : optStr,
				char    : '-c',
				long    : '--color',
				type    : '{Enum}',
				name    : '<style>',
				enum    : '(a|b)',
				desc    : '',
				default : ''
			},
			final: {
				char    : 'c',
				long    : 'color',
				type    : 'Enum',
				name    : 'style',
				enum    : ['a', 'b'],
				desc    : '',
				default : null,
				multiple: null,
			}
		});
	});

});

