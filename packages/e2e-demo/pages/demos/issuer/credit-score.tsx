import { Disclosure } from "@headlessui/react"
import { ArrowCircleRightIcon } from "@heroicons/react/outline"
import { NextPage } from "next"
import Link from "next/link"
import { QRCodeSVG } from "qrcode.react"
import useSWR from "swr"
import { challengeTokenUrlWrapper } from "trustify"

import IssuerLayout from "../../../components/demos/issuer/Layout"
import { currentUser, requireAuth } from "../../../lib/auth-fns"
import { temporaryAuthToken } from "../../../lib/database"
import { fullURL, jsonFetch } from "../../../lib/utils"

import type { User } from "../../../lib/database"
import type { ChallengeTokenUrlWrapper } from "trustify"

type Props = {
  createdAt: string
  manifest: Record<string, unknown>
  qrCodeData: ChallengeTokenUrlWrapper
  user: User
}

export const getServerSideProps = requireAuth<Props>(async (context) => {
  const user = await currentUser(context)
  const authToken = await temporaryAuthToken(user)
  const qrCodeData = challengeTokenUrlWrapper(
    fullURL(`/api/demos/issuer/manifests/credit-score/${authToken}`)
  )

  const response = await fetch(qrCodeData.challengeTokenUrl)
  const manifest = await response.json()

  return {
    props: {
      createdAt: new Date().toISOString(),
      manifest,
      qrCodeData,
      user
    }
  }
}, "/demos/issuer")

const CreditScorePage: NextPage<Props> = ({
  createdAt,
  manifest,
  qrCodeData,
  user
}) => {
  // Setup polling to detect a newly issued credential.
  const { data } = useSWR(
    fullURL(
      `/api/demos/issuer/get-newest-credential-from?userId=${user.id}&createdAt=${createdAt}`
    ),
    jsonFetch,
    {
      refreshInterval: 1000
    }
  )

  const content =
    data && data.credential ? (
      <div className="space-y-4">
        <p className="text-gray-200">
          The issuer created a credential for a{" "}
          <Link href="https://www.w3.org/TR/did-core/">
            <a className="text-gray-200" target="_blank">DID</a>
          </Link>{" "}
          owned by{" "}
          <b>
            <em>{user.email}</em>
          </b>
          . The issuer signed the Verifiable Credential with its own DID. The
          decoded VC is below.
        </p>
        <p className="text-gray-200">
          <Link href="/demos/verifier/" passHref>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-cyan-400 border border-transparent rounded-md shadow-sm hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Next: Verification
              <ArrowCircleRightIcon
                className="w-5 h-5 ml-2 -mr-1"
                aria-hidden="true"
              />
            </button>
          </Link>
        </p>
        <h3 className="text-gray-200">Decoded KYC Verifiable Credential:</h3>
        <pre>{JSON.stringify(data.credential, null, 4)}</pre>
      </div>
    ) : (
      <>
        <h2 className="text-gray-200">Reputation Score Verifiable Credential Issue User Experience</h2>
        <p className="text-gray-200">
          Credentials contain data specific to their schema types. Compared to a
          KYC/AML credential, a credential that attests to a reputation score has
          additional data to contain a numeric score, and the credential expires
          relatively quickly.
        </p>
        <p className="text-gray-200">
          The currently signed-in user for this demonstration has the following
          reputation score:
        </p>
        <dl className="flex flex-row justify-center mx-auto space-x-2 sm:space-x-5">
          <div className="px-4 py-3 overflow-hidden text-center bg-amber-300 rounded-lg shadow sm:py-2 sm:px-4 flex-0 text-gray-200">
            <dt className="mt-1 text-3xl font-semibold text-gray-900">
              {user.creditScore}
            </dt>
            <dd className="text-gray-900">FilRep</dd>
          </div>
        </dl>
        <p className="text-gray-200">
          Request a VC for this reputation score by scanning this QR code with the
          Trustify mobile app:
        </p>
        <QRCodeSVG
          value={JSON.stringify(qrCodeData)}
          className="w-48 h-48 mx-auto text-gray-200"
        />
        <p className="text-gray-200">
          <strong className="text-gray-200">NOTE: </strong> In this demo, the reputation score credential{" "}
          <strong className="text-gray-200">will expire after 1 minute</strong>.
        </p>

        <h2 className="text-gray-200">Behind the Scenes</h2>

        <p className="text-gray-200">
          As in the KYC/AML example, the QR code contains a{" "}
          <code className="text-gray-200">challengeTokenUrl</code> that enables the wallet to retrieve a{" "}
          <Link href="https://identity.foundation/credential-manifest/">
            <a target="_blank" className="text-gray-200">Credential Manifest</a>
          </Link>{" "}
          defining the credentials that the issuer can issue and how a wallet
          can request them. It looks like this:
        </p>

        <pre>{JSON.stringify(qrCodeData, null, 4)}</pre>

        <Disclosure>
          <Disclosure.Button>
            <p className="font-semibold underline text-md text-gray-200">
              Show/Hide the Complete Credential Manifest
            </p>
          </Disclosure.Button>
          <Disclosure.Panel>
            <pre>{JSON.stringify(manifest, null, 4)}</pre>
          </Disclosure.Panel>
        </Disclosure>

        <p className="text-gray-200">
          After scanning the QR code and completing the protocol sequence, you
          will be able to view the actual Verifiable Credential.
        </p>
      </>
    )

  return (
    <IssuerLayout>
      <div className="prose max-w-none">{content}</div>
    </IssuerLayout>
  )
}

export default CreditScorePage
