import js from "@eslint/js";
import tseslint from "typescript-eslint";

const browserGlobals = {
  window:"readonly",document:"readonly",navigator:"readonly",localStorage:"readonly",
  matchMedia:"readonly",HTMLElement:"readonly",Element:"readonly",Node:"readonly",
  URL:"readonly",URLSearchParams:"readonly",console:"readonly",fetch:"readonly",
  Request:"readonly",Response:"readonly",AbortController:"readonly",
  IntersectionObserver:"readonly",process:"readonly"
};

export default tseslint.config(
  { ignores:["dist/**","node_modules/**","coverage/**","playwright-report/**","test-results/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files:["src/**/*.{ts,tsx}","tests/**/*.{ts,tsx}","*.ts"],
    languageOptions:{globals:browserGlobals},
    rules:{
      "@typescript-eslint/no-explicit-any":"error",
      "@typescript-eslint/no-unused-vars":["error",{argsIgnorePattern:"^_",varsIgnorePattern:"^_"}]
    }
  }
);
