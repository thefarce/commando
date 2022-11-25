/*
suite(describe, ['Version 1.0.0', 'Program', 'Options'], () => {
  test(...);
});
*/

// A recursive function for flattening nested describe() statements in jest.
export default function suite (nodes, inner) {
  if (nodes.length === 1) {
    describe(nodes.shift(), inner);
  } else if (nodes.length > 1) {
    describe(nodes.shift(), () => {
      suite(nodes, inner);
    });
  }
}

