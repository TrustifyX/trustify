import { PlusIcon } from "@heroicons/react/solid"
import Link from "next/link"

export default function EmptyAccount(): JSX.Element {
  return (
    <div className="my-16 text-center">
      <h3 className="mt-2 text-sm font-medium text-gray-200">
        No transactions
      </h3>
      <p className="mt-1 text-sm text-gray-200">
        Get started by sending some VUSDC.
      </p>
      <div className="mt-6">
        <Link href="/demos/cefi/send" passHref>
          <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-cyan-400 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400">
            <PlusIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
            Send VUSDC
          </div>
        </Link>
      </div>
    </div>
  )
}
