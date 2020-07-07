module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  plugins: [
    'eslint-plugin-import',
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    // I'm not convinced this is the right way to handle this, but here we
    // are for now.
    "import/extensions": 0,

    // This is generally a code smell, but I don't think it is this time.
    // An alternate approach may be to make it a static method and use it
    // directly from the base class that way.
    "class-methods-use-this": [
      "error",
      {
        exceptMethods: [
          'normalizeFlagAndValue'
        ]
      }
    ],
    "no-plusplus": [
      "error",
      {
        "allowForLoopAfterthoughts": true
      }
    ],
    // I think I would rather this be turned on, but eslint doesn't seem to
    // allow stroustrup with comments, which is important to me.
    "brace-style": 0,
    "space-before-function-paren": 0,
    "import/no-named-as-default": 0,
    "key-spacing": [
      "error",
      {
        "align": {
          "on"          : "colon",
          "beforeColon" : true,
          "afterColon"  : true,
          "mode"        : "strict",
        },
      }
    ],
    "no-multi-spaces": [
      "error",
      {
        exceptions: {
          ImportDeclaration: true,
          VariableDeclarator: true,
        }
      }
    ]
  },
};
