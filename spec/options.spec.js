
import createOption from '../src/option/create-option.js';
import suite        from './suite-generator.js';

suite(['Version 1.0.0', 'Program', 'Options'], () => {

  test('can be constructed with parametric objects', () => {
    let opt = createOption({
      char : 'o'      ,
      long : 'option' ,
      type : 'String' ,
    });
    opt.interpretValue('-o', 'myvalue');
    expect(opt.value).toBe('myvalue');
  });

  test('options can have multiple values', () => {
    let opt = createOption('-o --opt {Boolean+}');
    expect(opt.type).toBe('Boolean');
  });

  test('Unrecognized types throw an error', () => {
    expect(() => {
      let opt = createOption('-o --opt {Garbage}');
    }).toThrow();
  });

  test('Unspecified types default to String', () => {
    let opt = createOption('-o --opt');
    expect(opt.type).toBe('Boolean');
  });

  test('Multiple values are supported', () => {
    let opt = createOption('-o --opt {String+}');
    opt.interpret('-o', 'one');
    opt.interpret('-o', 'two');
    opt.interpret('-o', 'three');
    expect(opt.type).toBe('String');
    expect(opt.multiple).toBe(true);
    expect(opt.value).toMatchObject(['one','two','three']);
  });

  describe('Boolean', () => {
    test('create boolean options from string', () => {
      let opt = createOption('-o --opt {Boolean}');
      expect(opt.type).toBe('Boolean');
    });

    test('Boolean default value is false by default', () => {
      let opt = createOption('-o --opt {Boolean}');
      expect(opt.type).toBe('Boolean');
      expect(opt.default).toBe(false);
    });
  });

  describe('String', () => {
    test('create string options from string', () => {
      let opt = createOption('-o --opt {String}');
      expect(opt.type).toBe('String');
    });
  });

  describe('Enum', () => {
    test('create enumeration options from string', () => {
      let opt = createOption('-o --opt {Enumeration}');
      expect(opt.type).toBe('Enumeration');
    });
  });

  describe('Number', () => {
    test('create number options from string', () => {
      let opt = createOption('-o --opt {Number}');
      expect(opt.type).toBe('Number');
    });
  });
});

