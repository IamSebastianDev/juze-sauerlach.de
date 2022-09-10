<!-- @format -->

# CLI

## Necessary software & tools

The following tools and softwares are necessary to develop this application:

| name    | version             | link                                                  |
| ------- | ------------------- | ----------------------------------------------------- |
| Node.js | ^18.x (recommended) | [Node.js v18](https://nodejs.org/en/)                 |
| yarn    | ^1.22.x             | [yarn](https://yarnpkg.com/getting-started)           |
| Docker  | ^20.10.x            | [Docker Desktop](https://docs.docker.com/get-docker/) |

After installing the necessary tools, you can run the commands below to start developing.

## Development

-   clone the repository by running `git clone https://github.com/IamSebastianDev/juzeSauerlach.git .` in your terminal or shell to clone the repo into the current directory.
-   run `yarn` to install dependencies. This will also install the necessary husky scripts.
-   run `yarn dev` to start bundling the frontend application using [rollup](https://rollupjs.org/).
-   run `yarn serve` to start the backend application using nodemon to continuously restart the application on changes to the server code.

The development environment will be available under [http://localhost:3000](http://localhost:3000) in your browser.

### Additional commands overview

-   run `yarn db:down` to docker-compose down the MongoDB container instance.
-   run `yarn db:up` to docker-compose up the MongoDB container instance manually.
-   run `yarn db:reset` to reset and reseed the database.
-   run `yarn build` to build the frontend resources.
-   run `yarn build:prod` to build the frontend resources in production mode.
-   run `yarn start` to run the server.

### Project structure

The project is split into two distinct parts:

-   The [backend application](./server/) that serves the content and connects the front- and backend.
-   The [frontend application](./site/) that encompasses the consumer frontend and the cms written for the application. For more information on the frontend application, take a look at it's [readme](./site/readme.md)

### Git structure

To develop a feature, checkout a new Branch from `development` and prefix it with the correct branch type. The project currently differentiates between two branch types, `feature` and `bugfix`. For example, a branch to fix a bug would be created like this:

```bash
$ git checkout development
# checkout development as basis for development
$ git checkout -b bugfix/bug-to-fix
# creates a new branch with the correct branch type prefixed
```

After writing your feature or fix, push to the repo and create a pull request to the `development` branch.

### Conventional commits

The project uses [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to ensure a certain commit message style.

-   `feat`: Used when adding features to the application.
-   `fix`: Used when fixing a bug or issue.
-   `refactor`: Used when changing or improving code that is not a new feature or bug.
-   `chore`: Used when updating none application related code.

### Formatting

The project uses prettier to format the code to conform to a certain style. Formatting is enforced using [pretty-quick](https://www.npmjs.com/package/pretty-quick) as a pre-commit hook.

## CMS

The server encompasses a simple CMS. It is available under [http://localhost:3000/dashboard](http://localhost:3000/dashboard). If you have seeded the database beforehand, a default used is created with the following credentials:

-   [admin@juzesauerlach.de](admin@juzesauerlach.de) : admin
