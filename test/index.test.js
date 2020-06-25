import Option   from '../src/option.js';
import Program  from '../src/program.js';
import commando from '../src/index.js';

describe('@thefarce/commando root module', () => {

  test('module exports', () => {
    expect(commando.Program).toBe(Program);
    expect(commando.Option).toBe(Option);
  });

});

