# Development Setup (Node + nvm)

Very brief steps to set up this repo on any machine.

## 1) Install nvm (if not installed)
- macOS/Linux:
  ```sh
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
  # then start a new shell, or:
  . "$HOME/.nvm/nvm.sh"
  ```
- Docs: https://github.com/nvm-sh/nvm

## 2) Use the project Node version
From the project root (this repo has a `.nvmrc`):
```sh
nvm install   # installs the version from .nvmrc
nvm use       # activates it for this shell
node -v       # verify
npm -v
```

## 3) Install dependencies (if applicable)
If the project has a `package.json`:
```sh
npm install
```

## Daily use
- Run `nvm use` in new terminals inside this folder.
- Project dependencies live in `node_modules/` in the repo directory.
