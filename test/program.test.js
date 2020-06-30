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

  // These tests all use the same form.  Create the test with the options
  // provided.  Run with the arguments provided.  Expect the resulting
  // object.
  var TESTS = [

    {
      opt : ['-d --display <displayType>', '-v --verbose {Boolean}', ],
      run : ['-d'],
      get : {displayType: true},
    }, {
      opt : ['-d --display <displayType>', '-v --verbose {Boolean}', ],
      run : ['-d', '--verbose'],
      get : {displayType: true, verbose: true, },
    }, {
      opt : ['-d --display <displayType>', '-v --verbose {Boolean}', ],
      run : ['-d', '--verbose', 'true'],
      get : {displayType: true, verbose: true, },
    }, {
      opt : ['-d --display <displayType>', '-v --verbose {Boolean}', ],
      run : ['-d', '--verbose', 'false'],
      get : {displayType: true, verbose: false, },
    }, {
      opt : ['-d --display <displayType>', '-v --verbose {Boolean}', ],
      run : ['-d', '--verbose', 'false'],
      get : {displayType: true, verbose: false, },
    }, {
      opt : ['-d --display <displayType>', '-v --verbose {Boolean} [true]'],
      run : ['-d', '--verbose'],
      get : {displayType: true, verbose: false, },
    }, {
      opt : [
        '-d --display <displayType>',
        '-v --verbose {Boolean} [true]',
        '-q --quiet {Boolean} <verbose>',
      ],
      run : ['-d', '--verbose'],
      get : {displayType: true, verbose: false, },
    }, {
      opt : [
        '-d --display <displayType>',
        '-v --verbose {Boolean}',
        '-q --quiet {Boolean} <verbose> [true]',
      ],
      run : ['-d', '-q'],
      get : {displayType: true, verbose: false, },
    },
    // Try some number options.
    {opt: ['-c --count {Number}'], run : [],            get : {}},
    {opt: ['-c --count {Number}'], run : ['-c'],        get : {}},
    {opt: ['-c --count {Number}'], run : ['-c', 9],     get : {count:9}},
    {opt: ['-c --count {Number}'], run : ['-c', "9"],   get : {count:9}},
    {opt: ['-c --count {Number}'], run : ['-c', "9.2"], get : {count:9.2}},

    // Enumerated options
    {opt: ['-t --type {Enum} (a|b|c)'], run : ['-t'], get : {}},

    // 15.
    {opt: ['-t --type {Enum}  (a|b|c)'], run : ['-t', 'b'], get : {type:'b'}},
    {opt: ['-t --type {Enum+} (a|b|c)'], run : ['-t', 'b'], get : {type:['b']}},
    {opt: ['-t --type {Enum+} (a|b|c)'], run : ['-t', 'b', '-t', 'a'], get : {}},
    /*
    {
      opt: ['-t --type {Enum+} (a|b|c)'],
      run : ['-t', 'b'],
      run : ['-t', 'c'],
      get : {type:['b','c']}
    },
    */

  ];

  TESTS.forEach((TEST, i) => {
    let desc = (i+1) + ") " + JSON.stringify(TEST).substring(0, 50) + " ...";
    test(desc, () => {
      let program = new Program();
      let final = null;
      TEST.opt.forEach(opt => {
        program.option(opt);
      });
      program
        .entry(function (handler) {
          expect(handler.program).toBeInstanceOf(Program);
          expect(handler.command).toMatchObject(TEST.get);
        });
      program.run([null, null, ...TEST.run]);
    });
  });

});

describe("interpreting arguments", () => {
  test("", () => {
    let program = new Program();
    program.option("-c");
    program.interp([null, null, '-c', '-d']);
    expect(program.options[0].value).toBe(true);
  });
});

describe("interpreting process.argv by default", () => {
  test("", () => {
    let program = new Program();
    program.option("-c");
    program.entry(handler => {
      expect(program.options.length).toBe(1);
    });
    program.run();
  });
});




