
import StringOption from './_src/String.js';

describe("class StringOption", () => {

  test("construction", () => {
    let opt = new StringOption('-c {String}');

    expect(opt.type).toBe('String');
    expect(opt.char).toBe('c');

    expect(opt.matches('-c')).toBe(false);
    expect(opt.matches('-c', '12c')).toBe(true);
  });

  // String values.
  [
    'sihr', '29s', 's29', '92 9', '2893', '92.1',
    ' ', '    ', '\t' 
  ].forEach(value => {
    test(`"-c {String}" evaluates ${value} to ${value}`, () => {
      let opt = new StringOption('-c {String}');
      opt.interpret('-c', value);
      expect(opt.value).toBe(value);
    });
  });

  // falsey values.
  [
    '', false, undefined, null
  ].forEach(value => {
    test(`"-c {String}" evaluates ${value} to ${value}`, () => {
      let opt = new StringOption('-c {String}');
      opt.interpret('-c', value);
      expect(opt.value).toBe(undefined);
    });
  });

  // Default with no value provided.
  test(`Defaults: "-c {String} [14]" evaluates -c to "14"`, () => {
    let opt = new StringOption('-c {String} [14]');
    opt.interpret('-c');
    expect(opt.value).toBe("14");
  });

  // Default with value provided
  test(`Defaults: "-c {String} [flip]" evaluates "-c, pork" to "pork"`, () => {
    let opt = new StringOption('-c {String} [flip]');
    opt.interpret('-c', 'pork');
    expect(opt.value).toBe("pork");
  });

});
