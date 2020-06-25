import Program from '../src/program.js';

describe('class Program', () => {

  test('running with no options', () => {
    var p = new Program();
    expect(p.options.length).toBe(0);
  });

  test('running with one option', () => {
    var program = new Program();
    program
      .option('-d --display <displayType>')
    ;

    expect(program.options.length).toBe(1);
    expect(program.options[0].char).toBe('d');
    expect(program.options[0].long).toBe('display');
    expect(program.options[0].name).toBe('displayType');
  });

  test('running with multiple option', () => {
    var program = new Program();
    program
      .option('-d --display <displayType>')
      .option('-v --verbose {Boolean}')
    ;

    expect(program.options.length).toBe(2);
    expect(program.options[1].char).toBe('v');
    expect(program.options[1].long).toBe('verbose');
    expect(program.options[1].type).toBe('Boolean');
  });

/*
  test('running a program', () => {
    var program = new Program();
    program
      .option('-d --display <displayType>')
      .option('-v --verbose {Boolean}')
    ;

    program.run();

  });
*/

});

describe('interpreting command args', () => {
  var program = new Program();
 
  test('checking params', () => {
    expect(program.checkOption('-r')).toBe(false);
  });



/*
  test('unrecognized params', () => {
    var args = program.interp([
      'path/to/node',
      'path/to/script',
      '--foo',
    ]);

    expect(args.foo).toBe(true);
  });
*/

});

