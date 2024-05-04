import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: [
    "src/index.ts",
    "src/components/FormItem/index.ts",
    // Input field components
    "src/components/Input/InputText/index.ts",
    "src/components/Input/InputNumber/index.ts",
    "src/components/Input/InputView/index.ts",
    "src/components/Input/InputSelect/index.ts",
    "src/components/Input/InputTag/index.ts",
    "src/components/Input/InputSearch/index.ts",
    "src/components/Input/InputRange/index.ts",
    "src/components/Input/DatePicker/index.ts",
    "src/components/Input/TimePicker/index.ts",
    "src/components/Input/DateRange/index.ts",
    "src/components/Input/TextArea/index.ts",
    // Dropdown components
    "src/components/Select/SingleSelect/index.ts",
    "src/components/Select/MultipleSelect/index.ts",
    "src/components/Select/EnumSelect/index.ts",
    "src/components/Select/TreeSelect/index.ts",
    // Tree component
    "src/components/Tree/index.ts",
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
    "src/components/AdvanceFilter/AdvanceInputRangeFilter/index.ts",
    // Button
    "src/components/Button/index.ts",
    // Loading/Spinner
    "src/components/IconLoading/index.ts",
    "src/components/InlineLoading/index.ts",
    // InpageNavigation
    "src/components/InpageNavigation/index.ts",
    //Modal/Drawer
    "src/components/Modal/NormalModal/index.ts",
    "src/components/Modal/TearSheet/index.ts",
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
    // Boolean component
    "src/components/Checkbox/index.ts",
    "src/components/Radio/index.ts",
    // Tag component
    "src/components/Tag/index.ts",
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
      sourceMap: true,
      extract: false,
    }),
    terser(),
  ],
};
