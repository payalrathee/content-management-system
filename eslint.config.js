import globals from "globals";
import pluginNode from "eslint-plugin-n"; // Node.js-specific rules
import pluginPromise from "eslint-plugin-promise"; // Async/Promise best practices
import pluginSecurity from "eslint-plugin-security"; // Security linting
import pluginPrettier from "eslint-plugin-prettier"; // Prettier integration
import eslintConfigPrettier from "eslint-config-prettier"; // Disable conflicts with Prettier

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    {
        ignores: ["node_modules", "dist", "coverage"], 
    },
    {
        files: ["**/*.{js,cjs,mjs}"],
        languageOptions: {
            ecmaVersion: "latest",
            globals: {
                ...globals.node,
            },
            sourceType: "module", // switch to "commonjs" if you're using require()
        },
        plugins: {
            n: pluginNode,
            promise: pluginPromise,
            security: pluginSecurity,
            prettier: pluginPrettier,
        },
        rules: {
            // --- Core Best Practices ---
            "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // ignore unused args starting with _
            "no-console": "warn", // allow console but warn in prod
            "no-undef": "error",
            eqeqeq: ["error", "always"],
            curly: ["error", "all"],

            // --- Node.js Rules ---
            "n/no-deprecated-api": "warn",
            "n/no-missing-import": "off", // can be too strict in ESM/TypeScript projects
            "n/no-process-env": "off", // often needed in configs
            "n/no-extraneous-require": "error",

            // --- Async/Promise Rules ---
            "promise/catch-or-return": "error",
            "promise/always-return": "error",
            "promise/no-return-wrap": "error",

            // --- Error Handling ---
            "handle-callback-err": "error",
            "no-process-exit": "warn",

            // --- Code Style ---
            "prefer-const": "error",
            "arrow-body-style": ["error", "as-needed"],
            "no-var": "error",

            // --- Security Best Practices ---
            ...pluginSecurity.configs.recommended.rules,

            // --- Prettier Integration ---
            "prettier/prettier": "error",
        },
    },
    eslintConfigPrettier, // always put this last to turn off conflicting rules
];
