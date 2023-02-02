import { useSession } from "next-auth/react"

import { PendingReceive } from "../../../lib/database"
import { LoadingButton } from "../../shared/LoadingButton"

type Props = {
  row: PendingReceive
  pickupLoading: boolean
  pickupFunction: () => void
  pickupCancelFunction: () => void
}

export default function PickupPanel({
  row,
  pickupLoading,
  pickupFunction,
  pickupCancelFunction
}: Props): JSX.Element {
  const { data: session } = useSession()
  const user = session.user

  const amount = row.amount

  const credential = (
    <pre className="mt-4 text-sm text-gray-200">
      {user.fullName}
      <br />
      123 Main Street
      <br />
      Boston, MA
    </pre>
  )

  return (
    <div className="bg-gray-50 sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-200">
          Someone is trying to send you VUSDC
        </h3>
        <div className="max-w-xl mt-2 text-sm text-gray-200">
          <p>
            Someone has sent you {amount} VUSDC. Before it can be picked up, we
            must provide beneficiary information to the counterparty.
          </p>
          <pre>{credential}</pre>
        </div>
        <div className="mt-5 space-x-4">
          <LoadingButton
            type="submit"
            style="dot-loader"
            loading={pickupLoading}
            onClick={pickupCancelFunction}
            className="inline-flex items-center px-4 py-2 font-medium text-gray-700 bg-gray-300 border border-gray-300 rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
          >
            Decline
          </LoadingButton>
          <LoadingButton
            type="submit"
            style="dot-loader"
            loading={pickupLoading}
            onClick={pickupFunction}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-cyan-400 border border-transparent rounded-md shadow-sm hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Send information to pickup funds
          </LoadingButton>
        </div>
      </div>
    </div>
  )
}
