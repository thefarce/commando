
import Program from './src/program.js';


//{opt: ['-t --type {Enum+} (a|b|c)'], run : ['--type', 'b', '-t', 'a'], get : {}},

var head = new Program();
head
  .option("-t --type {Enum+} (a|b|c)");

head.run();

console.log(head);


//console.log(head.options[0].description());

