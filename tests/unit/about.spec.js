import About from "../../src/views/About.vue";
import { mount } from "@vue/test-utils";

describe("About.vue", () => {
  test("renders inner text", () => {
    const wrapper = mount(About);

    // text() returns the inner of a component
    expect(wrapper.text()).toContain("about");
  });
});
