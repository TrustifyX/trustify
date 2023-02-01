import { Wallet } from "@ethersproject/wallet"
import { ethers, Contract } from "ethers"
import { verificationResult } from "trustify"

import { apiHandler, requireMethod } from "../../../../lib/api-fns"
import {
  getProvider,
  thresholdTokenContractAddress,
  thresholdTokenContractArtifact
} from "../../../../lib/eth-fns"

type Response = {
  status: string
}

export default apiHandler<Response>(async (req, res) => {
  requireMethod(req, "POST")

  const address = req.body.address

  const provider = getProvider()
  const signer = new Wallet(process.env.ETH_FAUCET_PRIVATE_KEY, provider)

  // In a production environment, one would need to call out to a verifier to get a result
  const verification = await verificationResult(
    signer.address,
    thresholdTokenContractAddress(),
    process.env.VERIFIER_PRIVATE_KEY,
    parseInt(process.env.NEXT_PUBLIC_ETH_NETWORK, 10)
  )

  // Load the contract
  const contract = new Contract(
    thresholdTokenContractAddress(),
    thresholdTokenContractArtifact().abi,
    signer
  )

  // Verify
  const tx = await contract.validateAndTransfer(
    address,
    100,
    verification.verificationResult,
    verification.signature
  )
  await tx.wait()

  // Send
  const tx2 = await signer.sendTransaction({
    to: address,
    value: ethers.constants.WeiPerEther.div(100)
  })
  await tx2.wait()

  console.log(`Transferred 0.1 ETH and 100 tokens to ${address}`)

  res.status(200).json({ status: "ok" })
})
