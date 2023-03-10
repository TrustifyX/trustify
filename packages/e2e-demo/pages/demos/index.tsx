import { ChevronRightIcon } from "@heroicons/react/solid"
import Link from "next/link"
import { FC } from "react"

import Layout from "../../components/shared/Layout"

const DEMOS = [
  {
    title: "Basic Issuance",
    href: "/demos/issuer",
    description:
      "An end-user requests KYC or Reputation Score credentials from an issuer."
  },
  {
    title: "Filecoin Plus Verification",
    href: "/demos/verifier",
    description: "A PoC of how a notary can submit off-chain verification result of a client on-chain."
  },
  {
    title: "Compliance & Basic Revocation",
    href: "/demos/revocation",
    description:
      "A compliance officer revokes a previously-issued KYC credential."
  },
  {
    title: "Dapp Requiring KYC",
    href: "/demos/dapp",
    description:
      "An example of how a Dapp can prevent usage until it is provided with a valid KYC credential."
  },
  {
    title: "Lending Market Dapp Requiring KYC",
    href: "/demos/demo6",
    description:
      "An example of how a lending market Dapp can require KYC verification before depositing assets."
  }
]

const DemosIndex: FC = () => {
  return (
    <Layout title="Demos">
      <ul role="list" className="divide-y divide-gray-200">
        {DEMOS.map((demo) => (
          <li key={demo.href}>
            <Link href={demo.href}>
              <a className="flex items-center justify-between p-4 space-x-4 hover:bg-gray-900">
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-gray-200">
                    {demo.title}
                  </span>
                  <span className="text-sm text-gray-200">
                    {demo.description}
                  </span>
                </span>
                <ChevronRightIcon
                  className="w-5 h-5 text-gray-200"
                  aria-hidden="true"
                />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default DemosIndex
