import { readFileSync } from "node:fs"

const file = process.argv[2]
if (!file) throw new Error("usage: validate-catalog.mjs <file>")

const value = JSON.parse(readFileSync(file, "utf8"))
if (typeof value !== "object" || value === null || Array.isArray(value)) {
  throw new Error("catalog root must be a JSON object")
}
const providers = Object.entries(value)
if (providers.length === 0) throw new Error("catalog contains no providers")
for (const [id, provider] of providers) {
  if (typeof provider !== "object" || provider === null || Array.isArray(provider)) {
    throw new Error(`provider "${id}" is not an object`)
  }
  if (typeof provider.models !== "object" || provider.models === null || Array.isArray(provider.models)) {
    throw new Error(`provider "${id}" has no models object`)
  }
}
console.log(`catalog ok: ${providers.length} providers`)
