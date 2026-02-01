import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  prettierConfig,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", ".source/**"]),
]);

export default eslintConfig;
