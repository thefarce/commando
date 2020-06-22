import Option   from '../src/option';
import Program  from '../src/program';
import commando from '../src/index';

describe('@thefarce/commando root module', () => {

  test('module exports', () => {
    expect(commando.Program).toBe(Program);
    expect(commando.Option).toBe(Option);
  });

});

