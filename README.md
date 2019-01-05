# LibraryCapacityBackend

## Setting up VS Code Development Environment

Install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) vscode extensions

Add the following to your vscode settings

```
"editor.formatOnSave": true, // run pritter and eslint on save
"javascript.format.enable": false, // disable default vscode javascript formatter
"prettier.eslintIntegration": true, // use eslint with prettier
```

## Getting Started

Install dependencies

```
npm install
```

Running in development

```
npm run dev
```

Running in production

```
npm start
```

Running tests / linting

```
npm test

npm run lint
```
