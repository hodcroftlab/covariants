### Install dependencies

Firstly, ensure you have a suitable environment with nodejs, npm and yarn.
There are many approaches to this, for example using conda:

```sh
conda create -c conda-forge --name covariants nodejs=14
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
yarn prod:serve:nowatch # load localhost:8080
```


### Development mode

```sh
npm run dev:start # http://localhost:3000/
```

### Maintenance
SASS creates a lot of warnings because of API changes, those are silenced in `next.config.ts`. As this might mask 
warnings coming from our own code, be sure to check from time to time.
