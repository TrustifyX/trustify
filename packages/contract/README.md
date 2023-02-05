# Trustify Smart Contract Examples

These recipes illustrate how smart contracts use results of Verifiable Credential verifications even when the contracts are not technically or economically capable of executing the verifications themselves.

These contracts follow a pattern in which verifications are performed off-chain and then confirmed on-chain. An off-chain verifier handles verifiable credential exchange in the usual manner, and upon successful verification, creates a minimal verification result object.

The verifier then hashes and signs the verification result, enabling subsequent validation within smart contracts. The verifier either registers the result directly with a Verification Registry contract as part of the verification process (the "verifier submission" pattern), or returns it to subjects for use in smart contract transactions (the "subject submission" pattern).

## Contract Description

## Getting Started
