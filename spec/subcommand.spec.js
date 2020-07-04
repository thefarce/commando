
import createOption from '../src/option/create-option.js';
import suite        from './suite-generator.js';

suite(describe,['Version 1.0.0', 'Program', 'Subcommands'], () => {

  test('get arguments', () => {
    let opt = createOption('-o --opt {Boolean+}');
    expect(opt.type).toBe('foof');
  });
});

