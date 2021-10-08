import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import remove from "rollup-plugin-delete";
import {resolve} from "path";
import {terser} from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
    external: [
        "path",
        "react/jsx-runtime",
        "react",
        "react-dom"
    ],
    input: resolve("src", "translation.tsx"),
    plugins: [
        remove({targets: resolve("lib", "*")}),
        typescript(),
        commonjs(),
        nodeResolve(),
        terser()
    ],
    output: {
        file: resolve("lib", "translation.js"),
        format: "cjs",
        sourcemap: true
    }
};
