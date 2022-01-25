// It will be vue plugin
// We will register this plugin before mounting the application
import _ from "lodash";

export default {
  install(app) {
    // Webpack defines this function
    // Function returns the information of the file
    const baseComponents = require.context(
      "../components/base/",
      false,
      /[A-Za-z0-9-_,\s]+\.vue$/i
    );
    baseComponents.keys().forEach((fileName) => {
      const componentConfig = baseComponents(fileName);
      const componentName = _.upperFirst(
        _.camelCase(fileName.replace(/^\.\//, "").replace(/\.\w+$/, ""))
      );

      app.component(
        `Base${componentName}`,
        componentConfig.default || componentConfig
      );
    });
  },
};
