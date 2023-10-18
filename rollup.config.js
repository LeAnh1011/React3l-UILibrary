import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import ttypescript from "ttypescript";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";

export default {
  input: "src/index.ts",
  output: [
    {
      dir: "build/cjs",
      format: "cjs",
      preserveModules: true,
      preserveModulesRoot: "src",
      sourcemap: true,
    },
    {
      dir: "build/esm",
      format: "esm",
      preserveModules: true,
      preserveModulesRoot: "src",
      sourcemap: true,
      entryFileNames: (chunkInfo) => {
        if (chunkInfo.name.includes("node_modules")) {
          return chunkInfo.name.replace("node_modules", "external") + ".js";
        }

        return "[name].js";
      },
    },
  ],
  plugins: [
    peerDepsExternal(),
    commonjs(),
    typescript({
      typescript: ttypescript,
      tsconfigDefaults: {
        compilerOptions: {
          plugins: [
            { transform: "typescript-transform-paths" },
            {
              transform: "typescript-transform-paths",
              afterDeclarations: true,
            },
          ],
        },
      },
    }),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "runtime",
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    postcss({
      use: ["sass"],
      sourceMap: true,
      extract: false,
    }),
    terser(),
  ],
  external: [
    "react-dropzone",
    "react-image-crop",
    "react-infinite-scroll-component",
  ],
};
