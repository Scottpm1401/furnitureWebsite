![Node](https://img.shields.io/badge/node%40latest-%3E%3D16.16.0-red) ![Yarn](https://img.shields.io/badge/yarn%40latest-%3E%3D1.22.19-yellow) ![Next](https://img.shields.io/badge/next-12.2.3-brightgreen)

# Furniture Web

### Getting start

##### Run the development server (NodeJS):

```bash
$ yarn dev
```

The application is now running on http://localhost:3000.

##### Run production mode (NodeJS):

```bash
$ yarn build
$ yarn start
```

The application is now running on http://localhost:3000.

### Editor Config

If you use VSCode, I recommend you tell VSCode to auto-fix eslint errors on save.
Open `settings.json` or at root folder create a `.vscode/settings.json` file with the following content:

```json
"editor.codeActionsOnSave": { "source.fixAll.eslint": true },
"editor.formatOnSave": true,
```

### Code Rule

##### File naming convention

Noun adjunct / Adjective Modifiers / Verb + Noun

```js
// CreateTaskModal.tsx
// CreateChannelButton.tsx
```

##### Name functions

Function names should be start with verbs.

##### Variable naming convention

- `PascalCase`: for component, component folder, type, interface.
- `camelCase`: for global scope (available for change), component scope, function scope.
- `UPPERCASE`: for global scope (constant not available for change), supplement with snake_case (ex: ROUTES_API)
