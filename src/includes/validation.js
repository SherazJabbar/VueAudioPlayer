import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from "vee-validate";
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minValue,
  max_value as maxValue,
  confirmed,
  not_one_of as excluded,
} from "@vee-validate/rules";

export default {
  install(app) {
    // 1st argument app argument is reference to vue application
    // 2nd argument options is additional data passed by vue instance to plugin
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("alpha_spaces", alphaSpaces);
    defineRule("email", email);
    defineRule("min_value", minValue);
    defineRule("max_value", maxValue);
    defineRule("passwords_mismatch", confirmed);
    defineRule("excluded", excluded);
    defineRule("country_excluded", excluded);
    defineRule("tos", required);

    configure({
      generateMessage: (context) => {
        const messages = {
          required: `The field ${context.field} is required`,
          min: `The field ${context.field} is too short`,
          max: `The field ${context.field} is too long`,
          alpha_spaces: `The field ${context.field} may only contain alphabetical characters and spaces`,
          email: `The field ${context.field} must be a valid email`,
          min_value: `The field ${context.field} is too low`,
          max_value: `The field ${context.field} is too high`,
          excluded: `You are not allowed to user this value for the field`,
          country_excluded: `Due to restrictions, we do not accept users from this location`,
          passwords_mismatch: `The Password don't match`,
          tos: `You must accept the terms of service`,
        };

        const message = messages[context.rule.name]
          ? messages[context.rule.name]
          : `The field ${context.field} is invalid`;
        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
};
