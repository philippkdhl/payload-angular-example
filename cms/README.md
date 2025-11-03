# CMS with Payload

## Build

### Locally

1. `cd cms && cp .env.example .env` to copy the example environment variables. You'll need to modify the `MONGODB_URI`.
2. `pnpm install && pnpm dev` to install dependencies and start the dev server
3. open `http://localhost:3000` to open the app in your browser

That's it! Changes made in `./src` will be reflected in your app. Follow the on-screen instructions to login and create your first admin user. Then check out [Production](#production) once you're ready to build and serve your app, and [Deployment](#deployment) when you're ready to go live.

### Docker

```
docker build -t 2mh-cms --progress=plain .
```

### Production
The production build is done via CI/CD pipeline. See `.github/workflows/build-cms.yaml` for more information.

