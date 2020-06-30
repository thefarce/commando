
import NumberOption from './_src/Number.js';

describe("class NumberOption", () => {

  test("construction", () => {
    let opt = new NumberOption('-c {Number}');

    expect(opt.type).toBe('Number');
    expect(opt.char).toBe('c');

    expect(opt.matches('-c', '12' )).toBe(true);
    expect(opt.matches('-c', '12c')).toBe(false);
  });

  // Number values
  [
    ['12'   , 12   ],
    ['0004' , 4    ],
    ['000'  , 0    ],
    ['0.25' , 0.25 ],
  ].forEach(value => {
    test(`"-c {Number}" matches ${value[0]} as ${value[1]}`, () => {
      let opt = new NumberOption('-c {Number}');
      opt.interpret('-c', value[0]);
      expect(opt.value).toBe(value[1]);
    });
  });

  // Non-numeric values
  [
    'sihr', '', '29s', 's29', '92 9'
  ].forEach(value => {
    test(`"-c {Number}" evaluates ${value} to null`, () => {
      let opt = new NumberOption('-c {Number}');
      opt.interpret('-c', value);
      expect(opt.value).toBe(null);
    });
  });

  // Default inversion
  test(`Defaults: "-c {Number} [14]" evaluates -c to 14`, () => {
    let opt = new NumberOption('-c {Number} [14]');
    opt.interpret('-c');
    expect(opt.value).toBe(14);
  });

  // Default inversion
  test(`Defaults: "-c {Number} [14]" evaluates "-c 1.4" to 1.4`, () => {
    let opt = new NumberOption('-c {Number} [14]');
    opt.interpret('-c', '1.4');
    expect(opt.value).toBe(1.4);
  });

  // Default inversion
  test(`Defaults: "-c {Number} [pigs]" evaluates "-c 1.4" to 1.4`, () => {
    let opt = new NumberOption('-c {Number} [pigs]');
    expect(opt.default).toBe(NaN);
    opt.interpret('-c', '1.4');
    expect(opt.value).toBe(1.4);
  });

  test('Check matching with the wrong flag', () => {
    let opt = new NumberOption('-c {Number}');
    opt.interpret('-f');
    expect(opt.matches('-f')).toBe(false);
  });
});
