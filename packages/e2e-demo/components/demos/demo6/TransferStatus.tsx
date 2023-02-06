import { QRCodeSVG } from "qrcode.react"
import { FC, useState } from "react"

import { LoadingButton } from "../../shared/LoadingButton"
import Spinner from "../../shared/Spinner"

import type { VerificationRequestResponse } from "../../../lib/verification-request"

type TransferStatusProps = {
  simulateFunction: () => Promise<void>
  verification: VerificationRequestResponse
}

const TransferStatus: FC<TransferStatusProps> = ({
  simulateFunction,
  verification
}) => {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-200">
        Present KYC Verifiable Credential
      </h3>
      {verification ? (
        <>
          <label className="block text-sm font-medium text-gray-200">
            Scan this QR code with the Trustify app to provide your KYC Verifiable
            Credential:
          </label>
          <div className="py-4">
            <QRCodeSVG value={JSON.stringify(verification.qrCodeData)} />
          </div>
        </>
      ) : (
        <div className="py-8 prose">
          <h4>
            <Spinner className="inline w-5 h-5 mr-2 -ml-1" />
            Generating Verification Request ...
          </h4>
        </div>
      )}
      <label className="block text-sm font-medium text-gray-200">
        Alternatively, you can simulate verification:
      </label>
      <LoadingButton
        loading={loading}
        type="submit"
        style="dot-loader"
        onClick={async (e) => {
          e.preventDefault()
          setLoading(true)
          await simulateFunction()
          setLoading(false)
        }}
        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-cyan-400 border border-transparent rounded-md shadow-sm hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Simulate Verification
      </LoadingButton>
    </div>
  )
}

export default TransferStatus
