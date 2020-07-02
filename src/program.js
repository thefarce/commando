
import createOption from './option/create-option.js';

class Program {

  constructor (parent=null) {
    this.options          = [];
    this.subcommands      = {};
    this.arguments        = [];
    this._parent          = parent;
    this.hasRunSubcommand = false;
  }

  option (opt) {
    var option = createOption(opt);
    this.options.push(option);
    return this;
  }

  subcommand (name, program=null) {
    if (!program) {
      program = new Program(this);
    }

    program._parent = this;
    this.subcommands[name] = program;

    return program;
  }

  parent () {
    return this._parent;
  }

  resetOptions () {
    this.options.forEach(opt => opt.reset());
    return this;
  }

  interpret (args) {
    var results    = {};

    // Check to see if we should shunt into a subcommand.
    if (this.subcommands[args[0]]) {
      let subcmdName = args.shift();
      this.subcommands[subcmdName].run(args);
      this.hasRunSubcommand = true;
      return results;
    };

    // Loop through the available options.  For each option,
    for (var o = 0; o < this.options.length; o++) {
      let opt = this.options[o];

      for (var i = 0; i < args.length; i++) {
        let arg1 = args[i];
        let arg2 = args[i+1];

        // If there's no arg1 or arg2 (including just falsey versions of
        // them... maybe this should change some time?
        if (!arg1 && !arg2) {
          continue;
        }

        // If the flag matches this option...
        else if (opt.flagMatches(arg1)) {
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

          // If there is an arg1 and it matches this option, interpret it
          // alone.
          else if (arg1 && opt.matches(arg1)) {
            opt.interpret(arg1);
            args.shift();
            i -= 1;
          }

          // This cannot be interpreted as an option, so treat it as an
          // argument to the command (including subcommands).
          else {
            this.arguments.push(arg1);
            args.shift();
            i -= 1;
          }
        }
      }

    };

    this.options.forEach(opt => {
      if (opt.registered) {
        let key = opt.name || opt.long || opt.short;
        results[key] = opt.value;
      }
    });

    this.arguments = this.arguments.concat(args);

    return results;
  }

  entry (fxn) {
    this.entry = fxn;
    return this;
  }

  run (args) {
    if (!args) {
      args = process.argv;
      var nodePath   = args.shift();
      var scriptPath = args.shift();
    }

    this.resetOptions();
    let commandHash = this.interpret(args);

    if (!this.hasRunSubcommand) {
      this.entry({
        command: commandHash,
        program: this
      });
    }
  }

}

export default Program;
