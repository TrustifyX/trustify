import { CalculatorIcon } from "@heroicons/react/outline"
import { ChevronRightIcon } from "@heroicons/react/solid"
import { NextPage } from "next"
import Link from "next/link"

import VerifierLayout from "../../../components/demos/verifier/Layout"

const items = [
  {
    name: "Reputation Score",
    description: "Proof of your current reputation score.",
    href: "/demos/verifier/credit-score",
    iconColor: "bg-purple-500",
    icon: CalculatorIcon
  }
]

const VerifierPage: NextPage = () => {
  return (
    <VerifierLayout>
      <div className="pb-2 prose max-w-none text-gray-200">
        <h2 className="text-gray-200">Verify a Client&apos;s Credentials</h2>
        <p className="text-gray-200">
          Smart contracts, notaries, financial insitutions, agencies, apps, and devices
          can verify credentials by implementing support for the{" "}
          <Link href="https://identity.foundation/presentation-exchange/">
            <a target="_blank" className="text-gray-200">Presentation Exchange</a>
          </Link>{" "}
          specification.
        </p>
        <p className="text-gray-200">
          This reference implemenation demonstrates how verifiers request
          credentials, how holders format, sign, and transmit credentials in
          response, and how information is secured and conveyed in verification
          user experiences.
        </p>
        <p className="text-gray-200">
          Note there is no user authentication required for verification. A
          verifier does not require any knowledge of an end-user other than the
          provided credentials to verify.
        </p>
        <p className="font-semibold">
          Select the type of credential you would like to verify:
        </p>
      </div>
      <ul
        role="list"
        className="mt-6 border-t border-b border-gray-200 divide-y divide-gray-200"
      >
        {items.map((item, itemIdx) => (
          <li key={itemIdx}>
            <div className="relative flex items-start py-4 space-x-3 group hover:bg-gray-900">
              <div className="flex-shrink-0">
                <span
                  className={`${item.iconColor} inline-flex items-center justify-center h-10 w-10 rounded-lg`}
                >
                  <item.icon
                    className="w-6 h-6 text-white"
                    aria-hidden="true"
                  />
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-200">
                  <Link href={item.href}>
                    <a>
                      <span className="absolute inset-0" aria-hidden="true" />
                      {item.name}
                    </a>
                  </Link>
                </div>
                <p className="text-sm text-gray-200">{item.description}</p>
              </div>
              <div className="self-center flex-shrink-0">
                <ChevronRightIcon
                  className="w-5 h-5 text-gray-200 group-hover:text-gray-200"
                  aria-hidden="true"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </VerifierLayout>
  )
}

export default VerifierPage
