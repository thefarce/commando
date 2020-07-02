
import Program from '../src/program.js';

describe("subcommand", () => {

  test("implicit subcommand creation", () => {
    let program = new Program();
    expect(program.subcommand('subcmd')).toBeInstanceOf(Program);
  });

  test("explicit subcommand creation", () => {
    let program = new Program();
    let subcommand = new Program()
      .option('-t --test');
    program.subcommand('subcmd', subcommand);

    expect(program.subcommands.subcmd).toMatchObject(subcommand);
  });

  test("subcommand parentage", () => {
    let program = new Program();
    let subcommand = program.subcommand('subcmd');
    expect(subcommand.parent() === program).toBe(true);
  });

  test("running subcommands", () => {
    let testable = false;

    let program = new Program();
    program
      .subcommand('subcmd')
        .entry(() => { testable = 'set from subcommand' });

    program.run(['subcmd'])
    expect(testable).toBe('set from subcommand');
  });

  test("getting remaining arguments", () => {
    let program = new Program();
    program.subcommand('subcmd');

    program.run(['subcmd', 'pigs', 'fly'])
    expect(program.subcommands.subcmd.arguments).toMatchObject(['pigs', 'fly']);
  });

});
