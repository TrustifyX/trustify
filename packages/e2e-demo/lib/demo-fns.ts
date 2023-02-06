import { Contract, Wallet } from "ethers"
import { VerificationResultResponse, verificationResult } from "trustify"

import { User } from "./database"
import {
  getProvider,
  thresholdTokenContractAddress,
  thresholdTokenContractArtifact
} from "./eth-fns"

export type Transaction = {
  amount: string
  address: string
}

export async function send(
  user: User,
  transaction: Transaction,
  verification?: VerificationResultResponse
): Promise<boolean> {
  if (!transaction) {
    return false
  }

  const provider = getProvider()
  const wallet = new Wallet(user.privateKey, provider)
  const contract = new Contract(
    thresholdTokenContractAddress(),
    thresholdTokenContractArtifact().abi,
    wallet
  )

  // In a production environment, one would need to call out to a verifier to get a result
  if (!verification) {
    verification = await verificationResult(
      wallet.address,
      thresholdTokenContractAddress(),
      process.env.VERIFIER_PRIVATE_KEY,
      parseInt(process.env.NEXT_PUBLIC_ETH_NETWORK, 10)
    )
  }

  const tx = await contract.validateAndTransfer(
    transaction.address,
    parseInt(transaction.amount, 10),
    verification.verificationResult,
    verification.signature
  )
  const receipt = await tx.wait()

  return receipt.status !== 0
}
