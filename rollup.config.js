import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
// import image from '@rollup/plugin-image';

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
    "src/components/Input/InputSearch/index.ts",
    "src/components/TextArea/index.ts",
    // Dropdown list components
    "src/components/Select/SingleSelect/index.ts",
    "src/components/Select/MultipleSelect/index.ts",
    "src/components/Select/EnumSelect/index.ts",
    "src/components/Tree/index.ts",
    "src/components/TreeSelect/index.ts",
    // AdvacenFilter master components
    "src/components/AdvanceFilterMaster/AdvanceIdFilterMaster/index.ts",
    "src/components/AdvanceFilterMaster/AdvanceMultipleIdFilterMaster/index.ts",
    "src/components/AdvanceFilterMaster/AdvanceDateRangFilterMaster/index.ts",
    "src/components/AdvanceFilterMaster/AdvanceEnumFilterMaster/index.ts",
    "src/components/AdvanceFilterMaster/AdvanceTreeFilterMaster/index.ts",
    "src/components/AdvanceFilterMaster/TagFilter/index.ts",
    // AdvacenFilter components
    "src/components/AdvanceFilter/AdvanceIdFilter/index.ts",
    "src/components/AdvanceFilter/AdvanceIdMultipleFilter/index.ts",
    "src/components/AdvanceFilter/AdvanceEnumFilter/index.ts",
    "src/components/AdvanceFilter/AdvanceNumberFilter/index.ts",
    "src/components/AdvanceFilter/AdvanceStringFilter/index.ts",
    "src/components/AdvanceFilter/AdvanceTreeFilter/index.ts",
    "src/components/AdvanceFilter/AdvanceDateFilter/index.ts",
    "src/components/AdvanceFilter/AdvanceDateRangeFilter/index.ts",
    // Button
    "src/components/Button/index.ts",
    // Calendar
    "src/components/Calendar/DatePicker/index.ts",
    "src/components/Calendar/DateRange/index.ts",
    // Loading/Spinner
    "src/components/IconLoading/index.ts",
    "src/components/InlineLoading/index.ts",
    //Modal/Drawer
    "src/components/Modal/index.ts",
    "src/components/Drawer/index.ts",
    //UploadFile
    "src/components/UploadFile/index.ts",
    "src/components/UploadImage/index.ts",
    // ProgressIndicator
    "src/components/ProgressIndicator/index.ts",
    // Comment
    "src/components/Comment/index.ts",
    // Standard table components
    "src/components/StandardTable/index.ts",
    "src/components/StandardTable/ActionBarComponent/index.ts",
    "src/components/StandardTable/LayoutCell/index.ts",
    "src/components/StandardTable/LayoutHeader/index.ts",
    "src/components/StandardTable/Pagination/index.ts",
    "src/components/StandardTable/DataCellComponent/BadgeText/index.ts",
    "src/components/StandardTable/DataCellComponent/OneLineText/index.ts",
    "src/components/StandardTable/DataCellComponent/TwoLineText/index.ts",
    "src/components/StandardTable/DataCellComponent/StatusLine/index.ts",
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
    // image(),
    peerDepsExternal(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    postcss({
      use: ["sass"],
      //modules: true,
      sourceMap: true,
      extract: false
    }),
    terser(),
  ]
};
