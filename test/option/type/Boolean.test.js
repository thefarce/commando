
import BooleanOption from './_src/Boolean.js';

describe("class BooleanOption", () => {

  test("construction", () => {
    let opt = new BooleanOption('-c {Boolean}');

    expect(opt.type).toBe('Boolean');
    expect(opt.char).toBe('c');

    expect(opt.matches('-c')).toBe(true);
    expect(opt.matches('-c', "cat")).toBe(false);
    expect(opt.matches('-C')).toBe(false);
  });

  // Truthy values
  [
    'true', 'TRUE', 'True', 't', 'T', 'yes', 'y', 'Yes', 'YES', 'Y', '', '1'
  ].forEach(value => {
    test(`"-c {Boolean}" evaluates ${value} to true`, () => {
      let opt = new BooleanOption('-c {Boolean}');
      opt.interpret('-c', value);
      expect(opt.value).toBe(true);
    });
  });

  // Falsey values
  [
    'false', 'FALSE', 'False', 'f', 'F', 'no', 'n', 'No', 'NO', 'N', '0'
  ].forEach(value => {
    test(`"-c {Boolean}" evaluates ${value} to false`, () => {
      let opt = new BooleanOption('-c {Boolean}');
      opt.interpret('-c', value);
      expect(opt.value).toBe(false);
    });
  });

  // Default inversion
  test(`"-c {Boolean} [true]" evaluates -c to false`, () => {
    let opt = new BooleanOption('-c {Boolean} [true]');
    opt.interpret('-c');
    expect(opt.value).toBe(false);

    expect(opt.isValueAcceptable('piggly')).toBe(false);
    expect(opt.interpretValue("piggly")).toBe(undefined);

    opt.reset();
    expect(opt.interpret('-c', null).value).toBe(false);
  });

  test(`"-c {Boolean} [false]" evaluates -c to true`, () => {
    let opt = new BooleanOption('-c {Boolean} [false]');
    opt.interpret('-c');
    expect(opt.value).toBe(true);
  });

  test(`"-c {Boolean} [true]" evaluates -c to false`, () => {
    let opt = new BooleanOption('-c {Boolean} [true]');
    opt.interpret('-c', 'yes');
    expect(opt.value).toBe(true);
  });

  test(`"-c {Boolean} [false]" evaluates (-c, no) to true`, () => {
    let opt = new BooleanOption('-c {Boolean} [false]');
    opt.interpret('-c','no');
    expect(opt.value).toBe(false);
  });

  test('Check matching with the wrong flag', () => {
    let opt = new BooleanOption('-c {Boolean}');
    opt.interpret('-f');
    expect(opt.matches('-f')).toBe(false);
  });

});
