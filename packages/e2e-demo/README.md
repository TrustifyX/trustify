# Trustify E2E Demo

This package contains examples showcasing issuance, verification, and revocation of Verifiable Credentials using the Trustify protocols.

Additional examples showcase a DeFi use-case and smart contract integration, and a central custody service example in which Verifiable Credentials are generated dynamically.

## Getting Started

### Requirements

- Node.js v16
- npm v7 or greater (`npm i -g npm@7`)

### Installation

This package is set up as an [npm workspace](https://docs.npmjs.com/cli/v7/using-npm/workspaces) (requires npm v7 or greater), and as such, the dependencies for all included packages are installed from the root level using `npm install`. Do not run `npm install` from this directory.

From the root of the monorepo, run:

```sh
npm run setup
```

### Starting the app

From the root of the monorepo, simply run:

```sh
npm run dev
```

### Database

This app uses a local [sqlite](https://sqlite.org/_) database to maintain state, and uses [prisma](https://prisma.io) to access the database from code.

There are several database scripts which can be helpful during development:

#### Migrate the database

```sh
npm run db:migrate
```

#### Reset local database (rebuild and seed)

```sh
npm run db:reset
```

#### Seed local database

```sh
npm run db:seed
```

#### Inspect local database contents

```sh
npm run prisma studio
```

