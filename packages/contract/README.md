# Verite Smart Contract Examples

These recipes illustrate how smart contracts use results of Verifiable Credential verifications even when the contracts are not technically or economically capable of executing the verifications themselves.

These contracts follow a pattern in which verifications are performed off-chain and then confirmed on-chain. An off-chain verifier handles verifiable credential exchange in the usual manner, and upon successful verification, creates a minimal verification result object.

The verifier then hashes and signs the verification result, enabling subsequent validation within smart contracts. The verifier either registers the result directly with a Verification Registry contract as part of the verification process (the "verifier submission" pattern), or returns it to subjects for use in smart contract transactions (the "subject submission" pattern).

## Contract Description

**VerificationRegistry**: Demonstrates a persistent verification registry, supporting management of verifiers and verification results as follows:

- The contract owner is able to manage (register/remove) verifiers
- Rgistered verifiers may manage verification results they've created and signed.
- Subject may manage verification result they've received from a registered verifier (through an internal function; this is demonstrated in `ThresholdToken`)

`VerificationRegistry` converts a valid, authentic verification result to a data-minimized verification record before persisting.

**PermissionedToken**: This token uses `VerificationRegistry` by delegation to support KYC verifications. The `beforeTokenTransfer` hook, which executes as part of the OpenZeppelin ERC20 transfer implementation, ensures that the sender and recipient are verified counterparties. This contract demonstrates the verifier submission pattern; only registered verifiers may populate the registry.

**ThresholdToken**: Demonstrates a token requiring sender verification for transfers over a pre-defined threshold.
This contract demonstrates the subject submission pattern: `ThresholdToken` extends `VerificationRegistry` to support subject submission of verification results via the custom function `validateAndTransfer` (which in turn calls an internal `VerificationRegistry` function). The `beforeTokenTransfer` hook emits an error if a valid verification record isn't present for the sending address in the `VerificationRegistry`. Note: in the Dapp demo, this is what cases the Dapp to initiate a credential request from the holder/subject.

## Getting Started

```
npx hardhat node
```

Run a standalone hardhat node as noted above. Then deploy the contract:

```
npx hardhat run scripts/deploy.ts --network localhost
```
