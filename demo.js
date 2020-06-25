
import Program from './src/program.js';

var head = new Program();
head
  .option("-v --verbose {Boolean} [false] Whether to use verbose mode.");


head.run();
