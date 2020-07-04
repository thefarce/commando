import Program from '../src/index.js';

var program = new Program();

program
  .option('-v --verbose')
  .option('-p --pigs')
  .entry(prog => {
    console.log(`
In the following data, notice that both 'verbose' and 'pigs' have values,
but only one of them has a *registered* value.

You can access the registered values through the .$registered property of
the entry function's argument.

The programs arguments are: ${JSON.stringify(prog.options, undefined, 2)}
    `);
  });

program.run();
