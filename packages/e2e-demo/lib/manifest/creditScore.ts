import { buildCreditScoreManifest } from "trustify"

import { fullURL } from "../utils"
import { manifestIssuer } from "./issuer"

import type { CredentialManifest } from "trustify"

export const creditScoreManifest: CredentialManifest = buildCreditScoreManifest(
  manifestIssuer,
  {
    thumbnail: {
      uri: fullURL("/img/credit-score-thumbnail.png"),
      alt: "Trustify Logo"
    },
    hero: {
      uri: fullURL("/img/credit-score-hero.png"),
      alt: "Reputation Score Visual"
    },
    background: {
      color: "#8B5CF6"
    },
    text: {
      color: "#FFFFFF"
    }
  }
)
