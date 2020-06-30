
import createOption from './option/create-option.js';

class Program {

  constructor () {
    this.options = [];
  }

  option (opt) {
    var option = createOption(opt);
    this.options.push(option);
    return this;
  }

  resetOptions () {
    this.options.forEach(opt => opt.reset());
    return this;
  }

  interp (args) {
    var nodePath   = args.shift();
    var scriptPath = args.shift();
    var results    = {};

    // Options can be with or without arguments.  For example, we could have
    // the following kinds:
    //
    //  --verbose
    //  --config ./my/path/config.json
    //
    // The tricky thing about this is that some arguments may have a default
    // value.  In that case, it could take either work as a flag or with an
    // argument.
    //
    // This is further complicated by the idea of sub-commands.
    //
    // Here is a representation of a program with subcommands:
    //
    //  CMD_A
    //  + -h --help {String} <help-topic> [program]  Display program help.
    //  |
    //  + CMD_B
    //  |   + -h --help {String} <help-topic> [program]  Display program help.
    //  |
    //  + CMD_C
    //  |   + -h --help {String} <help-topic> [program]  Display program help.
    //  |
    //  |   + CMD_E
    //  |     + -h --help {String} <help-topic> [program]  Display program help.
    //  |
    //  |   + CMD_F
    //  |     + -h --help {String} <help-topic> [program]  Display program help.
    //  |
    //  + CMD_D
    //  |   + -h --help {String} <help-topic> [program]  Display program help.
    //  
    //
    //

    // Loop through the available options.  For each option,
    this.options.forEach(opt => {
      for (var i = 0; i < args.length; i++) {
        let arg1 = args[i];
        let arg2 = args[i+1];

        if (!arg1 && !arg2) {
          continue;
        }

        // If the flag matches this option...
        if (opt.flagMatches(arg1)) {

          // If the next argument starts with - or -- then we know to treat
          // this as a flag with no arguments.
          if (arg2 && arg2.match && arg2.match(/^-/)) {
            opt.interpret(arg1);
            args.shift();
            i -= 1;
          }

          // If we get here, there's an arg2, and it doesn't start with -
          // and it also works as an arg for the current option.
          else if (arg2 && opt.matches(arg1, arg2)) {
            opt.interpret(arg1, arg2);
            args.shift();
            args.shift();
            i -= 2;
          }

          else {
            opt.interpret(arg1);
            args.shift();
            i -= 1;
          }
        }
      }

    });

    this.options.forEach(opt => {
      if (opt.registered) {
        let key = opt.name || opt.long || opt.short;
        results[key] = opt.value;
      }
    });

    return results;
  }

  entry (fxn) {
    this.entry = fxn;
  }

  run (args=process.argv) {
    this.resetOptions();
    let commandHash = this.interp(args);

    this.entry({
      command: commandHash,
      program: this
    });
  }

}

export default Program;
