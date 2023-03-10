import { compact } from "lodash"
import Head from "next/head"
import Link from "next/link"
import { FC } from "react"

import { classNames } from "../../lib/react-fns"
import TrustifyLogo from "./Logo"

type Props = {
  title?: string
  bgColor?: string
}

/**
 * This Functional Component is a wrapper for every page in the app, providing
 * the shared header, navigation, and footer.
 *
 * @param props.title The title of the page.
 * @param props.bgColor The background color of the page. Used to distinguish between the two CeFi demos
 */
const Layout: FC<Props> = ({ children, title, bgColor }) => {
  return (
    <>
      <Head>
        <title className="text-center">{compact(["Trustify.id", title]).join(" | ")}</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={classNames(
          bgColor || "bg-gray-900",
          "min-h-screen px-4 antialiased text-white font-sans"
        )}
      >
        <div className="max-w-3xl mx-auto">
          <header className="flex flex-col items-center justify-between p-4 pt-8 space-y-4 sm:p-8 sm:flex-row sm:space-y-0">
            <Link href="/">
              <a className="max-w-[150px] text-2xl tracking-tight text-center text-gray-200 hover:text-blue-500">
                <TrustifyLogo />
              </a>
            </Link>

            <div className="flex items-center justify-between space-x-4">
              <Link href="/demos/">
                <a className="px-3 py-2 text-lg font-medium text-cyan-400 border border-solid border-cyan-400 rounded-full shadow-sm hover:bg-cyan-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Demos
                </a>
              </Link>
            </div>
          </header>
          <main className="max-w-4xl p-4 mx-auto bg-gray-800 sm:p-8 rounded-xl">
            {title && (
              <h1 className="pb-4 mt-2 text-3xl font-bold tracking-tight text-center text-gray-200 sm:text-4xl">
                {title}
              </h1>
            )}
            {children}
          </main>
          <footer className="py-8 text-sm text-center text-gray-00 text-extralight">
            &copy;{new Date().getFullYear()} TrustifyX | Software open sourced
            under the MIT license
          </footer>
        </div>
      </div>
    </>
  )
}

export default Layout
