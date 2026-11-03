# Angular starter for Wodby

A single-page application for the [Wodby Angular service](https://github.com/wodby/service-angular) and
[Angular stack](https://github.com/wodby/stack-angular), generated with the Angular CLI and configured for static
deployment.

It includes:

- [Angular](https://angular.dev) with standalone components and zoneless change detection
- client-side routing with the Angular router, including a not-found page
- component tests with the Angular CLI's unit-test builder and [Vitest](https://vitest.dev)
- Wodby CI that tests, builds and deploys the static build, and checks it after each deployment

## Local development

```shell
npm install
npm start
```

Open <http://localhost:4200>. Edit `src/app/pages/home/home.html`; the page updates as you save.

Run the tests and build for production:

```shell
npm test
npm run build
```

`npm test` runs once; run `npx ng test` to keep the tests running while you edit.

## Project structure

- `src/app/app.html` — the layout around the current route.
- `src/app/app.routes.ts` — the routes. Add a component in `src/app/pages` and a route for it here.
- `src/app/pages` — one component per page.
- `src/app/app.spec.ts` — tests that render the application at a given URL.
- `src/styles.css` — the global styles.

## On Wodby

The pipeline in `.wodby/pipeline.yml` runs `npm ci`, `npm test` and `npm run build` in a Node.js container,
then builds the service image from `dist/angular-boilerplate/browser` only and deploys it. If you rename the
project in `angular.json` or change its output path, change `wodby ci build --from` as well. After each
deployment, `.wodby/post-deployment.yml` checks that Nginx is up and that a client-side route returns the
application.

- Nginx serves the files and answers every path that is not a file with `index.html`, so routes such as `/about`
  work when they are opened directly or reloaded. Built files have hashed names and are cached for a year.
- The application runs in the browser. Environment variables of the service, including `WODBY_*` and the variables
  of linked services, do not reach it. Values it needs must be in the build or fetched from an API at run time.
  Never put secrets in the build: everyone who opens the site can read them.

In a Wodby development workspace, the checkout runs with `ng serve` instead of Nginx: changes appear as you save
them, without a deployment. If the development server rejects the environment's host name, add it to
`allowedHosts` in the `serve` options of `angular.json`.
