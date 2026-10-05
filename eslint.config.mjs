import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Extracted feature, preserved as source for a possible future
    // standalone app — not compiled or linted as part of this one
    // (see archive/speed-reading-app/README.md).
    "archive/**",
  ]),
]);

export default eslintConfig;
