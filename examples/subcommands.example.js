import Program from '../src/index.js';

var program = new Program();

program
  .subcommand('demo')
    .entry(prog => {
      console.log(`
A subcommand is simply a new Program.  You can link programs together to
form arbitrary tree structures.  Each subcommand is a branch of the program
that can have its own, contained logic.

You can put each subcommand in its own file, or you can simply create them
all together.  This example is a simple program with a single, simple
subcommand.

If you run this program without using the subcommand, nothing will happen,
because we have not defined a handler for the main program, nor have we
defined any options.  But if you use the subcommand, it will display this
information.
    `);
  });

program.run();
