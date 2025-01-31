import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";

import pkg from "./package.json";

export default {
    input: "src/index.tsx",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            exports: "named",
            sourcemap: false,
            compact: true,
            esModule: true,
        },
        {
            file: pkg.module,
            format: "es",
            exports: "named",
            sourcemap: false,
            compact: true
        }
    ],
    plugins: [
        external(),
        resolve(),
        typescript({
            exclude: "**/__tests__/**",
            clean: true
        }),
        commonjs({
            transformMixedEsModules: true,
            include: ["node_modules/**"],
            exclude: "**/__tests__/**",
            namedExports: {
                "node_modules/react/react.js": [
                    "Children",
                    "Component",
                    "PropTypes",
                    "createElement"
                ],
                "node_modules/react-dom/index.js": ["render"]
            }
        })
    ]
};