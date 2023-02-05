# Trustify Hyperspace Testnet Deployment

## Cloning the Repo

```
git clone https://github.com/TrustifyX/trustify
git checkout hyperspace-deploy
cd packages/contract
npm install
```

## Get Private Key

You can get a private key from a wallet provider [such as Metamask](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key).

## Add Private Key


 ```
cp .env.example .env
```
Add your private key in `.env` file.


## Get the Deployer Address

Run this command:
```
yarn hardhat get-address
```

The will show you the ethereum-style address associated with that private key and the filecoin-style f4 address (also known as t4 address on testnets).


## Fund the Deployer Address

Go to the [Hyperspace testnet faucet](https://hyperspace.yoga/#faucet), and paste in the Ethereum address from the previous step. This will send some hyperspace testnet FIL to the account.


## Deploy the Contracts

Type in the following command in the terminal to deploy all contracts:

 ```
npx hardhat run scripts/deploy.ts --network hyperspace
```

## Deployed Contract Address
```
Deploying the contracts with the account: 0x5E113EDC0eaf00699889FC510DB121308bBA1261
Account balance: 13686863601833078200
deploy registryContract
Registry address: 0xf76DC8000b199960c6210FE29bff939c74DaA9b0
deploy permissionedToken
Permissioned Token Address: 0x36Fd3a3865e87da00FE518B6aa1770603bDf5E5F
deploy ThresholdToken
Threshold Token address: 0xA526EDBC00165297b990500f811B798491abB96e
Added trusted verifier: 0x5E113EDC0eaf00699889FC510DB121308bBA1261
Added trusted verifier: 0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1
Registered Verification for address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, by verifier: 0x5E113EDC0eaf00699889FC510DB121308bBA1261
Registered Verification for address: 0x695f7BC02730E0702bf9c8C102C254F595B24161, by verifier: 0x5E113EDC0eaf00699889FC510DB121308bBA1261
Registered Verification for address: 0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1, by verifier: 0x5E113EDC0eaf00699889FC510DB121308bBA1261
Registered Verification for address: 0x70997970c51812dc3a010c7d01b50e0d17dc79c8, by verifier: 0x5E113EDC0eaf00699889FC510DB121308bBA1261
Registered Verification for address: 0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc, by verifier: 0x5E113EDC0eaf00699889FC510DB121308bBA1261
Registered Verification for address: 0x90f79bf6eb2c4f870365e785982e1f101e93b906, by verifier: 0x5E113EDC0eaf00699889FC510DB121308bBA1261
```