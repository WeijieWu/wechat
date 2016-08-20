module.exports = {
  "extends": "google",
  "installedESLint": true,
  "parser": "babel-eslint",
  "standard": {
    "parser": "babel-eslint"
  },
  "rules": {
    "arrow-parens": 0,
    "babel/generator-star-spacing": 1,
    "babel/new-cap": 1,
    "babel/array-bracket-spacing": 1,
    "babel/object-curly-spacing": 1,
    "babel/object-shorthand": 1,
    "babel/arrow-parens": 1,
    "babel/no-await-in-loop": 1,
    "babel/flow-object-type": 1,
    "babel/func-params-comma-dangle": 1,
    "valid-jsdoc": 0,
    "allowShortCircuit": true
  },
  "plugins": [
    "babel"
  ],
  "globals": {
    "describe": true,
    "it": true
  }
};