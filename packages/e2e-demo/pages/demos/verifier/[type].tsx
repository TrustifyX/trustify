import { Disclosure } from "@headlessui/react"
import { BadgeCheckIcon, XCircleIcon } from "@heroicons/react/outline"
import { ArrowCircleRightIcon } from "@heroicons/react/solid"
import { GetServerSideProps, NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { QRCodeSVG } from "qrcode.react"
import useSWR from "swr"

import VerifierLayout from "../../../components/demos/verifier/Layout"
import { fullURL, jsonFetch } from "../../../lib/utils"
import {
  createVerificationOffer,
  VerificationRequestResponse
} from "../../../lib/verification-request"

type Props = {
  verification: VerificationRequestResponse
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const verification = await createVerificationOffer(ctx.query.type as string)

  return {
    props: {
      verification
    }
  }
}

const VerifierPage: NextPage<Props> = ({ verification }) => {
  const { query } = useRouter()
  const { type } = query
  const title = type === "kyc" ? "KYC/AML" : "Credit Score"
  const { qrCodeData, challenge } = verification

  const { data } = useSWR(
    () => fullURL(`/api/demos/verifier/${verification.id}/status`),
    jsonFetch,
    {
      refreshInterval: 1000
    }
  )
  const status = (data && (data.status as string)) || "pending"
  const result = data && data.result

  return (
    <VerifierLayout>
      <div className="prose max-w-none">
        {status === "approved" ? (
          <>
            <h3 className="text-gray-200">
              The Presentation Exchange completed and the credential was
              verified.
            </h3>

            <BadgeCheckIcon className="mx-auto text-green-600 w-36 h-36" />

            {result && (
              <>
                <p className="text-gray-200">
                  The verifier signed and returned the following verification
                  result, which can be used by a relying party such as a smart
                  contract that can validate the result.
                </p>
                <pre>{JSON.stringify(result, null, 4)}</pre>
              </>
            )}

            <p className="text-gray-200">
              <Link href="/demos/revocation" passHref>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-cyan-400 border border-transparent rounded-md shadow-sm hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Next: Issuers Can Revoke Credentials
                  <ArrowCircleRightIcon
                    className="w-5 h-5 ml-2 -mr-1"
                    aria-hidden="true"
                  />
                </button>
              </Link>
            </p>
          </>
        ) : status === "rejected" ? (
          <>
            <h3 className="text-gray-200">Your credential was not verified.</h3>
            <XCircleIcon className="mx-auto text-red-400 w-36 h-36" />
            <p className="text-gray-200">
              <Link href="/demos/revocation" passHref>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-cyan-400 border border-transparent rounded-md shadow-sm hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Next: Issuers Can Revoke Credentials
                  <ArrowCircleRightIcon
                    className="w-5 h-5 ml-2 -mr-1"
                    aria-hidden="true"
                  />
                </button>
              </Link>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-gray-200">{title} Verification User Experience</h2>
            <p className="text-gray-200">
              Using the Trustify demo wallet app, scan this QR code to begin the
              verification sequence:
            </p>
            <QRCodeSVG
              value={JSON.stringify(qrCodeData)}
              className="w-48 h-48 mx-auto"
            />
            <h2 className="text-gray-200">Behind the Scenes</h2>
            <p className="text-gray-200">
              The QR code informs the wallet where to retrieve a{" "}
              <Link href="https://identity.foundation/presentation-exchange/#presentation-request">
                <a target="_blank"  className="text-gray-200">Presentation Request</a>
              </Link>
              . The QR code contains the following data:
            </p>
            <pre>{JSON.stringify(qrCodeData, null, 4)}</pre>
            <h2 className="text-gray-200">Verification Presentation Request</h2>
            <p className="text-gray-200">
              After following the url in <code className="text-gray-200">challengeTokenUrl</code>, the
              wallet receives a complete Presentation Request, which instructs
              the wallet where and how to make the request to verify the
              credential.
            </p>

            <Disclosure>
              <Disclosure.Button>
                <p className="font-semibold underline text-md text-gray-200">
                  Show/Hide the Complete Presentation Request
                </p>
              </Disclosure.Button>
              <Disclosure.Panel>
                <pre>{JSON.stringify(challenge, null, 4)}</pre>
              </Disclosure.Panel>
            </Disclosure>

            <p className="text-gray-200">
              Once the client has the Presentation Request, it wraps the
              relevant Verifiable Crdential inside a{" "}
              <Link href="https://www.w3.org/TR/vc-data-model/#presentations-0">
                <a target="_blank" className="text-gray-200">Verifiable Presentation</a>
              </Link>{" "}
              (preventing relay attacks). It then signs the Verifiable
              Presentation using its DID key and transmits it to the verifier.
            </p>
          </>
        )}
      </div>
    </VerifierLayout>
  )
}

export default VerifierPage
