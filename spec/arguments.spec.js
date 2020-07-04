
import createOption from '../src/option/create-option.js';
import suite        from './suite-generator.js';

suite(describe, ['Version 1.0.0', 'Program', 'Arguments'], () => {
  test('programs get an arguments array', () => {
    let opt = createOption('-o --opt {String}');
    expect(opt.type).toBe('foof');
  });
});

