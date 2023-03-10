import {
  BadgeCheckIcon,
  IdentificationIcon,
  BriefcaseIcon,
  InboxInIcon
} from "@heroicons/react/outline"
import { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"

import Layout from "../components/shared/Layout"

/**
 * The Home page, available at "/".
 *
 * This page is a `NextPage`, which is a React Functional Component.
 */
const Home: NextPage = () => {
  return (
    <Layout title="Open-Standard for FEVM Verifiable Credentials">
      <p className="mx-auto mb-8 text-xl text-center text-gray-200 max-w-prose">
        Trustify defines data models, protocol recipes, and open source software
        that links identity proofs to crypto finance experiences
      </p>

      {/* require("../../static/img/undraw_building_blocks_n0nc.svg").default */}
      {/* Svg: require("../../static/img/undraw_Safe_re_kiil.svg").default, */}
      {/* Svg: require("../../static/img/undraw_online_transactions_02ka.svg") */}
      {/* /img/undraw_connected_world_wuay.svg */}
      {/* undraw_docusaurus_mountain */}

      <Image
        src="/img/undraw_Safe_re_kiil.svg"
        width="1180"
        height="380"
        alt="Overview Sequence"
      />

      <div className="my-8">
        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          {/* Issue */}
          <div className="relative">
            <dt>
              <div className="absolute flex items-center justify-center w-12 h-12 text-white bg-amber-300 rounded-md">
                <InboxInIcon
                  className="w-6 h-6 text-gray-900"
                  aria-hidden="true"
                />
              </div>
              <h3 className="ml-16 text-lg font-bold leading-6 text-gray-200">
                ISSUE
              </h3>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-200">
              <p className="">
                One identity can attest to the authenticity and correctness of
                another identity&apos;s claims by issuing a cryptographic{" "}
                <a
                  href="https://www.w3.org/TR/vc-data-model/"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noreferrer"
                >
                  Verifiable Credential
                </a>
                .
              </p>
              <p className="mt-5 italic">
                For example, Filecoin Plus notaries could submit an off-chain verification result of a client on-chain. They could use traits, such as FilRep???s reputation score, online reachability score, committed sectors proof score, and storage deals score.
              </p>
            </dd>
          </div>

          {/* Custody */}
          <div className="relative">
            <dt>
              <div className="absolute flex items-center justify-center w-12 h-12 text-white bg-amber-300 rounded-md">
                <BriefcaseIcon
                  className="w-6 h-6 text-gray-900"
                  aria-hidden="true"
                />
              </div>
              <h3 className="ml-16 text-lg font-bold leading-6 text-gray-200">
                CUSTODY
              </h3>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-200">
              People and institutions &mdash; the <i>subjects</i> of the
              credentials &mdash; custody their Verifiable Credentials in
              wallets just as they hold their own USDC and other crypto assets.
              Subjects may &quot;self-custody&quot; or rely on a trusted host to
              custody their credentials. The custodian is also called the{" "}
              <i>holder</i>.
            </dd>
          </div>

          {/* Verify */}
          <div className="relative">
            <dt>
              <div className="absolute flex items-center justify-center w-12 h-12 text-white bg-amber-300 rounded-md">
                <BadgeCheckIcon
                  className="w-6 h-6 text-gray-900"
                  aria-hidden="true"
                />
              </div>
              <h3 className="ml-16 text-lg font-bold leading-6 text-gray-200">
                VERIFY
              </h3>
            </dt>

            <dd className="mt-2 ml-16 text-base text-gray-200">
              <p className="">
                People, institutions, and smart contracts can verify credentials
                without accessing the private information used in the issuance
                of the claim and without leaking information to the issuer.
                Trustify implements{" "}
                <a
                  href="https://identity.foundation/presentation-exchange/"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noreferrer"
                >
                  Presentation Exchange
                </a>{" "}
                as its verification protocol.
              </p>
              <p className="mt-5 italic">
              For example, a DeFi undercollateralized lending protocol could verify the KYC/AML Attestation for a user without accessing any sensitive information such as social security numbers.
              </p>
            </dd>
          </div>

          {/* Identify */}
          <div className="relative">
            <dt>
              <div className="absolute flex items-center justify-center w-12 h-12 text-white bg-amber-300 rounded-md">
                <IdentificationIcon
                  className="w-6 h-6 text-gray-900"
                  aria-hidden="true"
                />
              </div>
              <h3 className="ml-16 text-lg font-bold leading-6 text-gray-200">
                IDENTITY
              </h3>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-200">
              Issuers, subjects, and verifiers of credentials are identified by
              unique Decentralized Identifiers, or{" "}
              <a
                href="https://www.w3.org/TR/did-core/"
                target="_blank"
                className="font-semibold hover:underline"
                rel="noreferrer"
              >
                DIDs
              </a>
              . DIDs leverage public-private key cryptography similarly to
              blockchain addresses. Just as in the physical world where
              individuals have several context-sensitive identities, in the
              virtual world people may have several DIDs, each with distinct
              credentials.
            </dd>
          </div>
        </dl>
      </div>

      <div>
        <Link href="/demos">
          <a className="flex items-center justify-center w-full px-4 py-2 pt-4 pb-4 font-bold text-gray-900 bg-amber-300 border border-transparent rounded-full shadow-sm text-md hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <BadgeCheckIcon className="mr-2 -ml-1 w-7 h-7" aria-hidden="true" />
            View the Demos
          </a>
        </Link>
      </div>
    </Layout>
  )
}

export default Home
