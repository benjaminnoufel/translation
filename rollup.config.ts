import remove from "rollup-plugin-delete";
import {terser} from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
    external: [
        "path",
        "react/jsx-runtime",
        "react",
        "react-dom"
    ],
    input: "src/translation.tsx",
    plugins: [
        remove({targets: "dist/*"}),
        typescript(),
        terser()
    ],
    output: {
        file: "dist/translation.js",
        format: "cjs"
    }
};
