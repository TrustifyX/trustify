import { ChevronRightIcon } from "@heroicons/react/solid"
import { NextPage } from "next"
import Link from "next/link"

import RevocationLayout from "../../../components/demos/revocation/Layout"
import { requireAuth } from "../../../lib/auth-fns"
import { allUsers, prisma } from "../../../lib/database"

import type { User } from "../../../lib/database"

type Props = {
  users: User[]
  lastIssuedUserId?: string
}

export const getServerSideProps = requireAuth<Props>(async () => {
  const users = await allUsers()
  const credential = await prisma.credential.findFirst({
    select: {
      userId: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })
  const lastIssuedUserId = credential?.userId || null

  return {
    props: { users, lastIssuedUserId }
  }
}, "/demos/revocation")

const AdminPage: NextPage<Props> = ({ lastIssuedUserId, users }) => {
  return (
    <RevocationLayout>
      <div className="prose max-w-none text-gray-200">
        <h2 className="text-gray-200">Simulating an Issuer&apos;s Compliance Tool</h2>
        <p className="text-gray-200">
          This example simulates an admin tool used by issuers to manage
          credentials. Such a tool might be used by a compliance analyst to
          inspect the details of a user, including all credentials issued to a
          user, and to revoke credentials if needed.
        </p>

        <p className="text-gray-200">
          To protect privacy, Trustify employs{" "}
          <Link href="https://w3c-ccg.github.io/vc-status-list-2021">
            <a target="_blank" className="text-gray-200">Status List 2021</a>
          </Link>{" "}
          to execute credential revocation.
        </p>

        <h2 className="text-gray-200">Users</h2>
        <div className="divide-y divide-gray-200">
          {users.map((user) => (
            <div key={user.email}>
              <Link href={`/demos/revocation/users/${user.id}`} passHref>
                <a className="flex justify-between py-4 !no-underline cursor-pointer hover:bg-gray-900">
                  <div className="ml-3">
                    <span className="text-sm text-gray-200">
                      {user.email}
                      {user.id === lastIssuedUserId && (
                        <span className="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Recently Issued
                        </span>
                      )}
                    </span>
                  </div>
                  <ChevronRightIcon
                    className="w-5 h-5 text-gray-200"
                    aria-hidden="true"
                  />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </RevocationLayout>
  )
}

export default AdminPage
