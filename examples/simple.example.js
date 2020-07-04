import Program from '../src/index.js';

var program = new Program();

program.entry(() => console.log("Run this from the command line with no arguments.  Running with arguments does nothing in this simple example."));

program.run();
