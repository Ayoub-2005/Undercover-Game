import { describe, it, expect } from "vitest"
import { validateGame, assignRoles } from "../utils/gameRules"

// 🔥 TEST DES RÈGLES
describe("Règles du jeu", () => {

  it("❌ refuse moins de 3 joueurs", () => {
    expect(validateGame(["A","B"], 1, false)).toBe(false)
  })

  it("❌ refuse trop d'undercover", () => {
    expect(validateGame(["A","B","C","D"], 2, false)).toBe(false)
  })

  it("✅ accepte config valide", () => {
    expect(validateGame(["A","B","C","D"], 1, true)).toBe(true)
  })

  it("✅ accepte Mr White avec config valide", () => {
    expect(validateGame(["A","B","C"], 0, true)).toBe(true)
  })

})


// 🔥 TEST DE DISTRIBUTION DES RÔLES
describe("Distribution des rôles", () => {

  it("✔ bon nombre d'undercover", () => {

    const players = ["A","B","C","D"]
    const roles = assignRoles(players, 1, false)

    const count = roles.filter(r => r === "undercover").length

    expect(count).toBe(1)

  })

  it("✔ présence de Mr White", () => {

    const players = ["A","B","C","D"]
    const roles = assignRoles(players, 1, true)

    const hasMrWhite = roles.includes("mrwhite")

    expect(hasMrWhite).toBe(true)

  })

})