import { mount } from "@vue/test-utils";
import Badge from "./src/components/Badge.vue";

test("mount component", async() => {
    expect(Badge).toBeTruthy();

    const wrapper = mount(Badge, {
        slots: {
            default: "Text"
        }
    });

    expect(wrapper.text()).toContain("Text");
    expect(wrapper.html()).toMatchSnapshot();
});
