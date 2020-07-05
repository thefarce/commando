module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
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
