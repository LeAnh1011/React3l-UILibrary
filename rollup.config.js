import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import sass from "rollup-plugin-sass";
// import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: [
    "src/index.ts",
    "src/components/FormItem/index.ts",
    "src/components/Input/InputText/index.ts",
    "src/components/Input/InputNumber/index.ts",
    "src/components/Input/InputSelect/index.ts",
    "src/components/Select/SingleSelect/index.ts"
  ],
  output: [
    {
      dir: "build",
      format: "cjs",
      sourcemap: true,
      exports: "named",
      preserveModulesRoot: "src",
    },
  ],
  preserveModules: true,
  plugins: [
    peerDepsExternal(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    // postcss({
    //   modules: true,
    //   use: ["sass"],
    // }),
    sass({
      insert: true,
    }),
    terser(),
  ],
  external: ["react", "react-dom"],
};
