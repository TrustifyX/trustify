---
sidebar_position: 2
---

# Trustify Issuer Registry PVG

The issuer registry pre-viable governance (PVG) is a simple demonstration issuer registry without the [proper governance structure](/trustify/overview/governance-overview) in place. 

## Usage/Intent of the PVG Trustify Issuer Registry

The PVG Trustify Issuer Registry focuses exclusively on Issuer ID and authorization and leaves out of scope governance considerations. As such, this should be viewed as an experimental implementation for the initial Trustify issuers as the governance structure is being developed, with only manual and Centre-governed additions and removals until such a time as Trustify issuance can be communally self-governing.

The PVG Trustify Issuer Registry identifies entities authorized to issue Trustify credentials (segmented by different credential definitions); for each, it provides the exact issuer-service identifier (usually a DID) included in their Trustify credentials, along with associated metadata. 

On receipt of a Trustify credential, a verifier confirms:
1. the issuer, identified by ID (typically a DID) is in the issuer registry
2. the issuer is authorized to issue credentials containing attestations of type specified in the registry, andthe credential issuance date is later than `effectiveStart` and before`effectiveEnd`, if present.

### Context of the Issuer Registry
The Issuer Registry, along with the Issuer Rules associated with credential types and processes ([described further in Trustify Governance Overview](/trustify/overview/governance-overview)), helps achieve determinism in Trustify credential issuance, in the sense that identical identity claim inputs should lead, among different Trustify issuers, to the same decision to issue, or not to issue, a credential. The PVG version of the Issuer Registry is an experimental placeholder while the MVP is being developed.

### Limitations, Assumptions, Scope (of this document and in general)

- Offchain verification: as Trustify credential verification is an off-chain procedure, the issuer registry does not need to be on-chain
- Authorizations happen at the attestation level, and attestation types must be defined under schemas/0.0.1
- Out of scope for PVG
    - Trustify membership aspects of governance
    - Process-level authorizations and versioning

## Design

The PVG issuer registry will be stored off-chain as a JSON file in Trustify gihub repo (similar to Trustify credential schemas and processes).

The structure, usage, semantics, and lightweight governance is described here.

All is to be interpreted as experimental for PVG and subject to revision.

### Roles

The following roles are referred to below
- Trustify owners/administrators: 
    - Initially Trustify github repo (centrehq) administrators.
    - Sole technical/logistic ability to approval and merge PRs 
    - Later to be replaced with real governance/membership scheme
- Trustify participants:
    - Signing the Trustify Contributor License Agreement (CLA) is a prerequisite to be an issuer in the experimental phase or a co-designer of Trustify credentials and tooling; once formal governance is launched, it will not be a requirement

### Implementation

- Trustify issuer registry to be deployed as JSON file in Trustify github repo. Initial version: packages/docs/static/registries/issuer-registry-0.0.1-pvg.json
- As with Trustify processes and definitions, this file can be referenced with a canonical trustify.id URL, e.g., https://trustify.id/registries/issuer-registry-0.0.1-pvg.json

## Governance and Prerequisites

- Prerequisites: 
    - Organization must sign Trustify CLA
    - No substantive objections from WG members, as determined by WG chair
- Process for updates to issuer registry:
    - Any individual by any organization covered by Trustify CLA may open PR against Centre Trustify github org 
    - Trustify repo owners/administrators must review, approve, and merge
    - Github signed commits are required (they are enabled repo-wide on Trustify github repo)
