


Install dependencies:
```sh
npm install
```

## Tests

If you're using WSL, make sure you run the tests on WSL's filesystem, not on window's. Otherwise the tests will be super slow.

Run unit tests:
```sh
npm test
```

## Linting and formatting

Install eslint's CLI:

```sh
npm i -g eslint
```

Run the linter on all the project:
```sh
eslint .
```

Or file by file:

Run the linter on all the project:
```sh
eslint file.js
```

Fix auto-fixable problems:

```sh
eslint --fix
```

Very recommended: [Configure VS Code to auto-format the code on save according to eslint rules](https://nickymeuleman.netlify.app/blog/automagically-lint#bonus-prettier-vscode-extension).