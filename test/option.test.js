import Option from '../src/option';

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
    }
  },

  {
    options: ["-c","--color"],
    results: {
      raw:   { char: '-c', long: '--color' },
      final: { char: 'c',  long: 'color' },
    },
  },

  {
    options: ["-c","--color","{String}"],
    results: {
      raw:   { char: '-c' , long: '--color' , type:'{String}' } ,
      final: { char: 'c'  , long: 'color'   , type: 'String'  } ,
    },
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
    options: ["-c","--color","{String}","<color=red>","[pink]", 'The color.'],
    results: {
      raw:   { 
        char    : '-c',
        long    : '--color',
        type    : '{String}',
        name    : '<color=red>',
        default : '[pink]',
        desc    : 'The color.',
      },
      final: {
        char    : 'c',
        long    : 'color',
        type    : 'String',
        name    : 'color',
        default : 'pink',
        desc    : 'The color.',
      },
    },
  },

  {
    options: ["-c","--color","{String}","<color=red>",'The color.'],
    results: {
      raw:   { 
        char    : '-c',
        long    : '--color',
        type    : '{String}',
        name    : '<color=red>',
        default : '',
        desc    : 'The color.',
      },
      final: {
        char    : 'c',
        long    : 'color',
        type    : 'String',
        name    : 'color',
        default : 'red',
        desc    : 'The color.',
      },
    },
  },

  {
    options: ["-c","--color","{String}","<color>",'The color.'],
    results: {
      raw:   { 
        char    : '-c',
        long    : '--color',
        type    : '{String}',
        name    : '<color>',
        default : '',
        desc    : 'The color.',
      },
      final: {
        char    : 'c',
        long    : 'color',
        type    : 'String',
        name    : 'color',
        default : null,
        desc    : 'The color.',
      },
    },
  },

  {
    options: ["-c","{String}","<color>",'The color.'],
    results: {
      raw:   { 
        char    : '-c',
        long    : '',
        type    : '{String}',
        name    : '<color>',
        default : '',
        desc    : 'The color.',
      },
      final: {
        char    : 'c',
        long    : null,
        type    : 'String',
        name    : 'color',
        default : null,
        desc    : 'The color.',
      },
    },
  },

  {
    options: ["--color","{String}","<color>",'The color.'],
    results: {
      raw:   { 
        char    : '',
        long    : '--color',
        type    : '{String}',
        name    : '<color>',
        default : '',
        desc    : 'The color.',
      },
      final: {
        char    : null,
        long    : 'color',
        type    : 'String',
        name    : 'color',
        default : null,
        desc    : 'The color.',
      },
    },
  },

  {
    options: ["--color","{String}",'The color.'],
    results: {
      raw:   { 
        char    : '',
        long    : '--color',
        type    : '{String}',
        name    : '',
        default : '',
        desc    : 'The color.',
      },
      final: {
        char    : null,
        long    : 'color',
        type    : 'String',
        name    : null,
        default : null,
        desc    : 'The color.',
      },
    },
  },

  {
    options: ["-c","{String}",'The color.'],
    results: {
      raw:   { 
        char    : '-c',
        long    : '',
        type    : '{String}',
        name    : '',
        default : '',
        desc    : 'The color.',
      },
      final: {
        char    : 'c',
        long    : null,
        type    : 'String',
        name    : null,
        default : null,
        desc    : 'The color.',
      },
    },
  },

  // The next few versions just shuffle the argument order.
  {
    options: ["--color","-c", "{String}","<color=red>","[pink]", 'The color.'],
    results: {
      raw:   { 
        char    : '-c',
        long    : '--color',
        type    : '{String}',
        name    : '<color=red>',
        default : '[pink]',
        desc    : 'The color.',
      },
      final: {
        char    : 'c',
        long    : 'color',
        type    : 'String',
        name    : 'color',
        default : 'pink',
        desc    : 'The color.',
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
        var option = new Option(optionString);

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

