module.exports = {
    "parser": "babel-eslint",
    "extends": "standard",
    "plugins": [
      "flowtype",
      "plugin:react/recommended"
    ],
    rules: {
      'no-return-await': 0,
      'space-before-function-paren': ["error", {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "always"
      }]
    }
}
