
import createOption from '../src/option/create-option.js';
import suite        from './suite-generator.js';

suite(['Version 1.0.0', 'Program', 'Options'], () => {
  test('options can have multiple values', () => {
    let opt = createOption('-o --opt {Boolean+}');
    expect(opt.type).toBe('Boolean');
  });

  describe('Boolean', () => {
    test('create boolean options from string', () => {
      let opt = createOption('-o --opt {Boolean}');
      expect(opt.type).toBe('Boolean');
    });
  });

  describe('String', () => {
    test('create string options from string', () => {
      let opt = createOption('-o --opt {String}');
      expect(opt.type).toBe('String');
    });
  });

});

