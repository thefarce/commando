import Option from '../src/option.js';
import createOption from '../src/option/create-option.js';

var JOINTS = [
  " ",
  "  ",
  ", ",
  " , ",
  " ," 
];

var STRING_OPTS = [

  {
    options: ["-c"],
    results: {
      raw:   { char: '-c' },
      final: { char:  'c' },
    },
    willMatch: ['-c', 'c'],
    wontMatch: ['-d','d','--color','--d','--c'],
  },

  {
    options: ["-c","--color"],
    results: {
      raw:   { char: '-c', long: '--color' },
      final: { char: 'c',  long: 'color' },
    },
    willMatch: ['-c','c','--color'],
    wontMatch: ['-d','d','--d','--c'],
  },

  {
    options: ["-c", "--color", "{String}"],
    results: {
      raw:   { char: '-c' , long: '--color' , type:'{String}' } ,
      final: { char: 'c'  , long: 'color'   , type: 'String'  } ,
    },
    willMatch: [
      ['-c'      , 'red'   ],
      ['c'       , 'blue'  ],
      ['--color' , 'white' ],
      ['color'   , 'green' ],
    ],
    wontMatch: [
      '-c',
      '--color',
      ['-d'  , 'red'   ],
      ['d'   , 'blue'  ],
      ['--d' , 'white' ],
      ['--c' , 'green' ],
    ],
  },

  {
    options: ["-c","--color","{String}","<color>"],
    results: {
      raw:   { 
        char: '-c' , long: '--color' , type:'{String}', name:'<color>'
      } ,
      final: {
        char: 'c'  , long: 'color'   , type: 'String', name: 'color'
      },
    },
    willMatch: [
      ['-c'      , 'red'   ],
      ['c'       , 'blue'  ],
      ['--color' , 'white' ],
      ['color'   , 'green' ],
    ],
    wontMatch: [
      '-c',
      '--color',
      ['-d'  , 'red'   ],
      ['d'   , 'blue'  ],
      ['--d' , 'white' ],
      ['--c' , 'green' ],
    ],
  },

  {
    options: ["-c","--color","{String}","<color>","[pink]"],
    results: {
      raw:   { 
        char    : '-c',
        long    : '--color',
        type    : '{String}',
        name    : '<color>',
        default : '[pink]',
      },
      final: {
        char    : 'c',
        long    : 'color',
        type    : 'String',
        name    : 'color',
        default : 'pink',
      },
    },
    willMatch: [
      ['-c'      , 'red'   ],
      ['c'       , 'blue'  ],
      ['--color' , 'white' ],
      ['color'   , 'green' ],
      '-c',
      '--color',
    ],
    wontMatch: [
      '--c',
      '-color',
      ['-d'  , 'red'   ],
      ['d'   , 'blue'  ],
      ['--d' , 'white' ],
      ['--c' , 'green' ],
    ],
  },

  {
    options: ["-c","--color","{String}","<color=red>"],
    results: {
      raw:   { 
        char    : '-c',
        long    : '--color',
        type    : '{String}',
        name    : '<color=red>',
        default : '',
      },
      final: {
        char    : 'c',
        long    : 'color',
        type    : 'String',
        name    : 'color',
        default : 'red',
      },
    },
    willMatch: [
      ['-c'      , 'red'   ],
      ['c'       , 'blue'  ],
      ['--color' , 'white' ],
      ['color'   , 'green' ],
      '-c',
      '--color',
    ],
    wontMatch: [
      '--c',
      '-color',
      ['-d'  , 'red'   ],
      ['d'   , 'blue'  ],
      ['--d' , 'white' ],
      ['--c' , 'green' ],
    ],
  },

  {
    options: ["-c","--color","{String}","<color=red>","[pink]"],
    results: {
      raw:   { 
        char    : '-c',
        long    : '--color',
        type    : '{String}',
        name    : '<color=red>',
        default : '[pink]',
      },
      final: {
        char    : 'c',
        long    : 'color',
        type    : 'String',
        name    : 'color',
        default : 'pink',
      },
    },
  },

  {
    options: ["-c","--color","{String}","<color=red>","[pink]", 'The color'],
    results: {
      raw:   { 
        char    : '-c',
        long    : '--color',
        type    : '{String}',
        name    : '<color=red>',
        default : '[pink]',
        desc    : 'The color',
      },
      final: {
        char    : 'c',
        long    : 'color',
        type    : 'String',
        name    : 'color',
        default : 'pink',
        desc    : 'The color',
      },
    },
    willMatch: [
      ['-c'      , 'red'   ],
      ['c'       , 'blue'  ],
      ['--color' , 'white' ],
      ['color'   , 'green' ],
      '-c',
      '--color',
    ],
    wontMatch: [
      '--c',
      '-color',
      ['-d'  , 'red'   ],
      ['d'   , 'blue'  ],
      ['--d' , 'white' ],
      ['--c' , 'green' ],
    ],
  },

  // In boolean context, this flag could mean "should we show output in
  // color?"
  {
    options: ["-c","--color","{Boolean}","<color>", 'The color'],
    results: {
      raw:   { 
        char    : '-c',
        long    : '--color',
        type    : '{Boolean}',
        name    : '<color>',
        default : '',
        desc    : 'The color',
      },
      final: {
        char    : 'c',
        long    : 'color',
        type    : 'Boolean',
        name    : 'color',
        default : null,
        desc    : 'The color',
      },
    },
    willMatch: [
      ['-c'      , undefined , false] ,
      ['--color' , undefined , false] ,

      // Permitted truthy values
      ['--color' , "true" , true ],
      ['-c'      , "True" , true ],
      ['--color' , "TRUE" , true ],
      ['--color' , "TrUe" , true ],
      ['-c'      , "t"    , true ],
      ['--color' , "yes"  , true ],
      ['--color' , "Yes"  , true ],
      ['--color' , "YES"  , true ],
      ['--color' , "Y"    , true ],

      // Permitted falsey values
      ['--color' , "false" , false ] ,
      ['--color' , "False" , false ] ,
      ['-c'      , "FALSE" , false ] ,
      ['--color' , "FaLSe" , false ] ,
      ['--color' , "f"     , false ] ,
      ['--color' , "no"    , false ] ,
      ['-c'      , "No"    , false ] ,
      ['--color' , "NO"    , false ] ,
      ['--color' , "n"     , false ] ,
    ],
    wontMatch: [
      '-f',
      '--squid',
      ['--color', 'green'],
      ['-c', 'orange'],
    ],
  },

  // Because we are setting the "color" variable with a default of "true",
  // it means the --monotone flag is an *inversion* of the color value.  In
  // other words, the presence of --monotone negates the explicit "true"
  // default... in the same way a --color flag would negate the implicit
  // "false" default.
  {
    options: ["-m","--monotone","{Boolean}","<color>", "[true]", 'Display in monotone'],
    results: {
      raw:   { 
        char    : '-m',
        long    : '--monotone',
        type    : '{Boolean}',
        name    : '<color>',
        default : '[true]',
        desc    : 'Display in monotone',
      },
      final: {
        char    : 'm',
        long    : 'monotone',
        type    : 'Boolean',
        name    : 'color',
        default : 'true',
        desc    : 'Display in monotone',
      },
    },
    willMatch: [
      ['-m'         , undefined , false] ,
      ['--monotone' , undefined , false] ,

      // Permitted truthy values
      ['--monotone' , "true" , false ] ,
      ['-m'         , "True" , false ] ,
      ['--monotone' , "TRUE" , false ] ,
      ['--monotone' , "TrUe" , false ] ,
      ['-m'         , "t"    , false ] ,
      ['--monotone' , "yes"  , false ] ,
      ['--monotone' , "Yes"  , false ] ,
      ['--monotone' , "YES"  , false ] ,
      ['--monotone' , "Y"    , false ] ,

      // Permitted falsey values
      ['--monotone' , "false" , true ] ,
      ['--monotone' , "False" , true ] ,
      ['-m'         , "FALSE" , true ] ,
      ['--monotone' , "FaLSe" , true ] ,
      ['--monotone' , "f"     , true ] ,
      ['--monotone' , "no"    , true ] ,
      ['-m'         , "No"    , true ] ,
      ['--monotone' , "NO"    , true ] ,
      ['--monotone' , "n"     , true ] ,

    ],
    wontMatch: [
      '-f'          ,
      '--squid'     ,
      ['--monotone' , 'green']  ,
      ['-m'         , 'orange'] ,
    ],
  },

  {
    options: ["-c","--color","{String}","<color=red>",'The color'],
    results: {
      raw:   { 
        char    : '-c',
        long    : '--color',
        type    : '{String}',
        name    : '<color=red>',
        default : '',
        desc    : 'The color',
      },
      final: {
        char    : 'c',
        long    : 'color',
        type    : 'String',
        name    : 'color',
        default : 'red',
        desc    : 'The color',
      },
    },
  },

  {
    options: ["-c","--color","{String}","<color>",'The color'],
    results: {
      raw:   { 
        char    : '-c',
        long    : '--color',
        type    : '{String}',
        name    : '<color>',
        default : '',
        desc    : 'The color',
      },
      final: {
        char    : 'c',
        long    : 'color',
        type    : 'String',
        name    : 'color',
        default : null,
        desc    : 'The color',
      },
    },
  },

  {
    options: ["-c","{String}","<color>",'The color'],
    results: {
      raw:   { 
        char    : '-c',
        long    : '',
        type    : '{String}',
        name    : '<color>',
        default : '',
        desc    : 'The color',
      },
      final: {
        char    : 'c',
        long    : null,
        type    : 'String',
        name    : 'color',
        default : null,
        desc    : 'The color',
      },
    },
  },

  {
    options: ["--color","{String}","<color>",'The color'],
    results: {
      raw:   { 
        char    : '',
        long    : '--color',
        type    : '{String}',
        name    : '<color>',
        default : '',
        desc    : 'The color',
      },
      final: {
        char    : null,
        long    : 'color',
        type    : 'String',
        name    : 'color',
        default : null,
        desc    : 'The color',
      },
    },
  },

  {
    options: ["--color","{String}",'The color'],
    results: {
      raw:   { 
        char    : '',
        long    : '--color',
        type    : '{String}',
        name    : '',
        default : '',
        desc    : 'The color',
      },
      final: {
        char    : null,
        long    : 'color',
        type    : 'String',
        name    : null,
        default : null,
        desc    : 'The color',
      },
    },
  },

  {
    options: ["-c","{String}",'The color'],
    results: {
      raw:   { 
        char    : '-c',
        long    : '',
        type    : '{String}',
        name    : '',
        default : '',
        desc    : 'The color',
      },
      final: {
        char    : 'c',
        long    : null,
        type    : 'String',
        name    : null,
        default : null,
        desc    : 'The color',
      },
    },
  },

  // The next few versions just shuffle the argument order.
  {
    options: ["--color","-c", "{String}","<color=red>","[pink]", 'The color'],
    results: {
      raw:   { 
        char    : '-c',
        long    : '--color',
        type    : '{String}',
        name    : '<color=red>',
        default : '[pink]',
        desc    : 'The color',
      },
      final: {
        char    : 'c',
        long    : 'color',
        type    : 'String',
        name    : 'color',
        default : 'pink',
        desc    : 'The color',
      },
    },
  },
];



