import createOption from './option/create-option.js';

/**
 * Program.
 */
class Program {
  constructor (parent = null) {
    this.options          = [];
    this.subcommands      = {};
    this.arguments        = [];
    this.parentProgram    = parent;
    this.hasRunSubcommand = false;
  }

  /**
   * option.
   *
   * @param {} opt
   */
  option (opt) {
    const option = createOption(opt);
    this.options.push(option);
    return this;
  }

  subcommand (name, program = null) {
    let subcmd = program;
    if (!subcmd) {
      subcmd = new Program(this);
    }

    subcmd.parentProgram = this;
    this.subcommands[name] = subcmd;

    return subcmd;
  }

  parent () {
    return this.parentProgram;
  }

  resetOptions () {
    this.options.forEach((opt) => opt.reset());
    return this;
  }

  /**
   * Interprets program's specification.  This includes 
   *
   */
  interpret (args) {
    const results = { $registered: {} };

    // Check to see if we should shunt into a subcommand.
    if (this.subcommands[args[0]]) {
      const subcmdName = args.shift();
      this.subcommands[subcmdName].run(args);
      this.hasRunSubcommand = true;
      return results;
    }

    // Loop through the available options.  For each option...
    for (let o = 0; o < this.options.length; o++) {
      const opt = this.options[o];

      // We're looping through the arguments, taking in the next
      // argument and looking forward at the following argument.  
      //
      // By capturing both with a look-ahead, we can determine if the
      // following argument is related to the current argument or not.  If
      // so, we can consume it and skip over interpreting it here.  If not,
      // we process the current argument (arg1) and when we're done, step
      // forward one argument.
      for (let i = 0; i < args.length; i++) {
        const arg1 = args[i];
        const arg2 = args[i + 1];

        // We need at least arg1, but can also accept an arg2.  Only
        // continue if we have at least one.
        if ((arg1 || arg2) && opt.flagMatches(arg1)) {
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
    }

    this.options.forEach((opt) => {
      const key = opt.name || opt.long || opt.short;

      if (opt.registered) {
        results.$registered[key] = opt.value;
        results[key] = opt.value;
      } else if (typeof results[key] === 'undefined') {
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

  run (rawArgs) {
    let args = rawArgs;

    if (!args) {
      args = process.argv;
      this.nodePath = args.shift();
      this.scriptPath = args.shift();
    }

    this.resetOptions();
    const commandHash = this.interpret(args);

    if (!this.hasRunSubcommand) {
      this.entry({
        options : commandHash,
        program : this,
      });
    }
  }
}

export default Program;
