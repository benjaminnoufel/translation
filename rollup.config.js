import remove from "rollup-plugin-delete";
import {terser} from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
    input: "src/translation.ts",
    plugins: [
        remove({targets: "dist/*"}),
        typescript(),
        terser()
    ],
    external: [
        "react",
        "react-dom"
    ],
    output: {
        file: "dist/translation.js"
    }
};
