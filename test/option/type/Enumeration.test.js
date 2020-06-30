
import EnumerationOption from './_src/Enumeration.js';

describe("class EnumerationOption", () => {

  test("construction", () => {
    let opt = new EnumerationOption('-c {Enumeration} (one|two|three)');

    expect(opt.type).toBe('Enumeration');
    expect(opt.char).toBe('c');

    expect(opt.matches('-c', 'two' )).toBe(true);
    expect(opt.matches('-c', 'four')).toBe(false);
  });

  // Enumeration values
  [
    'one', 'pigs', 'lump', 'pie'
  ].forEach(value => {
    test(
      `"-c {Enum} (one|pigs|lump|pie)" matches ${value} as ${value}`,
      () => {
        let opt = new EnumerationOption('-c {Enum} (one|pigs|lump|pie)');
        opt.interpret('-c', value);
        expect(opt.value).toBe(value);
      }
    );
  });

  // Non-numeric values
  [
    'sihr', '', '29s', 's29', '92 9'
  ].forEach(value => {
    test(`"-c {Enumeration} (a|b|c)" evaluates ${value} to null`, () => {
      let opt = new EnumerationOption('-c {Enumeration} (a|b|c)');
      opt.interpret('-c', value);
      expect(opt.value).toBe(null);
    });
  });

  // Default inversion
  test(`Defaults: "-c {Enumeration} [a] (a|b|c)" evaluates -c to a`, () => {
    let opt = new EnumerationOption('-c {Enumeration} [a] (a|b|c)');
    opt.interpret('-c');
    expect(opt.value).toBe('a');
  });

  // Default inversion
  test(`Defaults: "-c {Enumeration} [a] (a|b|c)" evaluates (-c, b) to a`, () => {
    let opt = new EnumerationOption('-c {Enumeration} [a] (a|b|c)');
    opt.interpret('-c', 'b');
    expect(opt.value).toBe('b');
  });

  // Default inversion
  test(`"c {Enumeration} [pigs] (a|b|c)" throws an error`, () => {
    expect(() => {new EnumerationOption('-c {Enumeration} [pigs] (a|b|c)')})
      .toThrow();
  });

  test('Check matching with the wrong flag', () => {
    let opt = new EnumerationOption('-c {Enum}');
    opt.interpret('-f');
    expect(opt.matches('-f')).toBe(false);
  });

});
