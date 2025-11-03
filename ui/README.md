# ui
Portal UI for "2-Mann-Handling" (2-Men-Handling)

## Build & run locally with Docker

```bash
docker run --rm -it -v $PWD/:/opt/app-root/src docker.artifactory.dhl.com/ubi9/nodejs-22 bash
npm config set registry https://artifactory.dhl.com/api/npm/npm
npm install --verbose
node_modules/.bin/ng build --configuration=production
exit

docker build -t ui:mylocalbuild .

docker run --rm -it --name ui -v $PWD/deployment/nginx.conf:/template/nginx.conf -p 4200:8443 ui:mylocalbuild
```

## Build & run locally

#### Build

```bash

npm config set registry https://artifactory.dhl.com/api/npm/npm-remote/
npm install

```

#### Run

Via command line:

```bash
npm run start-local
```

or simply open npm window in your Intellij IDE and choose "start-local" from the list of npm scripts.