describe('Creating options', () => {

  OUTER: for (var i = 0; i < STRING_OPTS.length; i++) {
    let opts = STRING_OPTS[i];
    INNER: for (var j = 0; j < JOINTS.length; j++) {
      let joint = JOINTS[j];
      // Create the option string
      let optionString = opts.options.join(joint);

      test(optionString, () => {
        var option = createOption(optionString);
        for (var r in opts.results.raw) {
          expect(option.raw[r]).toBe(opts.results.raw[r]);
        }

        for (var f in opts.results.final) {
          expect(option[f]).toBe(opts.results.final[f]);
        }
      });
    }
  }

});

describe('matching options', () => {

  OUTER: for (var i = 0; i < STRING_OPTS.length; i++) {
    let opts = STRING_OPTS[i];
    let optionString = opts.options.join(' ');
    let option = createOption(optionString);

    describe(optionString, () => {
      if (opts.willMatch) {
        opts.willMatch.forEach(args => {
          if (!Array.isArray(args)) {
            args = [args];
          }

          test(`should match ${args}`, () => {
            expect(option.matches(...args)).toBe(true)
          });
        });
      }

      if (opts.wontMatch) {
        opts.wontMatch.forEach(args => {
          if (!Array.isArray(args)) {
            args = [args];
          }

          test(`shouldn't match ${args}`, () => {
            expect(option.matches(...args)).toBe(false)
          });
        });
      }
    });
  }
});

describe('testing values', () => {

  OUTER: for (var i = 0; i < STRING_OPTS.length; i++) {
    let opts = STRING_OPTS[i];
    let optionString = opts.options.join(' ');
    let option = createOption(optionString);

    if (opts.willMatch) {
      describe(optionString, () => {
        opts.willMatch.forEach(args => {
          if (!Array.isArray(args)) {
            args = [args];
          }

          if (args.length != 3) {
            return;
          }

          /*
          test(`should match "${[args[0],args[1]].join(' ')}" with value: ${args[2]}`, () => {
            expect(option.interpret(...args)).toBe(args[2])
          });
          */
        });
      });
    }
  }

});

