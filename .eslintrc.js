module.exports = {
    "parser": "babel-eslint",
    "extends": "standard",
    "plugins": [
      "flowtype",
      "react"
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
