import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
// import image from '@rollup/plugin-image';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: "src/index.ts",
  output: [
    {
      file: "build/index.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    // image(),
    peerDepsExternal(),
    commonjs(),
    // typescript({ useTsconfigDeclarationDir: true }),
    typescript({
      typescript: require("ttypescript"),
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
    postcss({
      use: ["sass"],
      //modules: true,
      sourceMap: true,
      extract: false,
    }),
    terser(),
  ],
  external: [
    "uuid",
    "moment",
    "lodash",
    "react-image-crop",
    "react-dropzone",
    "react-infinite-scroll-component",
    "@ant-design"
  ],
};
