import Program from '../src/index.js';
import suite   from './suite-generator.js';

suite(['Version 1.0.0', 'Program'], () => {

  test("construction permits assigning a parent program", () => {
    let prog1 = new Program();
    let prog2 = new Program(prog1);

    expect(prog2 === prog1).toBe(false);
    expect(prog2.parent() === prog1).toBe(true);
  });

  describe("Options", () => {
    test("can be created inline.", () => {
      let prog = new Program();
      expect(prog.options.length).toBe(0);
      prog.option('-a --apple');
      expect(prog.options.length).toBe(1);
    });

    test("#options() returns the containing program", () => {
      let prog = new Program();
      let _prog = prog.option('-a --apple');
      expect(prog === _prog).toBe(true);
    });

    test('duplicate options throw an error', () => {
      let prog = new Program();
      expect(() => {
        prog
          .option('-c --cool')
          .option('-c --cool');
      }).toThrow();
    });
  });

  describe("Subcommands", () => {
    test('duplicate subcommands throw an error', () => {
      let prog = new Program();
      expect(() => {
        prog
          .subcommand('subcmd').parent()
          .subcommand('subcmd');
      }).toThrow();
    });

    test("can be created inline", () => {
      let prog = new Program();
      expect(Object.keys(prog.subcommands).length).toBe(0);
      prog.subcommand('subcmd');
      expect(Object.keys(prog.subcommands).length).toBe(1);
    });

    test("#subcommand() returns the subcommand program", () => {
      let prog = new Program();
      expect(Object.keys(prog.subcommands).length).toBe(0);
      let subcmd = prog.subcommand('subcmd');
      expect(subcmd).toBeInstanceOf(Program);
      expect(subcmd === prog).toBe(false);
    });

    test("#parent() returns the parent program", () => {
      let prog = new Program();
      expect(Object.keys(prog.subcommands).length).toBe(0);
      let subcmd = prog.subcommand('subcmd');
      expect(subcmd).toBeInstanceOf(Program);
      expect(subcmd === prog).toBe(false);
      expect(subcmd.parent() === prog).toBe(true);
    });

  });
});
