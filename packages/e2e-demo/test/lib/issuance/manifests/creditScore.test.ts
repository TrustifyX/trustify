import { creditScoreManifest } from "../../../../lib/manifest/creditScore"

describe("Tests Reputation Score Manifest", () => {
  it("tests for breaking Reputation Score Manifest schema changes", async () => {
    expect.assertions(1)
    const cm = creditScoreManifest
    expect(cm).toMatchSnapshot()
  })
})
