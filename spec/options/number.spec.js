
import createOption from '../../src/option/create-option.js';
import suite        from '../suite-generator.js';

suite(['Version 1.0.0','Program','Options','Number'], () => {

  test('can parse integer values', () => {
    let opt = createOption('-c --count {Number}');
    opt.interpret('--count','14');
    expect(opt.value).toBe(14);
  });

  test('can parse float values', () => {
    let opt = createOption('-c --count {Number}');
    opt.interpret('--count','14.245');
    expect(opt.value).toBe(14.245);
  });

  test('can parse integer values', () => {
    let opt = createOption('-c --count {Number}');
    opt.interpret('--count','14');
    expect(opt.value).toBe(14);
  });

  test('throws an error on non-numeric values', () => {
    expect(() => {
      let opt = createOption('-c --count {Number}');
      opt.interpret('--count','osdihjf');
    }).toThrow();
  });

});

