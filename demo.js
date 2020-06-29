
import Program from './src/program.js';

var head = new Program();
head
  .option("-v --verbose {Boolean} [false] Turn on verbose mode.")
  .option("-q --quiet {Boolean} <verbose> [true] Use quiet mode.")
  .entry(function (ctrl) {
    console.log("CONTROL:", ctrl);
  });

head.run();

//console.log(head.options[0].description());

