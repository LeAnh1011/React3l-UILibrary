import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import sass from "rollup-plugin-sass";
// import postcss from "rollup-plugin-postcss";
import image from '@rollup/plugin-image';
import { terser } from "rollup-plugin-terser";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: [
    "src/index.ts",
    "src/components/FormItem/index.ts",
    // Input field components
    "src/components/Input/InputText/index.ts",
    "src/components/Input/InputNumber/index.ts",
    "src/components/Input/InputSelect/index.ts",
    "src/components/Input/InputTag/index.ts",
    "src/components/TextArea/index.ts",
    // Dropdown list components
    "src/components/Select/SingleSelect/index.ts",
    "src/components/Select/MultipleSelect/index.ts",
    "src/components/Tree/index.ts",
    "src/components/TreeSelect/index.ts",
    // AdvacenFilter master components
    "src/components/AdvanceFilterMaster/AdvanceIdFilterMaster/index.ts",
    "src/components/AdvanceFilterMaster/AdvanceMultipleIdFilterMaster/index.ts",
    // Standard table components
    "src/components/StandardTable/index.ts",
    "src/components/StandardTable/ActionBarComponent/index.ts",
    "src/components/StandardTable/LayoutCell/index.ts",
    "src/components/StandardTable/LayoutHeader/index.ts",
    "src/components/StandardTable/Pagination/index.ts",
    "src/components/StandardTable/DataCellComponent/BadgeText/index.ts",
    "src/components/StandardTable/DataCellComponent/OneLineText/index.ts",
    "src/components/StandardTable/DataCellComponent/TwoLineText/index.ts",
    "src/components/StandardTable/DataCellComponent/StatusLine/index.ts"
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
    image(),
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
