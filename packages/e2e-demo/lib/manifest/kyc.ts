import { buildKycAmlManifest } from "trustify"

import { fullURL } from "../utils"
import { manifestIssuer } from "./issuer"

import type { CredentialManifest } from "trustify"

export const kycManifest: CredentialManifest = buildKycAmlManifest(
  manifestIssuer,
  {
    thumbnail: {
      uri: fullURL("/img/kyc-aml-thumbnail.png"),
      alt: "Trustify Logo"
    },
    hero: {
      uri: fullURL("/img/kyc-aml-hero.png"),
      alt: "KYC+AML Visual"
    },
    background: {
      color: "#EC4899"
    },
    text: {
      color: "#FFFFFF"
    }
  }
)
