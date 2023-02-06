import { VerificationResultResponse, verificationResult } from "trustify"

import { apiHandler, requireMethod } from "../../../../lib/api-fns"

export default apiHandler<VerificationResultResponse>(async (req, res) => {
  requireMethod(req, "POST")

  // the dapp sends its own calling address to the verifier, and though the
  // verifier does not need to confirm ownership of the address, it includes
  // the address in the signed digest so that the contract can confirm it
  // and no other subject can use this signed VerificationInfo
  const subjectAddress = req.body.subjectAddress

  // Use the contract's remote address as part of the domain separator in the hash
  const contractAddress = req.body.contractAddress

  // A production verifier would integrate with its own persistent wallet, but
  // this example merely regenerates a new trusted signer when needed.
  // We use the same account here that the deploy script used in order to get
  // a signer that is already registered as trusted in the contract.
  const privateKey = process.env.VERIFIER_PRIVATE_KEY

  const result = await verificationResult(
    subjectAddress,
    contractAddress,
    privateKey,
    parseInt(process.env.NEXT_PUBLIC_ETH_NETWORK, 10)
  )

  // return the result object to the calling client
  res.status(200).json(result)
})
