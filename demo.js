
import Program from './src/program.js';


//{opt: ['-t --type {Enum+} (a|b|c)'], run : ['--type', 'b', '-t', 'a'], get : {}},

var head = new Program();

head
  .option("-t --type {Enum+} (a|b|c)")
  .option("-c --cool {Boolean}")
  .entry((handler) => { console.log("handling the basic command"); })
  .subcommand("pigs")
    .option('-f --figs')
    .option('-g --gaff')
    .subcommand('checkout')
      .option('-g --gaff')
      .entry((handler) => { console.log("handling checkout"); })
      .parent()
  .entry((handler) => { console.log("handling pigs", handler); })
  .subcommand('biff')  
    .entry((handler) => { console.log("handling biff"); })
;

head.run();

console.log(head);


//console.log(head.options[0].description());

