import "./../src/styles/vendors/tio.scss";
import "./../src/styles/design-system/design-system.scss";
import "antd/dist/antd.css";
import "./../src/styles/index.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
