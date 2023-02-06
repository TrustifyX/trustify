import Link from "next/link"
import React, { FC } from "react"

type Props = {
  onDone: () => Promise<void>
}

const Verification: FC<Props> = ({ onDone }) => {
  return (
    <>
      <div>
        Before participating in these markets, you must verify your KYC/AML
        Attestation from a trusted issuer.
      </div>

      <div className="prose">
        <ul>
          <li>
            <Link href="/demos/issuer/kyc">
              <a className="text-cyan-400">Circle</a>
            </Link>
          </li>
          <li>
            <Link href="/demos/issuer/kyc">
              <a className="text-cyan-400">Coinbase</a>
            </Link>
          </li>
        </ul>
        <p className="text-gray-200"> Already have a credential?{" "} </p>
        <a href="#" className="text-cyan-400" onClick={onDone}>
          Click here
        </a>
      </div>
    </>
  )
}

export default Verification
