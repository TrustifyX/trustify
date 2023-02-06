import { v4 as uuidv4 } from "uuid"
import { buildCredentialOffer } from "trustify"

import { apiHandler } from "../../../../../../lib/api-fns"
import { NotFoundError } from "../../../../../../lib/errors"
import { MANIFEST_MAP } from "../../../../../../lib/manifest"
import { fullURL } from "../../../../../../lib/utils"

import type { CredentialOffer } from "trustify"

export default apiHandler<CredentialOffer>(async (req, res) => {
  const manifestName = req.query.type as string
  const token = req.query.token as string
  const manifest = MANIFEST_MAP[manifestName]

  if (!manifest) {
    throw new NotFoundError()
  }

  res.json(
    buildCredentialOffer(
      uuidv4(),
      manifest,
      fullURL(`/api/demos/issuer/${token}`)
    )
  )
})
