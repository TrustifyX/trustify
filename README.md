# Trustify

An open, shared, interoperable Verifiable Credential standard to empower DeFi protocols, DataDAOs, and Filecoin Plus in the FEVM ecosystem. 

### Requirements

- Node.js v16 (`nvm use v16`)
- npm v7 or greater (`npm i -g npm@7`)

### Project Structure

- [contract](./packages/contract) - two examples ERC20 contracts that implement Trustify's Verifiable Credential standard
- [e2e-demo](./packages/e2e-demo) - demos for different Trustify use cases
- [trustify](./packages/trustify) - the core Javascript SDK for issuance, verification, and revocation of Verifiable Credential
- [wallet](./packages/wallet) - a demo wallet for storing and submitting credentials

### Development Environment Setup

Setting up a new development environment:

```sh
npm run setup
```

Starting a local hardhat node:

```sh
npm run hardhat:node
```

Deploying example smart contracts:

```sh
npm run hardhat:deploy
```

Starting local demos:

```sh
npm run dev
```

Starting the demo wallet:

```sh
npm run wallet
```



