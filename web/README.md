### Install dependencies

Firstly, ensure you have a suitable environment with nodejs, npm and yarn.
There are many approaches to this, for example using conda:

```sh
conda create -c conda-forge --name covariants nodejs=22
conda activate covariants
npm install -g yarn
```

Secondly, install node dependencies:
```sh
yarn install --frozen-lockfile
```

Finally, create a suitable build environment:
```sh
cp .env.example .env # .env is gitignored
```

### Build and serve a production bundle
```sh
yarn prod:build
yarn prod:serve # load localhost:8080
```


### Development mode

```sh
npm run dev:start # http://localhost:3000/
```

### Maintenance
SASS creates a lot of warnings because of API changes, those are silenced in `next.config.ts`. As this might mask 
warnings coming from our own code, be sure to check from time to time.

### Testing
Unit tests can be run using vitest via
```sh
yarn test:unit
```
This will run all tests in the `src` folder.

Storybook component tests can be run by starting storybook via
```sh
yarn storybook
```
and then running
```sh
yarn test:storybook
```
In the CI pipeline, storybook is built first and then run, see `.github/workflows/run_storybook_tests` for details. 

End-to-end tests can be run using playwright via
```sh
yarn test:e2e
```
If a development server is already running (e.g. via `yarn dev`), it will be used by playwright. To test the static build
used on prod, stop the development server, run `yarn prod:build`, then `yarn test:e2e` will start a server with the static
html build for the tests (see `playwright.config.ts`).
